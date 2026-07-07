import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TimelineService } from '../timeline/timeline.service';

@Injectable()
export class JobEventsListener {
  private readonly logger = new Logger(JobEventsListener.name);

  constructor(private readonly timelineService: TimelineService) {}

  @OnEvent('job.created')
  async handleJobCreatedEvent(payload: { jobId: string; companyId: string; userId: string; fromTemplate?: boolean }) {
    this.logger.log(`Job Created: ${payload.jobId}`);
    await this.timelineService.logEvent(
      'JOB_CREATED',
      'JOB',
      payload.jobId,
      payload.userId,
      { fromTemplate: payload.fromTemplate }
    );
  }

  @OnEvent('job.updated')
  async handleJobUpdatedEvent(payload: { jobId: string; companyId: string; userId: string; version: number }) {
    this.logger.log(`Job Updated: ${payload.jobId} to version ${payload.version}`);
    await this.timelineService.logEvent(
      'JOB_UPDATED',
      'JOB',
      payload.jobId,
      payload.userId,
      { version: payload.version }
    );
  }

  @OnEvent('job.status_changed')
  async handleJobStatusChangedEvent(payload: { jobId: string; companyId: string; userId: string; status: string }) {
    this.logger.log(`Job Status Changed: ${payload.jobId} to ${payload.status}`);
    await this.timelineService.logEvent(
      `JOB_${payload.status}`,
      'JOB',
      payload.jobId,
      payload.userId,
      { newStatus: payload.status }
    );
  }
}
