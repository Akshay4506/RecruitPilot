import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationValidationService } from './application-validation.service';
import { ApplicationLifecycleService } from './application-lifecycle.service';
import { ApplicationSnapshotService } from './application-snapshot.service';
import { ApplicationEventsListener } from './application-events.listener';
import { Application, ApplicationSchema } from './schemas/application.schema';
import { TimelineModule } from '../timeline/timeline.module';
import { JobModule } from '../job/job.module';
import { CareerProfileModule } from '../career-profile/career-profile.module';
import { CandidateModule } from '../candidate/candidate.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    TimelineModule,
    JobModule,
    CareerProfileModule,
    CandidateModule,
  ],
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
    ApplicationValidationService,
    ApplicationLifecycleService,
    ApplicationSnapshotService,
    ApplicationEventsListener,
  ],
  exports: [ApplicationService, ApplicationSnapshotService],
})
export class ApplicationModule {}
