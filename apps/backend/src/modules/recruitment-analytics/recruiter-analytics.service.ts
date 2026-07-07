import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Application, ApplicationDocument, ApplicationStatus } from '../application/schemas/application.schema';

@Injectable()
export class RecruiterAnalyticsService {
  constructor(@InjectModel(Application.name) private appModel: Model<ApplicationDocument>) {}

  async getLeaderboard(companyId: string) {
    const cId = new Types.ObjectId(companyId);

    const leaderboard = await this.appModel.aggregate([
      { $match: { companyId: cId, assignedRecruiterId: { $ne: null } } },
      { $group: {
          _id: '$assignedRecruiterId',
          totalAssigned: { $sum: 1 },
          hires: { $sum: { $cond: [{ $eq: ['$status', ApplicationStatus.HIRED] }, 1, 0] } },
          reviewed: { $sum: { $cond: [{ $ne: ['$status', ApplicationStatus.SUBMITTED] }, 1, 0] } }
        }
      },
      { $sort: { hires: -1, reviewed: -1 } },
      { $limit: 10 }
    ]).exec();

    // In a real app we would $lookup the User collection to get names.
    // For now, we just return the raw aggregation.

    return leaderboard;
  }
}
