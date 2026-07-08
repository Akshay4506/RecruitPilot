import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InterviewDecision, InterviewDecisionDocument } from './schemas/interview-decision.schema';
import { UpdateCommitteeDto } from './dto/interview-analytics.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class HiringCommitteeService {
  constructor(
    @InjectModel(InterviewDecision.name) private model: Model<InterviewDecisionDocument>,
    private eventEmitter: EventEmitter2
  ) {}

  async updateCommittee(companyId: string, interviewId: string, dto: UpdateCommitteeDto, actorId: string) {
    const doc = await this.model.findOne({ interviewId: new Types.ObjectId(interviewId), companyId: new Types.ObjectId(companyId) }).exec();
    if (!doc) throw new NotFoundException('Decision record not found');

    const previousStatus = doc.committee.status;

    if (dto.members) {
      doc.committee.members = dto.members.map(m => ({ userId: new Types.ObjectId(m.userId), role: m.role }));
    }
    if (dto.notes !== undefined) doc.committee.notes = dto.notes;
    if (dto.status !== undefined) doc.committee.status = dto.status;

    await doc.save();

    if (previousStatus !== doc.committee.status) {
      if (doc.committee.status === 'IN_PROGRESS') {
        this.eventEmitter.emit('committee.review_started', { interviewId, actorId });
      } else if (doc.committee.status === 'COMPLETED') {
        this.eventEmitter.emit('committee.review_completed', { interviewId, actorId });
      }
    }

    return doc;
  }
}
