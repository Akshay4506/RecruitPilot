import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { TimelineService } from '../timeline/timeline.service';

@Injectable()
export class WorkspaceAggregatorService {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly timelineService: TimelineService
  ) {}

  async assembleCandidateWorkspace(companyId: string, applicationId: string, userId: string) {
    const application = await this.applicationService.getApplicationForCompany(companyId, applicationId, userId);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    // Fetch full timeline events for this application
    const timeline = await this.timelineService.getEventsForEntity('APPLICATION', application._id.toString());
    
    // Calculate Application Age
    const appliedAt = application.metadata?.appliedAt || new Date();
    const ageInDays = Math.floor((new Date().getTime() - appliedAt.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate Days in Current Stage
    const lastUpdatedAt = application.lastUpdatedAt || appliedAt;
    const daysInStage = Math.floor((new Date().getTime() - lastUpdatedAt.getTime()) / (1000 * 60 * 60 * 24));

    return {
      application: {
        id: application._id,
        applicationNumber: application.applicationNumber,
        status: application.status,
        priority: application.priority,
        labels: application.labels,
        screeningAnswers: application.screeningAnswers,
        assignedRecruiterId: application.assignedRecruiterId,
        assignedHiringManagerId: application.assignedHiringManagerId,
        statusHistory: application.statusHistory,
        recruiterNotes: application.recruiterNotes,
        ageInDays,
        daysInStage,
        metadata: application.metadata
      },
      candidate: application.candidateSnapshot,
      job: application.jobSnapshot,
      documents: {
        resume: application.resume,
        supportingDocuments: application.supportingDocuments
      },
      timeline
    };
  }
}
