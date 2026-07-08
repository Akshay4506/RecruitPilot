import { Injectable, BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InterviewDocument, InterviewStatus, InterviewLifecycleMetadata } from './schemas/interview.schema';
import { Types } from 'mongoose';

@Injectable()
export class InterviewLifecycleService {
  constructor(private eventEmitter: EventEmitter2) {}

  validateTransition(currentStatus: InterviewStatus, newStatus: InterviewStatus) {
    const allowedTransitions: Record<InterviewStatus, InterviewStatus[]> = {
      [InterviewStatus.DRAFT]: [InterviewStatus.SCHEDULED, InterviewStatus.CANCELLED],
      [InterviewStatus.SCHEDULED]: [InterviewStatus.CONFIRMED, InterviewStatus.CANCELLED],
      [InterviewStatus.CONFIRMED]: [InterviewStatus.IN_PROGRESS, InterviewStatus.CANCELLED, InterviewStatus.NO_SHOW],
      [InterviewStatus.IN_PROGRESS]: [InterviewStatus.COMPLETED, InterviewStatus.CANCELLED],
      [InterviewStatus.COMPLETED]: [],
      [InterviewStatus.CANCELLED]: [],
      [InterviewStatus.NO_SHOW]: []
    };

    if (!allowedTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(`Cannot transition interview from ${currentStatus} to ${newStatus}`);
    }
  }

  updateLifecycleMetadata(interview: InterviewDocument, newStatus: InterviewStatus, userId: string): InterviewLifecycleMetadata {
    const metadata = interview.lifecycleMetadata || {};
    
    if (newStatus === InterviewStatus.IN_PROGRESS && !metadata.startedAt) {
      metadata.startedAt = new Date();
    }
    
    if (newStatus === InterviewStatus.COMPLETED) {
      metadata.endedAt = new Date();
      metadata.completedBy = new Types.ObjectId(userId);
      if (metadata.startedAt) {
        metadata.actualDurationMinutes = Math.floor((metadata.endedAt.getTime() - metadata.startedAt.getTime()) / 60000);
      }
    }

    return metadata;
  }

  emitLifecycleEvent(interview: InterviewDocument, newStatus: InterviewStatus, userId: string) {
    const eventName = `interview.${newStatus.toLowerCase()}`;
    this.eventEmitter.emit(eventName, {
      interviewId: interview._id,
      companyId: interview.companyId,
      applicationId: interview.applicationId,
      candidateId: interview.candidateId,
      jobId: interview.jobId,
      status: newStatus,
      userId
    });
  }
}
