import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Application, ApplicationDocument, ApplicationStatus } from '../application/schemas/application.schema';
import { AnalyticsQueryDto, WidgetDto } from './dto/analytics.dto';

@Injectable()
export class PipelineAnalyticsService {
  constructor(@InjectModel(Application.name) private appModel: Model<ApplicationDocument>) {}

  async getPipelineAnalytics(companyId: string, query: AnalyticsQueryDto) {
    const matchStage: any = { companyId: new Types.ObjectId(companyId) };
    if (query.jobId) matchStage.jobId = new Types.ObjectId(query.jobId);
    
    // 1. Applications Per Stage
    const stageCounts = await this.appModel.aggregate([
      { $match: matchStage },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]).exec();

    const funnelMap = stageCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Define strict funnel order
    const funnelStages = [
      ApplicationStatus.SUBMITTED,
      ApplicationStatus.UNDER_REVIEW,
      ApplicationStatus.SHORTLISTED,
      ApplicationStatus.HIRED
    ];

    const funnelData = [];
    let previousCount = 0;

    for (let i = 0; i < funnelStages.length; i++) {
      const stage = funnelStages[i];
      const count = funnelMap[stage] || 0;
      let conversionRate = 100;

      if (i > 0 && previousCount > 0) {
        conversionRate = (count / previousCount) * 100;
      } else if (i > 0 && previousCount === 0) {
        conversionRate = 0;
      }

      funnelData.push({
        stage,
        count,
        conversionRate: Number(conversionRate.toFixed(1))
      });
      previousCount = count;
    }

    // Health Score Calculation (Mock Logic: high conversion + low time in stage = healthy)
    const pipelineHealthScore = Math.floor(75 + Math.random() * 20); // 75-95 score

    const widgets: WidgetDto[] = [
      { id: 'hiring-funnel', type: 'funnel-chart', title: 'Hiring Funnel', data: funnelData },
      { id: 'pipeline-health', type: 'gauge', title: 'Pipeline Health', data: { score: pipelineHealthScore } }
    ];

    return {
      healthScore: pipelineHealthScore,
      funnel: funnelData,
      widgets
    };
  }
}
