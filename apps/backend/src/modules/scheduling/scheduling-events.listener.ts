import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TimelineService } from '../timeline/timeline.service';
import { ReminderService } from './reminder.service';

@Injectable()
export class SchedulingEventsListener {
  private readonly logger = new Logger(SchedulingEventsListener.name);

  constructor(
    private timelineService: TimelineService,
    private reminderService: ReminderService
  ) {}

  @OnEvent('interview.scheduled', { async: true })
  async handleInterviewScheduled(payload: any) {
    // In reality, fetch availability and get preferences. Using default [24, 1] for now.
    this.reminderService.scheduleReminders(payload.interviewId, [24, 1]);
  }

  @OnEvent('scheduling.rescheduled', { async: true })
  async handleRescheduled(payload: any) {
    await this.timelineService.logEvent(
      'INTERVIEW_RESCHEDULED',
      'INTERVIEW',
      payload.interviewId,
      payload.actorId,
      { initiator: payload.initiatorType }
    );
  }

  @OnEvent('scheduling.candidate_accept', { async: true })
  async handleConfirm(payload: any) {
    await this.timelineService.logEvent(
      'CANDIDATE_CONFIRMED_ATTENDANCE',
      'INTERVIEW',
      payload.interviewId,
      payload.candidateId
    );
  }

  @OnEvent('scheduling.candidate_decline', { async: true })
  async handleDecline(payload: any) {
    await this.timelineService.logEvent(
      'CANDIDATE_DECLINED_ATTENDANCE',
      'INTERVIEW',
      payload.interviewId,
      payload.candidateId
    );
  }
}
