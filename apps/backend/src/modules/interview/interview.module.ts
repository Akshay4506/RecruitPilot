import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { InterviewLifecycleService } from './interview-lifecycle.service';
import { InterviewValidationService } from './interview-validation.service';
import { InterviewSnapshotService } from './interview-snapshot.service';
import { InterviewEventsListener } from './interview-events.listener';
import { Interview, InterviewSchema } from './schemas/interview.schema';
import { ApplicationModule } from '../application/application.module';
import { TimelineModule } from '../timeline/timeline.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Interview.name, schema: InterviewSchema }]),
    ApplicationModule,
    TimelineModule,
  ],
  controllers: [InterviewController],
  providers: [
    InterviewService,
    InterviewLifecycleService,
    InterviewValidationService,
    InterviewSnapshotService,
    InterviewEventsListener,
  ],
})
export class InterviewModule {}
