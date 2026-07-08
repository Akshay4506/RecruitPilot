import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulingController } from './scheduling.controller';
import { SchedulingService } from './scheduling.service';
import { AvailabilityService } from './availability.service';
import { CalendarAdapterService } from './calendar-adapter.service';
import { TimezoneService } from './timezone.service';
import { ReminderService } from './reminder.service';
import { SchedulingValidationService } from './scheduling-validation.service';
import { SchedulingEventsListener } from './scheduling-events.listener';
import { Availability, AvailabilitySchema } from './schemas/availability.schema';
import { Interview, InterviewSchema } from '../interview/schemas/interview.schema';
import { TimelineModule } from '../timeline/timeline.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Availability.name, schema: AvailabilitySchema },
      { name: Interview.name, schema: InterviewSchema }
    ]),
    TimelineModule,
  ],
  controllers: [SchedulingController],
  providers: [
    SchedulingService,
    AvailabilityService,
    CalendarAdapterService,
    TimezoneService,
    ReminderService,
    SchedulingValidationService,
    SchedulingEventsListener,
  ],
})
export class SchedulingModule {}
