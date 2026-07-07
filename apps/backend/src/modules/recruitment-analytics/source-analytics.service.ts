import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Application, ApplicationDocument, ApplicationStatus } from '../application/schemas/application.schema';
import { WidgetDto } from './dto/analytics.dto';

@Injectable()
export class SourceAnalyticsService {
  constructor(@InjectModel(Application.name) private appModel: Model<ApplicationDocument>) {}

  async getSourceAnalytics(companyId: string) {
    const cId = new Types.ObjectId(companyId);

    const sources = await this.appModel.aggregate([
      { $match: { companyId: cId } },
      { $group: {
          _id: { $ifNull: ['$metadata.source', 'Direct'] },
          totalApplications: { $sum: 1 },
          hires: { $sum: { $cond: [{ $eq: ['$status', ApplicationStatus.HIRED] }, 1, 0] } }
        }
      },
      { $project: {
          source: '$_id',
          totalApplications: 1,
          hires: 1,
          conversionRate: {
            $cond: [
              { $eq: ['$totalApplications', 0] },
              0,
              { $multiply: [{ $divide: ['$hires', '$totalApplications'] }, 100] }
            ]
          }
        }
      },
      { $sort: { totalApplications: -1 } }
    ]).exec();

    const widgets: WidgetDto[] = [
      { id: 'source-breakdown', type: 'pie-chart', title: 'Application Sources', data: sources }
    ];

    return { sources, widgets };
  }
}
