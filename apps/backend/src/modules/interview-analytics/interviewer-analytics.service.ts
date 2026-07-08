import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Interview, InterviewDocument, InterviewStatus } from '../interview/schemas/interview.schema';

@Injectable()
export class InterviewerAnalyticsService {
  constructor(
    @InjectModel(Interview.name) private interviewModel: Model<InterviewDocument>
  ) {}

  async getInterviewerMetrics(companyId: string, userId: string) {
    const pipeline = [
      { $match: { companyId: new Types.ObjectId(companyId), status: InterviewStatus.COMPLETED } },
      { $unwind: '$panel' },
      { $match: { 'panel.userId': new Types.ObjectId(userId) } },
      { $project: {
          score: {
            $sum: {
              $reduce: {
                input: { $ifNull: ['$panel.feedback.categories', []] },
                initialValue: [],
                in: { $concatArrays: ['$$value', '$$this.competencies.score'] }
              }
            }
          },
          duration: '$lifecycleMetadata.actualDuration',
          panelSize: { $size: '$panel' }
      }},
      { $group: {
          _id: null,
          interviewsConducted: { $sum: 1 },
          avgScoreGiven: { $avg: '$score' },
          avgDuration: { $avg: '$duration' },
          avgPanelSize: { $avg: '$panelSize' }
      }}
    ];

    const result = await this.interviewModel.aggregate(pipeline).exec();
    
    if (result.length === 0) return { interviewsConducted: 0, avgScoreGiven: 0, avgDuration: 0, avgPanelSize: 0 };
    return {
      interviewsConducted: result[0].interviewsConducted,
      avgScoreGiven: result[0].avgScoreGiven || 0,
      avgDuration: result[0].avgDuration || 0,
      avgPanelSize: result[0].avgPanelSize || 0
    };
  }
}
