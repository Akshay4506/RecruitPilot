import { Test, TestingModule } from '@nestjs/testing';
import { CalendarAdapterService } from './calendar-adapter.service';

describe('CalendarAdapterService', () => {
  let service: CalendarAdapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarAdapterService],
    }).compile();

    service = module.get<CalendarAdapterService>(CalendarAdapterService);
  });

  it('should generate a valid ICS string', () => {
    const mockInterview: any = {
      _id: 'test_id',
      roundName: 'Technical Screen',
      scheduledStart: new Date('2026-08-01T10:00:00Z'),
      scheduledEnd: new Date('2026-08-01T11:00:00Z'),
      meeting: {
        joinUrl: 'https://zoom.us/j/123',
        organizer: 'John Doe',
      },
      createdAt: new Date('2026-07-01T10:00:00Z'),
      updatedAt: new Date('2026-07-01T10:00:00Z'),
    };

    const icsContent = service.generateIcs(mockInterview);
    expect(icsContent).toContain('BEGIN:VCALENDAR');
    expect(icsContent).toContain('SUMMARY:Interview: Technical Screen');
    expect(icsContent).toContain('URL:https://zoom.us/j/123');
    expect(icsContent).toContain('UID:test_id@recruitpilot.com');
  });
});
