import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Interview, InterviewDocument } from '../interview/schemas/interview.schema';

@Injectable()
export class SchedulingValidationService {
  constructor(
    @InjectModel(Interview.name) private interviewModel: Model<InterviewDocument>
  ) {}

  async validateConflicts(companyId: string, newStart: Date, newEnd: Date, candidateId: string, panelUserIds: string[], excludeInterviewId?: string) {
    if (newStart >= newEnd) {
      throw new BadRequestException('Scheduled start time must be before end time.');
    }

    const query: any = {
      companyId: new Types.ObjectId(companyId),
      $or: [
        { candidateId: new Types.ObjectId(candidateId) },
        { 'panel.userId': { $in: panelUserIds.map(id => new Types.ObjectId(id)) } }
      ],
      $and: [
        { scheduledStart: { $lt: newEnd } },
        { scheduledEnd: { $gt: newStart } }
      ],
      status: { $nin: ['CANCELLED', 'NO_SHOW'] }
    };

    if (excludeInterviewId) {
      query._id = { $ne: new Types.ObjectId(excludeInterviewId) };
    }

    const conflicts = await this.interviewModel.find(query).exec();

    if (conflicts.length > 0) {
      // Differentiate between CRITICAL and WARNING
      // For now, treat all overlaps as CRITICAL
      throw new BadRequestException({
        message: 'Scheduling conflict detected.',
        severity: 'CRITICAL',
        conflictingInterviews: conflicts.map(c => c._id)
      });
    }

    return true;
  }
}
