import { Injectable } from '@nestjs/common';
import { JobDocument } from './schemas/job.schema';

@Injectable()
export class JobSnapshotService {
  generateRecruiterSnapshot(job: JobDocument) {
    return {
      id: job._id,
      jobTitleId: job.jobTitleId,
      status: job.status,
      workMode: job.workMode,
      location: job.location,
      openPositions: job.openPositions,
      publishedAt: job.publishedAt,
      analytics: job.analytics,
      tags: job.tags,
      hiringTeam: job.hiringTeam,
      // Extracted metadata useful for quick recruiter overview
      isStale: job.publishedAt ? (new Date().getTime() - job.publishedAt.getTime() > 30 * 24 * 60 * 60 * 1000) : false,
      totalRequirements: (job.skills?.length || 0) + (job.technologies?.length || 0),
    };
  }
}
