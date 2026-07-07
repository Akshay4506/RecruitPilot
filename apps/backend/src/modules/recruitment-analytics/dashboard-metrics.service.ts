import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Application, ApplicationDocument, ApplicationStatus } from '../application/schemas/application.schema';
import { Job, JobDocument, JobStatus } from '../job/schemas/job.schema';
import { AnalyticsSnapshotService } from './analytics-snapshot.service';
import { AnalyticsQueryDto, WidgetDto } from './dto/analytics.dto';

@Injectable()
export class DashboardMetricsService {
  constructor(
    @InjectModel(Application.name) private appModel: Model<ApplicationDocument>,
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    private snapshotService: AnalyticsSnapshotService
  ) {}

  async getExecutiveDashboard(companyId: string, query: AnalyticsQueryDto) {
    const cId = new Types.ObjectId(companyId);

    const [
      totalJobs, activeJobs, closedJobs, totalApps, activeCandidates, hires, rejections
    ] = await Promise.all([
      this.jobModel.countDocuments({ companyId: cId }).exec(),
      this.jobModel.countDocuments({ companyId: cId, status: JobStatus.PUBLISHED }).exec(),
      this.jobModel.countDocuments({ companyId: cId, status: JobStatus.CLOSED }).exec(),
      this.appModel.countDocuments({ companyId: cId }).exec(),
      this.appModel.countDocuments({ companyId: cId, status: { $nin: [ApplicationStatus.REJECTED, ApplicationStatus.WITHDRAWN, ApplicationStatus.HIRED] } }).exec(),
      this.appModel.countDocuments({ companyId: cId, status: ApplicationStatus.HIRED }).exec(),
      this.appModel.countDocuments({ companyId: cId, status: ApplicationStatus.REJECTED }).exec()
    ]);

    const metrics = {
      totalJobs: this.snapshotService.formatMetric(totalJobs, Math.floor(totalJobs * 0.9)), // mock previous for demo
      activeJobs: this.snapshotService.formatMetric(activeJobs),
      closedJobs: this.snapshotService.formatMetric(closedJobs),
      totalApplications: this.snapshotService.formatMetric(totalApps, Math.floor(totalApps * 0.8)),
      activeCandidates: this.snapshotService.formatMetric(activeCandidates),
      hires: this.snapshotService.formatMetric(hires),
      rejections: this.snapshotService.formatMetric(rejections),
      hiringVelocity: this.snapshotService.formatMetric(Number((hires / (activeJobs || 1)).toFixed(2))),
    };

    const widgets: WidgetDto[] = [
      { id: 'exec-summary', type: 'metric-grid', title: 'Executive Summary', data: metrics }
    ];

    return { metrics, widgets };
  }

  async getRecruiterDashboard(companyId: string, recruiterId: string, query: AnalyticsQueryDto) {
    const cId = new Types.ObjectId(companyId);
    const rId = new Types.ObjectId(recruiterId);

    const [
      assignedJobs, appsPending, appsReviewed
    ] = await Promise.all([
      this.jobModel.countDocuments({ companyId: cId, 'hiringTeam.userId': rId }).exec(),
      this.appModel.countDocuments({ companyId: cId, assignedRecruiterId: rId, status: ApplicationStatus.SUBMITTED }).exec(),
      this.appModel.countDocuments({ companyId: cId, assignedRecruiterId: rId, status: { $ne: ApplicationStatus.SUBMITTED } }).exec(),
    ]);

    const successRate = appsReviewed > 0 ? (await this.appModel.countDocuments({ companyId: cId, assignedRecruiterId: rId, status: ApplicationStatus.HIRED }).exec() / appsReviewed) * 100 : 0;

    const metrics = {
      assignedJobs: this.snapshotService.formatMetric(assignedJobs),
      applicationsPending: this.snapshotService.formatMetric(appsPending),
      applicationsReviewed: this.snapshotService.formatMetric(appsReviewed),
      interviewsPending: this.snapshotService.formatMetric(0),
      offersPending: this.snapshotService.formatMetric(0),
      hiringSuccessRate: this.snapshotService.formatMetric(`${successRate.toFixed(1)}%`)
    };

    const widgets: WidgetDto[] = [
      { id: 'recruiter-summary', type: 'metric-grid', title: 'Your Workload', data: metrics }
    ];

    return { metrics, widgets };
  }
}
