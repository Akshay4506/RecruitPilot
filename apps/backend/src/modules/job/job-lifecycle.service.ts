import { Injectable, BadRequestException } from '@nestjs/common';
import { JobStatus } from './schemas/job.schema';

@Injectable()
export class JobLifecycleService {
  validateTransition(currentStatus: JobStatus, targetStatus: JobStatus) {
    if (currentStatus === targetStatus) return; // No transition

    const allowedTransitions: Record<JobStatus, JobStatus[]> = {
      [JobStatus.DRAFT]: [JobStatus.PENDING_APPROVAL, JobStatus.APPROVED, JobStatus.PUBLISHED, JobStatus.ARCHIVED],
      [JobStatus.PENDING_APPROVAL]: [JobStatus.APPROVED, JobStatus.DRAFT, JobStatus.ARCHIVED],
      [JobStatus.APPROVED]: [JobStatus.PUBLISHED, JobStatus.DRAFT, JobStatus.ARCHIVED],
      [JobStatus.PUBLISHED]: [JobStatus.PAUSED, JobStatus.CLOSED, JobStatus.ARCHIVED],
      [JobStatus.PAUSED]: [JobStatus.PUBLISHED, JobStatus.CLOSED, JobStatus.ARCHIVED],
      [JobStatus.CLOSED]: [JobStatus.ARCHIVED, JobStatus.PUBLISHED], // Can reopen to published
      [JobStatus.ARCHIVED]: [], // Terminal state
    };

    const allowed = allowedTransitions[currentStatus];
    if (!allowed || !allowed.includes(targetStatus)) {
      throw new BadRequestException(`Cannot transition job from ${currentStatus} to ${targetStatus}`);
    }
  }
}
