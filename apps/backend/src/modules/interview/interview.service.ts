import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Interview, InterviewDocument, InterviewStatus, AttendanceStatus } from './schemas/interview.schema';
import { ScheduleInterviewDto, UpdateInterviewStatusDto, SubmitFeedbackDto } from './dto/interview.dto';
import { InterviewValidationService } from './interview-validation.service';
import { InterviewSnapshotService } from './interview-snapshot.service';
import { InterviewLifecycleService } from './interview-lifecycle.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class InterviewService {
  constructor(
    @InjectModel(Interview.name) private interviewModel: Model<InterviewDocument>,
    private validationService: InterviewValidationService,
    private snapshotService: InterviewSnapshotService,
    private lifecycleService: InterviewLifecycleService,
    private eventEmitter: EventEmitter2
  ) {}

  async scheduleInterview(companyId: string, userId: string, dto: ScheduleInterviewDto) {
    const application = await this.validationService.validateScheduling(companyId, dto);
    const { candidateSnapshot, jobSnapshot } = this.snapshotService.generateSnapshots(application);

    const panel = dto.panel.map(p => ({
      userId: new Types.ObjectId(p.userId),
      role: p.role,
      isRequired: p.isRequired !== undefined ? p.isRequired : true,
      attendanceStatus: AttendanceStatus.PENDING,
    }));

    const interview = new this.interviewModel({
      companyId: new Types.ObjectId(companyId),
      jobId: application.jobId,
      applicationId: application._id,
      candidateId: application.candidateId,
      roundNumber: dto.roundNumber,
      roundName: dto.roundName,
      interviewType: dto.interviewType,
      scheduledStart: new Date(dto.scheduledStart),
      scheduledEnd: new Date(dto.scheduledEnd),
      timezone: dto.timezone,
      meeting: dto.meeting,
      panel,
      status: InterviewStatus.SCHEDULED,
      candidateSnapshot,
      jobSnapshot,
    });

    await interview.save();
    
    this.lifecycleService.emitLifecycleEvent(interview, InterviewStatus.SCHEDULED, userId);
    
    return interview;
  }

  async updateStatus(companyId: string, interviewId: string, dto: UpdateInterviewStatusDto, userId: string) {
    const interview = await this.interviewModel.findOne({ _id: new Types.ObjectId(interviewId), companyId: new Types.ObjectId(companyId) }).exec();
    if (!interview) throw new NotFoundException('Interview not found');

    this.lifecycleService.validateTransition(interview.status, dto.status);
    interview.lifecycleMetadata = this.lifecycleService.updateLifecycleMetadata(interview, dto.status, userId);
    interview.status = dto.status;

    await interview.save();
    this.lifecycleService.emitLifecycleEvent(interview, dto.status, userId);
    return interview;
  }

  async submitFeedback(companyId: string, interviewId: string, userId: string, dto: SubmitFeedbackDto) {
    const interview = await this.interviewModel.findOne({ _id: new Types.ObjectId(interviewId), companyId: new Types.ObjectId(companyId) }).exec();
    if (!interview) throw new NotFoundException('Interview not found');

    const panelMemberIndex = interview.panel.findIndex(p => p.userId.toString() === userId);
    if (panelMemberIndex === -1) {
      throw new BadRequestException('You are not a panel member for this interview.');
    }

    interview.panel[panelMemberIndex].feedback = {
      categories: dto.categories as any,
      notes: dto.notes,
      recommendation: dto.recommendation as any,
      status: dto.status as any,
      submittedAt: new Date()
    };

    await interview.save();
    
    this.eventEmitter.emit('interview.feedback_submitted', {
      interviewId,
      companyId,
      actorId: userId,
      status: dto.status
    });

    return interview;
  }

  // Returns interviews for recruiters
  async getInterviewsForRecruiter(companyId: string) {
    return this.interviewModel.find({ companyId: new Types.ObjectId(companyId) }).sort({ scheduledStart: 1 }).exec();
  }

  async getInterviewForRecruiter(companyId: string, interviewId: string, userId: string) {
    const interview = await this.interviewModel.findOne({ _id: new Types.ObjectId(interviewId), companyId: new Types.ObjectId(companyId) }).lean().exec();
    if (!interview) throw new NotFoundException('Interview not found');

    const currentUserPanelMember = interview.panel.find(p => p.userId.toString() === userId);
    
    // Blind Feedback Logic
    if (currentUserPanelMember && interview.status !== InterviewStatus.COMPLETED) {
      if (!currentUserPanelMember.feedback || currentUserPanelMember.feedback.status !== 'FINAL') {
        // Blind other panel members' feedback
        interview.panel.forEach(p => {
          if (p.userId.toString() !== userId && p.feedback) {
            delete (p as any).feedback;
          }
        });
      }
    }

    return interview;
  }

  // Returns ONLY confirmed/completed interviews for candidates, sanitized of feedback
  async getInterviewsForCandidate(candidateId: string) {
    const interviews = await this.interviewModel.find({
      candidateId: new Types.ObjectId(candidateId),
      status: { $in: [InterviewStatus.CONFIRMED, InterviewStatus.IN_PROGRESS, InterviewStatus.COMPLETED] }
    }).sort({ scheduledStart: -1 }).lean().exec();

    // Sanitize feedback so candidates don't see recruiter notes or scores
    return interviews.map(inv => {
      delete (inv as any).panel;
      delete (inv as any).finalDecision;
      return inv;
    });
  }
}
