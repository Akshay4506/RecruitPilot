import { Injectable, BadRequestException } from '@nestjs/common';
import { ApplicationStatus } from './schemas/application.schema';

@Injectable()
export class ApplicationLifecycleService {
  validateTransition(currentStatus: ApplicationStatus, targetStatus: ApplicationStatus) {
    if (currentStatus === targetStatus) return;

    const allowedTransitions: Record<ApplicationStatus, ApplicationStatus[]> = {
      [ApplicationStatus.DRAFT]: [ApplicationStatus.SUBMITTED, ApplicationStatus.WITHDRAWN],
      [ApplicationStatus.SUBMITTED]: [ApplicationStatus.UNDER_REVIEW, ApplicationStatus.REJECTED, ApplicationStatus.WITHDRAWN],
      [ApplicationStatus.UNDER_REVIEW]: [ApplicationStatus.SHORTLISTED, ApplicationStatus.REJECTED, ApplicationStatus.WITHDRAWN],
      [ApplicationStatus.SHORTLISTED]: [ApplicationStatus.HIRED, ApplicationStatus.REJECTED, ApplicationStatus.WITHDRAWN],
      [ApplicationStatus.REJECTED]: [ApplicationStatus.UNDER_REVIEW], // Reconsideration
      [ApplicationStatus.WITHDRAWN]: [],
      [ApplicationStatus.HIRED]: [],
    };

    const allowed = allowedTransitions[currentStatus];
    if (!allowed || !allowed.includes(targetStatus)) {
      throw new BadRequestException(`Cannot transition application from ${currentStatus} to ${targetStatus}`);
    }
  }
}
