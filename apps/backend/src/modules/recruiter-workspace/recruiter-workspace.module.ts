import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruiterWorkspaceController } from './recruiter-workspace.controller';
import { RecruiterWorkspaceService } from './recruiter-workspace.service';
import { ApplicationInboxService } from './application-inbox.service';
import { WorkspaceAggregatorService } from './workspace-aggregator.service';
import { BulkOperationsService } from './bulk-operations.service';
import { PipelineMetricsService } from './pipeline-metrics.service';
import { PipelineService } from './pipeline.service';
import { WorkspaceTimelineService } from './workspace-timeline.service';
import { SavedView, SavedViewSchema } from './schemas/saved-view.schema';
import { ApplicationModule } from '../application/application.module';
import { JobModule } from '../job/job.module';
import { TimelineModule } from '../timeline/timeline.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SavedView.name, schema: SavedViewSchema },
    ]),
    ApplicationModule,
    JobModule,
    TimelineModule,
  ],
  controllers: [RecruiterWorkspaceController],
  providers: [
    RecruiterWorkspaceService,
    ApplicationInboxService,
    WorkspaceAggregatorService,
    BulkOperationsService,
    PipelineMetricsService,
    PipelineService,
    WorkspaceTimelineService,
  ],
})
export class RecruiterWorkspaceModule {}
