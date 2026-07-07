import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobValidationService } from './job-validation.service';
import { JobLifecycleService } from './job-lifecycle.service';
import { JobSnapshotService } from './job-snapshot.service';
import { JobEventsListener } from './job-events.listener';
import { Job, JobSchema } from './schemas/job.schema';
import { JobTemplate, JobTemplateSchema } from './schemas/job-template.schema';
import { TimelineModule } from '../timeline/timeline.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: JobTemplate.name, schema: JobTemplateSchema },
    ]),
    TimelineModule,
  ],
  controllers: [JobController],
  providers: [
    JobService,
    JobValidationService,
    JobLifecycleService,
    JobSnapshotService,
    JobEventsListener,
  ],
  exports: [JobService, JobSnapshotService],
})
export class JobModule {}
