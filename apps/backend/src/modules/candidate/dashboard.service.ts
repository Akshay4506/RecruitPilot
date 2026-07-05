import { Injectable, NotFoundException } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { ProfileAggregatorService } from '../career-profile/profile-aggregator.service';
import { TalentInsightsService } from './talent-insights.service';
import { ProfileCompletionService } from './profile-completion.service';
import { TimelineService } from '../timeline/timeline.service';
import { DocumentService } from '../document/document.service';
import { ProfessionalSummaryService } from './professional-summary.service';
import { RecruiterProfileViewDTO } from './dto/recruiter-profile-view.dto';

@Injectable()
export class DashboardService {
  constructor(
    private candidateService: CandidateService,
    private aggregatorService: ProfileAggregatorService,
    private insightsService: TalentInsightsService,
    private completionService: ProfileCompletionService,
    private timelineService: TimelineService,
    private documentService: DocumentService,
    private summaryService: ProfessionalSummaryService
  ) {}

  async getDashboard(candidateId: string) {
    const candidate = await this.candidateService.findById(candidateId);
    if (!candidate) throw new NotFoundException('Candidate not found');

    const [timeline, documents] = await Promise.all([
      this.timelineService.getEventsForEntity('CANDIDATE', candidateId),
      this.documentService.getDocumentsByOwner(candidateId)
    ]);

    const hasResume = documents.some(doc => doc.documentType === 'RESUME');
    
    const snapshot = this.aggregatorService.generateSnapshot(candidate);
    const statistics = this.aggregatorService.generateStatistics(candidate);
    const completion = this.completionService.calculate(candidate, hasResume);
    const insights = this.insightsService.generateInsights(candidate, hasResume);

    const heroProfile = {
      avatarUrl: candidate.avatarUrl,
      firstName: candidate.personalInfo.firstName,
      lastName: candidate.personalInfo.lastName,
      professionalHeadline: snapshot.professionalHeadline,
      currentJobTitle: snapshot.currentJobTitle,
      currentCompany: snapshot.currentCompany,
      totalExperience: snapshot.totalYearsExperience,
      currentLocation: candidate.personalInfo.currentLocation,
      openToWork: snapshot.openToWork,
      preferredWorkMode: snapshot.preferredWorkMode,
      resumeAvailable: hasResume,
      profileCompletion: completion.overall,
      careerReadiness: snapshot.careerReadiness
    };

    return {
      heroProfile,
      careerSnapshot: snapshot,
      careerStatistics: statistics,
      profileCompletion: completion,
      talentInsights: insights,
      recentTimeline: timeline.slice(0, 5),
      documentsSummary: {
        totalDocuments: documents.length,
        resumes: documents.filter(d => d.documentType === 'RESUME').length,
        defaultResumeId: documents.find(d => d.isDefault && d.documentType === 'RESUME')?._id || null
      }
    };
  }

  async getRecruiterPreview(candidateId: string): Promise<RecruiterProfileViewDTO> {
    const candidate = await this.candidateService.findById(candidateId);
    if (!candidate) throw new NotFoundException('Candidate not found');

    const snapshot = this.aggregatorService.generateSnapshot(candidate);
    const statistics = this.aggregatorService.generateStatistics(candidate);

    return {
      personalInfo: {
        firstName: candidate.personalInfo.firstName,
        lastName: candidate.personalInfo.lastName,
        currentLocation: candidate.personalInfo.currentLocation,
        email: candidate.personalInfo.email,
      },
      socialProfiles: candidate.socialProfiles,
      snapshot,
      statistics,
      experiences: candidate.experiences || [],
      educations: candidate.educations || [],
      skills: candidate.skills || [],
      certifications: candidate.certifications || [],
      languages: candidate.languages || [],
    };
  }

  async getProfessionalSummary(candidateId: string) {
    const candidate = await this.candidateService.findById(candidateId);
    if (!candidate) throw new NotFoundException('Candidate not found');
    
    return this.summaryService.generateSummary(candidate);
  }
}
