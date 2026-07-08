import { Injectable } from '@nestjs/common';
import { InterviewDocument, Recommendation } from '../interview/schemas/interview.schema';
import { ConfidenceLevel } from './schemas/interview-decision.schema';

export enum InsightSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL'
}

export interface InterviewInsight {
  severity: InsightSeverity;
  message: string;
}

@Injectable()
export class InterviewInsightsService {
  generateInsights(interview: InterviewDocument, confidenceLevel: ConfidenceLevel): InterviewInsight[] {
    const insights: InterviewInsight[] = [];

    if (confidenceLevel === ConfidenceLevel.LOW) {
      insights.push({ severity: InsightSeverity.CRITICAL, message: 'High disagreement among panel members. Confidence is low.' });
    }

    if (interview.evaluationSummary?.hasVeto) {
      insights.push({ severity: InsightSeverity.CRITICAL, message: 'A veto competency was flagged during evaluation.' });
    }

    if (interview.evaluationSummary?.pendingFeedbackCount > 0) {
      insights.push({ severity: InsightSeverity.WARNING, message: `Awaiting feedback from ${interview.evaluationSummary.pendingFeedbackCount} panel member(s).` });
    }

    if (interview.finalDecision === Recommendation.STRONG_HIRE && confidenceLevel === ConfidenceLevel.HIGH) {
      insights.push({ severity: InsightSeverity.INFO, message: 'Strong consensus to hire.' });
    }

    return insights;
  }
}
