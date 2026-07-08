import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TimelineService } from '../timeline/timeline.service';
import { ConsensusService } from './consensus.service';
import { DecisionWorkflowService } from './decision-workflow.service';

@Injectable()
export class InterviewAnalyticsEventsListener {
  private readonly logger = new Logger(InterviewAnalyticsEventsListener.name);

  constructor(
    private timelineService: TimelineService,
    private consensusService: ConsensusService,
    private decisionWorkflowService: DecisionWorkflowService
  ) {}

  @OnEvent('interview.evaluation_completed', { async: true })
  async handleEvaluationCompleted(payload: any) {
    try {
      const consensus = this.consensusService.calculateConsensus(payload.scoreVariance || 0);
      
      await this.decisionWorkflowService.upsertDecisionRecord(
        payload.companyId,
        payload.interviewId,
        payload.applicationId,
        consensus
      );

      await this.timelineService.logEvent(
        'CONSENSUS_GENERATED',
        'INTERVIEW',
        payload.interviewId,
        'SYSTEM',
        { confidenceLevel: consensus.confidenceLevel, confidencePercentage: consensus.confidencePercentage }
      );
    } catch (err: any) {
      this.logger.error('Failed to handle evaluation completed event', err.stack);
    }
  }

  @OnEvent('interview.decision_submitted', { async: true })
  async handleDecisionSubmitted(payload: any) {
    await this.timelineService.logEvent(
      'DECISION_SUBMITTED',
      'INTERVIEW',
      payload.interviewId,
      payload.actorId,
      { status: payload.status }
    );
  }

  @OnEvent('committee.review_started', { async: true })
  async handleCommitteeStarted(payload: any) {
    await this.timelineService.logEvent(
      'COMMITTEE_REVIEW_STARTED',
      'INTERVIEW',
      payload.interviewId,
      payload.actorId
    );
  }

  @OnEvent('committee.review_completed', { async: true })
  async handleCommitteeCompleted(payload: any) {
    await this.timelineService.logEvent(
      'COMMITTEE_REVIEW_COMPLETED',
      'INTERVIEW',
      payload.interviewId,
      payload.actorId
    );
  }

  @OnEvent('interview.decision_finalized', { async: true })
  async handleDecisionFinalized(payload: any) {
    await this.timelineService.logEvent(
      'DECISION_FINALIZED',
      'INTERVIEW',
      payload.interviewId,
      payload.actorId,
      { status: payload.status }
    );
  }
}
