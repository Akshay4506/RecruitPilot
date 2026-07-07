import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Application, ApplicationDocument, ApplicationStatus } from '../application/schemas/application.schema';
import { Job, JobDocument, JobStatus } from '../job/schemas/job.schema';

@Injectable()
export class RecruiterWorkspaceService {
  constructor(
    @InjectModel(Application.name) private appModel: Model<ApplicationDocument>,
    @InjectModel(Job.name) private jobModel: Model<JobDocument>
  ) {}

  async getDashboardMetrics(companyId: string, userId: string) {
    const compId = new Types.ObjectId(companyId);
    
    // Aggregations can be done in parallel
    const [
      activeJobsCount,
      assignedJobsCount,
      openApplicationsCount,
      awaitingReviewCount,
      shortlistedCount
    ] = await Promise.all([
      this.jobModel.countDocuments({ companyId: compId, status: JobStatus.PUBLISHED }).exec(),
      this.jobModel.countDocuments({ companyId: compId, 'hiringTeam.userId': new Types.ObjectId(userId) }).exec(),
      this.appModel.countDocuments({ companyId: compId, status: { $nin: [ApplicationStatus.REJECTED, ApplicationStatus.WITHDRAWN, ApplicationStatus.HIRED] } }).exec(),
      this.appModel.countDocuments({ companyId: compId, status: ApplicationStatus.SUBMITTED }).exec(),
      this.appModel.countDocuments({ companyId: compId, status: ApplicationStatus.SHORTLISTED }).exec(),
    ]);

    return {
      activeJobs: activeJobsCount,
      assignedJobs: assignedJobsCount,
      openApplications: openApplicationsCount,
      awaitingReview: awaitingReviewCount,
      shortlistedCandidates: shortlistedCount,
    };
  }
}
