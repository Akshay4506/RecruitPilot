import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InterviewDecision, InterviewDecisionDocument, DecisionStatus, ConfidenceLevel } from './schemas/interview-decision.schema';
import { Interview, InterviewDocument, InterviewStatus } from '../interview/schemas/interview.schema';

@Injectable()
export class InterviewAnalyticsService {
  constructor(
    @InjectModel(InterviewDecision.name) private decisionModel: Model<InterviewDecisionDocument>,
    @InjectModel(Interview.name) private interviewModel: Model<InterviewDocument>
  ) {}

  async getExecutiveDashboard(companyId: string) {
    const pipeline = [
      { $match: { companyId: new Types.ObjectId(companyId) } },
      { $facet: {
          pendingDecisions: [
            { $match: { status: DecisionStatus.PENDING_REVIEW } },
            { $count: 'count' }
          ],
          needsDiscussion: [
            { $match: { status: DecisionStatus.HOLD } },
            { $count: 'count' }
          ],
          lowConfidence: [
            { $match: { 'consensus.confidenceLevel': ConfidenceLevel.LOW } },
            { $count: 'count' }
          ],
          committeeReviews: [
            { $match: { status: DecisionStatus.COMMITTEE_REVIEW } },
            { $count: 'count' }
          ]
      }}
    ];

    const result = await this.decisionModel.aggregate(pipeline).exec();
    const metrics = result[0];

    return {
      pendingDecisions: metrics.pendingDecisions[0]?.count || 0,
      needsDiscussion: metrics.needsDiscussion[0]?.count || 0,
      lowConfidence: metrics.lowConfidence[0]?.count || 0,
      committeeReviews: metrics.committeeReviews[0]?.count || 0,
    };
  }

  async getCompanyKPIs(companyId: string) {
    const durationPipeline = [
      { $match: { companyId: new Types.ObjectId(companyId), status: InterviewStatus.COMPLETED, 'lifecycleMetadata.actualDuration': { $exists: true } } },
      { $group: { _id: null, avgDuration: { $avg: '$lifecycleMetadata.actualDuration' } } }
    ];
    
    const turnaroundPipeline = [
      { $match: { companyId: new Types.ObjectId(companyId), status: { $in: [DecisionStatus.APPROVED, DecisionStatus.REJECTED] } } },
      { $project: {
          durationMs: { $subtract: ['$updatedAt', '$createdAt'] }
      }},
      { $group: { _id: null, avgTurnaroundMs: { $avg: '$durationMs' } } }
    ];

    const [durationResult, turnaroundResult] = await Promise.all([
      this.interviewModel.aggregate(durationPipeline).exec(),
      this.decisionModel.aggregate(turnaroundPipeline).exec()
    ]);

    return {
      averageInterviewDurationMinutes: durationResult[0]?.avgDuration || 0,
      averageDecisionTurnaroundHours: turnaroundResult[0]?.avgTurnaroundMs ? (turnaroundResult[0].avgTurnaroundMs / (1000 * 60 * 60)) : 0
    };
  }
}
