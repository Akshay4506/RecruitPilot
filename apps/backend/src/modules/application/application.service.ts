import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Application, ApplicationDocument, ApplicationStatus } from './schemas/application.schema';
import { ApplicationValidationService } from './application-validation.service';
import { ApplicationLifecycleService } from './application-lifecycle.service';
import { ApplicationSnapshotService } from './application-snapshot.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name) private appModel: Model<ApplicationDocument>,
    private validationService: ApplicationValidationService,
    private lifecycleService: ApplicationLifecycleService,
    private snapshotService: ApplicationSnapshotService,
    private eventEmitter: EventEmitter2
  ) {}

  private generateApplicationNumber(): string {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `APP-${year}-${randomNum}`;
  }

  async submitApplication(candidateId: string, jobId: string, companyId: string, payload: any) {
    await this.validationService.validateDuplicate(candidateId, jobId);
    this.validationService.validateScreeningAnswers(payload.screeningAnswers);

    const { candidateSnapshot, jobSnapshot } = await this.snapshotService.generateSnapshots(
      candidateId, jobId, companyId, payload.resume?.documentVersion
    );

    const application = new this.appModel({
      applicationNumber: this.generateApplicationNumber(),
      candidateId: new Types.ObjectId(candidateId),
      jobId: new Types.ObjectId(jobId),
      companyId: new Types.ObjectId(companyId),
      status: ApplicationStatus.SUBMITTED,
      ...payload,
      candidateSnapshot,
      jobSnapshot,
      snapshotVersion: 1,
      metadata: {
        appliedAt: new Date(),
        lastActivity: new Date(),
        source: payload.source || 'Direct',
        consentGiven: payload.consentGiven || true,
        consentTimestamp: new Date(),
      }
    });

    await application.save();

    this.eventEmitter.emit('application.submitted', {
      applicationId: application._id,
      candidateId,
      jobId,
      companyId,
    });

    return application;
  }

  async changeStatus(applicationId: string, targetStatus: ApplicationStatus, userId: string, reason?: string) {
    const application = await this.appModel.findById(applicationId).exec();
    if (!application) throw new NotFoundException('Application not found');

    this.lifecycleService.validateTransition(application.status, targetStatus);

    const historyItem = {
      fromStatus: application.status,
      toStatus: targetStatus,
      changedBy: new Types.ObjectId(userId),
      changedAt: new Date(),
      reason,
    };

    application.status = targetStatus;
    application.statusHistory.push(historyItem);
    application.metadata.lastActivity = new Date();
    application.lastUpdatedAt = new Date();

    if (targetStatus === ApplicationStatus.WITHDRAWN) {
      application.metadata.withdrawnAt = new Date();
      application.metadata.withdrawalReason = reason;
    }

    await application.save();

    this.eventEmitter.emit('application.status_changed', {
      applicationId: application._id,
      candidateId: application.candidateId,
      status: targetStatus,
      userId,
    });

    return application;
  }

  async assignRecruiter(applicationId: string, recruiterId: string, role: 'recruiter' | 'hiringManager' | 'coordinator', userId: string) {
    const application = await this.appModel.findById(applicationId).exec();
    if (!application) throw new NotFoundException('Application not found');

    if (role === 'recruiter') application.assignedRecruiterId = new Types.ObjectId(recruiterId);
    if (role === 'hiringManager') application.assignedHiringManagerId = new Types.ObjectId(recruiterId);
    if (role === 'coordinator') application.assignedCoordinatorId = new Types.ObjectId(recruiterId);

    application.lastUpdatedAt = new Date();
    await application.save();

    this.eventEmitter.emit('application.assigned', {
      applicationId: application._id,
      assigneeId: recruiterId,
      role,
      assignedBy: userId,
    });

    return application;
  }

  async getApplicationForCandidate(candidateId: string, applicationId: string) {
    const application = await this.appModel.findOne({
      _id: new Types.ObjectId(applicationId),
      candidateId: new Types.ObjectId(candidateId),
    }).exec();
    if (!application) throw new NotFoundException('Application not found');
    return application;
  }

  async getApplicationForCompany(companyId: string, applicationId: string, userId: string) {
    const application = await this.appModel.findOne({
      _id: new Types.ObjectId(applicationId),
      companyId: new Types.ObjectId(companyId),
    }).exec();
    
    if (!application) throw new NotFoundException('Application not found');

    // Track view interaction
    if (!application.firstReviewedAt) {
      application.firstReviewedAt = new Date();
    }
    application.viewedByRecruiterAt = new Date();
    await application.save();

    return application;
  }
}
