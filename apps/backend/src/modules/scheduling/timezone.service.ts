import { Injectable } from '@nestjs/common';

@Injectable()
export class TimezoneService {
  normalizeToUtc(dateString: string): Date {
    return new Date(dateString);
  }

  getUtcOffsetMinutes(dateString: string, timezone: string): number {
    // Stub: In a real app we'd use luxon or date-fns-tz to calculate
    // the precise offset for the given timezone and date.
    return 0;
  }
}
