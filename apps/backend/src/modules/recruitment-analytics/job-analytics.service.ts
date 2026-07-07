import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Application, ApplicationDocument, ApplicationStatus } from '../application/schemas/application.schema';
import { Job, JobDocument } from '../job/schemas/job.schema';
import { WidgetDto } from './dto/analytics.dto';

@Injectable()
export class JobAnalyticsService {
  constructor(
    @InjectModel(Application.name) private appModel: Model<ApplicationDocument>,
    @InjectModel(Job.name) private jobModel: Model<JobDocument>
  ) {}

  async getJobAnalytics(companyId: string, jobId: string) {
    const cId = new Types.ObjectId(companyId);
    const jId = new Types.ObjectId(jobId);

    const job = await this.jobModel.findOne({ _id: jId, companyId: cId }).exec();
    if (!job) return null;

    const totalApplications = await this.appModel.countDocuments({ companyId: cId, jobId: jId }).exec();
    const hires = await this.appModel.countDocuments({ companyId: cId, jobId: jId, status: ApplicationStatus.HIRED }).exec();
    const views = job.analytics?.views || 1;
    const conversionRate = (totalApplications / views) * 100;
    
    let timeOpenDays = 0;
    if (job.publishedAt) {
      timeOpenDays = Math.floor((new Date().getTime() - job.publishedAt.getTime()) / (1000 * 60 * 60 * 24));
    }

    const healthScore = totalApplications > 10 ? 90 : (totalApplications > 0 ? 60 : 30);

    const metrics = {
      views,
      applications: totalApplications,
      hires,
      conversionRate: Number(conversionRate.toFixed(1)),
      timeOpenDays,
      healthScore
    };

    const widgets: WidgetDto[] = [
      { id: 'job-health', type: 'gauge', title: 'Job Health Score', data: { score: healthScore } },
      { id: 'job-metrics', type: 'metric-grid', title: 'Job Performance', data: metrics }
    ];

    return { metrics, widgets };
  }
}
