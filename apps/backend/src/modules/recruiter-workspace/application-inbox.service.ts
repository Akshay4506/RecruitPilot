import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, PipelineStage } from 'mongoose';
import { Application, ApplicationDocument } from '../application/schemas/application.schema';

@Injectable()
export class ApplicationInboxService {
  constructor(@InjectModel(Application.name) private appModel: Model<ApplicationDocument>) {}

  async searchInbox(companyId: string, query: any) {
    const matchStage: any = { companyId: new Types.ObjectId(companyId) };

    if (query.status) matchStage.status = query.status;
    if (query.jobId) matchStage.jobId = new Types.ObjectId(query.jobId);
    if (query.assignedRecruiterId) matchStage.assignedRecruiterId = new Types.ObjectId(query.assignedRecruiterId);
    if (query.priority) matchStage.priority = query.priority;
    if (query.labels && query.labels.length > 0) matchStage.labels = { $in: query.labels };

    if (query.search) {
      matchStage.$or = [
        { 'candidateSnapshot.name': { $regex: query.search, $options: 'i' } },
        { 'jobSnapshot.title': { $regex: query.search, $options: 'i' } },
        { applicationNumber: { $regex: query.search, $options: 'i' } }
      ];
    }

    const sortStage: any = query.sort || { 'metadata.appliedAt': -1 };
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const pipeline: PipelineStage[] = [
      { $match: matchStage },
      { $sort: sortStage },
      { $skip: skip },
      { $limit: limit },
    ];

    const [results, totalCount] = await Promise.all([
      this.appModel.aggregate(pipeline).exec(),
      this.appModel.countDocuments(matchStage).exec()
    ]);

    return {
      data: results,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  }
}
