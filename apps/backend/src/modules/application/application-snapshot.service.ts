import { Injectable, NotFoundException } from '@nestjs/common';
import { JobService } from '../job/job.service';
import { ProfileAggregatorService } from '../career-profile/profile-aggregator.service';
import { CandidateService } from '../candidate/candidate.service';
import { CandidateSnapshot, JobSnapshot } from './schemas/application.schema';

@Injectable()
export class ApplicationSnapshotService {
  constructor(
    private jobService: JobService,
    private profileAggregator: ProfileAggregatorService,
    private candidateService: CandidateService
  ) {}

  async generateSnapshots(candidateId: string, jobId: string, companyId: string, resumeVersion?: number) {
    const candidate = await this.candidateService.findById(candidateId);
    if (!candidate) throw new NotFoundException('Candidate not found');

    const profileSnapshot = this.profileAggregator.generateSnapshot(candidate);
    
    const candidateSnapshot: CandidateSnapshot = {
      name: `${candidate.personalInfo?.firstName || ''} ${candidate.personalInfo?.lastName || ''}`.trim(),
      headline: profileSnapshot.professionalHeadline || '',
      currentCompany: profileSnapshot.currentCompany?.toString() || '',
      currentRole: profileSnapshot.currentJobTitle?.toString() || '',
      totalExperienceYears: profileSnapshot.totalYearsExperience || 0,
      topSkills: profileSnapshot.topSkills?.map(s => s.toString()) || [],
      resumeVersion: resumeVersion || 1,
      careerSummary: candidate.professionalInfo?.summary || '',
      profileCompletion: profileSnapshot.profileCompletion || 0,
      careerReadiness: profileSnapshot.careerReadiness === 'HIGH' ? 100 : 0, // Quick map
    };

    const job = await this.jobService.getJob(companyId, jobId);
    
    const jobSnapshot: JobSnapshot = {
      title: job.jobTitleId?.toString() || 'Unknown Title',
      departmentId: job.departmentId,
      hiringManagerId: job.hiringTeam?.find(t => t.role === 'Hiring Manager')?.userId,
      jobVersion: job.version || 1,
      salaryInformation: job.compensation,
      requiredSkills: job.skills,
      technologies: job.technologies,
    };

    return { candidateSnapshot, jobSnapshot };
  }
}
