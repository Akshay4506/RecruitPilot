import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InterviewDecision, InterviewDecisionDocument, DecisionStatus } from './schemas/interview-decision.schema';
import { UpdateDecisionDto } from './dto/interview-analytics.dto';
import { DecisionAuditService } from './decision-audit.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class DecisionWorkflowService {
  constructor(
    @InjectModel(InterviewDecision.name) private model: Model<InterviewDecisionDocument>,
    private auditService: DecisionAuditService,
    private eventEmitter: EventEmitter2
  ) {}

  async updateDecisionStatus(companyId: string, interviewId: string, dto: UpdateDecisionDto, actorId: string) {
    const doc = await this.model.findOne({ interviewId: new Types.ObjectId(interviewId), companyId: new Types.ObjectId(companyId) }).exec();
    if (!doc) throw new NotFoundException('Decision record not found');

    this.auditService.recordAuditLog(doc, dto.status, actorId, dto.reason);
    
    doc.status = dto.status;
    await doc.save();

    if (dto.status === DecisionStatus.APPROVED || dto.status === DecisionStatus.REJECTED || dto.status === DecisionStatus.HOLD) {
      this.eventEmitter.emit('interview.decision_finalized', { interviewId, status: dto.status, actorId });
      this.eventEmitter.emit('INTERVIEW_DECISION_COMPLETED', { interviewId, status: dto.status, applicationId: doc.applicationId });
    } else {
      this.eventEmitter.emit('interview.decision_submitted', { interviewId, status: dto.status, actorId });
    }

    return doc;
  }

  async upsertDecisionRecord(companyId: string, interviewId: string, applicationId: string, consensus: any) {
    return this.model.findOneAndUpdate(
      { interviewId: new Types.ObjectId(interviewId), companyId: new Types.ObjectId(companyId) },
      { 
        interviewId: new Types.ObjectId(interviewId),
        companyId: new Types.ObjectId(companyId),
        applicationId: new Types.ObjectId(applicationId),
        consensus
      },
      { new: true, upsert: true }
    ).exec();
  }
}
