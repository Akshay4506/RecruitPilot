import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JobDocument, Job, JobStatus } from './schemas/job.schema';
import { JobTemplateDocument, JobTemplate } from './schemas/job-template.schema';
import { JobValidationService } from './job-validation.service';
import { JobLifecycleService } from './job-lifecycle.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(JobTemplate.name) private templateModel: Model<JobTemplateDocument>,
    private validationService: JobValidationService,
    private lifecycleService: JobLifecycleService,
    private eventEmitter: EventEmitter2
  ) {}

  async createJob(companyId: string, payload: any, userId: string) {
    this.validationService.validateJobPayload(payload);
    
    // Auto-generate search metadata on creation if not provided
    const searchMetadata = payload.searchMetadata || {
      normalizedTitle: '',
      searchKeywords: [],
      searchTokens: [],
    };

    const job = new this.jobModel({
      ...payload,
      companyId: new Types.ObjectId(companyId),
      searchMetadata,
      version: 1,
    });

    await job.save();

    this.eventEmitter.emit('job.created', {
      jobId: job._id,
      companyId,
      userId,
    });

    return job;
  }

  async createFromTemplate(companyId: string, templateId: string, userId: string) {
    const template = await this.templateModel.findOne({
      _id: new Types.ObjectId(templateId),
      companyId: new Types.ObjectId(companyId),
    }).exec();

    if (!template) throw new NotFoundException('Job template not found');

    const { _id, createdAt, updatedAt, templateName, templateDescription, ...jobPayload } = template.toObject() as any;

    const job = new this.jobModel({
      ...jobPayload,
      status: JobStatus.DRAFT,
      version: 1,
    });

    await job.save();

    this.eventEmitter.emit('job.created', {
      jobId: job._id,
      companyId,
      userId,
      fromTemplate: true,
    });

    return job;
  }

  async updateJob(companyId: string, jobId: string, payload: any, userId: string) {
    this.validationService.validateJobPayload(payload);

    const job = await this.jobModel.findOne({
      _id: new Types.ObjectId(jobId),
      companyId: new Types.ObjectId(companyId),
    }).exec();

    if (!job) throw new NotFoundException('Job not found');

    // Auto-increment version
    job.version = (job.version || 1) + 1;

    Object.assign(job, payload);
    await job.save();

    this.eventEmitter.emit('job.updated', {
      jobId: job._id,
      companyId,
      userId,
      version: job.version,
    });

    return job;
  }

  async changeStatus(companyId: string, jobId: string, targetStatus: JobStatus, userId: string) {
    const job = await this.jobModel.findOne({
      _id: new Types.ObjectId(jobId),
      companyId: new Types.ObjectId(companyId),
    }).exec();

    if (!job) throw new NotFoundException('Job not found');

    this.lifecycleService.validateTransition(job.status, targetStatus);

    job.status = targetStatus;

    if (targetStatus === JobStatus.PUBLISHED) {
      job.publishedAt = new Date();
      job.publishedBy = new Types.ObjectId(userId);
      // Generate slug if not exists
      if (!job.slug) {
        job.slug = `job-${job._id}`; // Basic slug, usually would use title + ID
      }
    } else if (targetStatus === JobStatus.CLOSED) {
      job.closedAt = new Date();
    } else if (targetStatus === JobStatus.ARCHIVED) {
      job.archivedAt = new Date();
    } else if (targetStatus === JobStatus.APPROVED) {
      job.approvedAt = new Date();
      job.approvedBy = new Types.ObjectId(userId);
    }

    await job.save();

    this.eventEmitter.emit(`job.status_changed`, {
      jobId: job._id,
      companyId,
      userId,
      status: targetStatus,
    });

    return job;
  }

  async getJob(companyId: string, jobId: string) {
    const job = await this.jobModel.findOne({
      _id: new Types.ObjectId(jobId),
      companyId: new Types.ObjectId(companyId),
    }).exec();

    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async listJobs(companyId: string) {
    return this.jobModel.find({ companyId: new Types.ObjectId(companyId) }).sort({ createdAt: -1 }).exec();
  }
}
