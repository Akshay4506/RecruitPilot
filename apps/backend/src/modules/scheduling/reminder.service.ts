import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  constructor(private eventEmitter: EventEmitter2) {}

  scheduleReminders(interviewId: string, reminderPreferences: number[]) {
    // In future: BullMQ queue.add('reminder', { interviewId }, { delay: ... })
    this.logger.log(`Scheduled reminders for interview ${interviewId}: ${reminderPreferences.join(', ')} hours before`);
    
    // Emit event that reminders were scheduled
    this.eventEmitter.emit('scheduling.reminders_scheduled', { interviewId, preferences: reminderPreferences });
  }
}
