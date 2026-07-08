import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TimelineService } from '../timeline/timeline.service';
import { Types } from 'mongoose';

@Injectable()
export class InterviewEventsListener {
  private readonly logger = new Logger(InterviewEventsListener.name);

  constructor(private readonly timelineService: TimelineService) {}

  @OnEvent('interview.*', { async: true })
  async handleInterviewEvents(payload: any) {
    try {
      await this.timelineService.logEvent(
        `INTERVIEW_${payload.status}`,
        'APPLICATION',
        payload.applicationId,
        payload.userId,
        { interviewId: payload.interviewId, status: payload.status }
      );
    } catch (err: any) {
      this.logger.error('Failed to log interview timeline event', err.stack);
    }
  }
}
