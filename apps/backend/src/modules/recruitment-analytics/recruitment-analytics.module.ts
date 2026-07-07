import { Module } from '@nestjs/common';
import { RecruitmentAnalyticsController } from './recruitment-analytics.controller';
import { AnalyticsSnapshotService } from './analytics-snapshot.service';
import { DashboardMetricsService } from './dashboard-metrics.service';
import { PipelineAnalyticsService } from './pipeline-analytics.service';
import { JobAnalyticsService } from './job-analytics.service';
import { RecruiterAnalyticsService } from './recruiter-analytics.service';
import { SourceAnalyticsService } from './source-analytics.service';
import { RecruitmentInsightsService } from './recruitment-insights.service';
import { ReportingService } from './reporting.service';
import { ApplicationModule } from '../application/application.module';
import { JobModule } from '../job/job.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from '../application/schemas/application.schema';
import { Job, JobSchema } from '../job/schemas/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
      { name: Job.name, schema: JobSchema }
    ]),
    ApplicationModule,
    JobModule,
  ],
  controllers: [RecruitmentAnalyticsController],
  providers: [
    AnalyticsSnapshotService,
    DashboardMetricsService,
    PipelineAnalyticsService,
    JobAnalyticsService,
    RecruiterAnalyticsService,
    SourceAnalyticsService,
    RecruitmentInsightsService,
    ReportingService,
  ],
})
export class RecruitmentAnalyticsModule {}
