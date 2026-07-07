import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Application, ApplicationDocument } from '../application/schemas/application.schema';

@Injectable()
export class PipelineMetricsService {
  constructor(@InjectModel(Application.name) private appModel: Model<ApplicationDocument>) {}

  async getMetrics(companyId: string, jobId?: string) {
    const matchStage: any = { companyId: new Types.ObjectId(companyId) };
    if (jobId) matchStage.jobId = new Types.ObjectId(jobId);

    const applicationsPerStage = await this.appModel.aggregate([
      { $match: matchStage },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]).exec();

    // In a full implementation, we'd add complex pipelines for stage conversion rates 
    // and average time in stage using the statusHistory array.
    
    return {
      applicationsPerStage,
    };
  }
}
