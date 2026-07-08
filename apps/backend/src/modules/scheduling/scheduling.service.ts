import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Interview, InterviewDocument, CandidateConfirmationStatus } from '../interview/schemas/interview.schema';
import { RescheduleDto, ConfirmDto } from './dto/scheduling.dto';
import { SchedulingValidationService } from './scheduling-validation.service';
import { TimezoneService } from './timezone.service';
import { ReminderService } from './reminder.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SchedulingService {
  constructor(
    @InjectModel(Interview.name) private interviewModel: Model<InterviewDocument>,
    private validationService: SchedulingValidationService,
    private timezoneService: TimezoneService,
    private reminderService: ReminderService,
    private eventEmitter: EventEmitter2
  ) {}

  async rescheduleInterview(companyId: string, interviewId: string, dto: RescheduleDto, actorId: string) {
    const interview = await this.interviewModel.findOne({ _id: new Types.ObjectId(interviewId), companyId: new Types.ObjectId(companyId) }).exec();
    if (!interview) throw new NotFoundException('Interview not found');

    const newStart = this.timezoneService.normalizeToUtc(dto.newStart);
    const newEnd = this.timezoneService.normalizeToUtc(dto.newEnd);

    await this.validationService.validateConflicts(
      companyId, newStart, newEnd, 
      interview.candidateId.toString(), 
      interview.panel.map((p: any) => p.userId.toString()), 
      interviewId
    );

    // Save history
    interview.scheduleHistory.push({
      previousStart: interview.scheduledStart,
      previousEnd: interview.scheduledEnd,
      changedBy: actorId,
      changedAt: new Date(),
      reason: dto.reason,
      initiatorType: dto.initiatorType
    });

    interview.scheduledStart = newStart;
    interview.scheduledEnd = newEnd;
    interview.candidateConfirmationStatus = CandidateConfirmationStatus.PENDING;

    await interview.save();
    
    this.eventEmitter.emit('scheduling.rescheduled', { interviewId, initiatorType: dto.initiatorType, actorId });

    return interview;
  }

  async confirmAttendance(companyId: string, interviewId: string, candidateId: string, dto: ConfirmDto) {
    const interview = await this.interviewModel.findOne({ 
      _id: new Types.ObjectId(interviewId), 
      companyId: new Types.ObjectId(companyId),
      candidateId: new Types.ObjectId(candidateId)
    }).exec();
    
    if (!interview) throw new NotFoundException('Interview not found');
    
    if (interview.candidateConfirmationStatus === CandidateConfirmationStatus.EXPIRED) {
      throw new BadRequestException('Confirmation window has expired.');
    }

    interview.candidateConfirmationStatus = dto.action === 'ACCEPT' 
      ? CandidateConfirmationStatus.ACCEPTED 
      : CandidateConfirmationStatus.DECLINED;

    await interview.save();
    this.eventEmitter.emit(`scheduling.candidate_${dto.action.toLowerCase()}`, { interviewId, candidateId });
    return interview;
  }
}
