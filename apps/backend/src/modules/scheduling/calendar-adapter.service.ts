import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as ics from 'ics';
import { InterviewDocument } from '../interview/schemas/interview.schema';

@Injectable()
export class CalendarAdapterService {
  generateIcs(interview: InterviewDocument): string {
    const start = new Date(interview.scheduledStart);
    const end = new Date(interview.scheduledEnd);
    const createdAt = new Date((interview as any).createdAt || Date.now());
    const updatedAt = new Date((interview as any).updatedAt || Date.now());
    
    // ics expects [year, month, date, hours, minutes]
    const event: ics.EventAttributes = {
      start: [start.getUTCFullYear(), start.getUTCMonth() + 1, start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes()],
      end: [end.getUTCFullYear(), end.getUTCMonth() + 1, end.getUTCDate(), end.getUTCHours(), end.getUTCMinutes()],
      title: `Interview: ${interview.roundName}`,
      description: interview.meeting?.instructions || 'Interview details',
      location: interview.meeting?.locationOrUrl || interview.meeting?.joinUrl || '',
      url: interview.meeting?.joinUrl,
      organizer: { name: interview.meeting?.organizer || 'Recruitment Team', email: 'no-reply@recruitpilot.com' },
      uid: interview._id.toString() + '@recruitpilot.com',
      sequence: interview.scheduleHistory?.length || 0,
      created: [
        createdAt.getUTCFullYear(),
        createdAt.getUTCMonth() + 1,
        createdAt.getUTCDate(),
        createdAt.getUTCHours(),
        createdAt.getUTCMinutes()
      ],
      lastModified: [
        updatedAt.getUTCFullYear(),
        updatedAt.getUTCMonth() + 1,
        updatedAt.getUTCDate(),
        updatedAt.getUTCHours(),
        updatedAt.getUTCMinutes()
      ],
      startInputType: 'utc',
      startOutputType: 'utc',
      endInputType: 'utc',
      endOutputType: 'utc',
    };

    const { error, value } = ics.createEvent(event);
    if (error) {
      throw new InternalServerErrorException('Failed to generate ICS file');
    }
    return value as string;
  }
}
