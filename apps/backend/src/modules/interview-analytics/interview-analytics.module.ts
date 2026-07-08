import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewAnalyticsController } from './interview-analytics.controller';
import { InterviewAnalyticsService } from './interview-analytics.service';
import { InterviewerAnalyticsService } from './interviewer-analytics.service';
import { ConsensusService } from './consensus.service';
import { InterviewInsightsService } from './interview-insights.service';
import { DecisionWorkflowService } from './decision-workflow.service';
import { HiringCommitteeService } from './hiring-committee.service';
import { DecisionAuditService } from './decision-audit.service';
import { InterviewAnalyticsEventsListener } from './interview-analytics-events.listener';
import { InterviewDecision, InterviewDecisionSchema } from './schemas/interview-decision.schema';
import { Interview, InterviewSchema } from '../interview/schemas/interview.schema';
import { TimelineModule } from '../timeline/timeline.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InterviewDecision.name, schema: InterviewDecisionSchema },
      { name: Interview.name, schema: InterviewSchema },
    ]),
    TimelineModule,
  ],
  controllers: [InterviewAnalyticsController],
  providers: [
    InterviewAnalyticsService,
    InterviewerAnalyticsService,
    ConsensusService,
    InterviewInsightsService,
    DecisionWorkflowService,
    HiringCommitteeService,
    DecisionAuditService,
    InterviewAnalyticsEventsListener,
  ],
})
export class InterviewAnalyticsModule {}
