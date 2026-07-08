import { Injectable } from '@nestjs/common';
import { ApplicationDocument } from '../application/schemas/application.schema';

@Injectable()
export class InterviewSnapshotService {
  // Since the Application already contains immutable snapshots of the Candidate and Job
  // at the time of application, we will carry those forward to the Interview.
  // This ensures the interviewers see exactly what the candidate applied with.
  
  generateSnapshots(application: ApplicationDocument) {
    return {
      candidateSnapshot: application.candidateSnapshot,
      jobSnapshot: application.jobSnapshot,
    };
  }
}
