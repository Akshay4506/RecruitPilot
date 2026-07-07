import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TimelineService } from '../timeline/timeline.service';

@Injectable()
export class ApplicationEventsListener {
  private readonly logger = new Logger(ApplicationEventsListener.name);

  constructor(private readonly timelineService: TimelineService) {}

  @OnEvent('application.submitted')
  async handleApplicationSubmitted(payload: { applicationId: string; candidateId: string; jobId: string; companyId: string }) {
    this.logger.log(`Application Submitted: ${payload.applicationId}`);
    
    // Log for Candidate
    await this.timelineService.logEvent(
      'APPLICATION_SUBMITTED',
      'CANDIDATE',
      payload.candidateId,
      payload.candidateId,
      { applicationId: payload.applicationId, jobId: payload.jobId }
    );

    // Log for Job
    await this.timelineService.logEvent(
      'APPLICATION_RECEIVED',
      'JOB',
      payload.jobId,
      payload.candidateId,
      { applicationId: payload.applicationId, candidateId: payload.candidateId }
    );
  }

  @OnEvent('application.status_changed')
  async handleApplicationStatusChanged(payload: { applicationId: string; candidateId: string; status: string; userId: string }) {
    this.logger.log(`Application Status Changed: ${payload.applicationId} to ${payload.status}`);
    
    await this.timelineService.logEvent(
      `APPLICATION_STATUS_${payload.status}`,
      'APPLICATION',
      payload.applicationId,
      payload.userId,
      { newStatus: payload.status }
    );
  }

  @OnEvent('application.assigned')
  async handleApplicationAssigned(payload: { applicationId: string; assigneeId: string; role: string; assignedBy: string }) {
    this.logger.log(`Application Assigned: ${payload.applicationId} to ${payload.assigneeId} as ${payload.role}`);
    
    await this.timelineService.logEvent(
      'APPLICATION_ASSIGNED',
      'APPLICATION',
      payload.applicationId,
      payload.assignedBy,
      { assigneeId: payload.assigneeId, role: payload.role }
    );
  }
}
