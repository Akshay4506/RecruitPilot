import { Injectable } from '@nestjs/common';
import { CandidateDocument } from './schemas/candidate.schema';
import { ProfileAggregatorService } from '../career-profile/profile-aggregator.service';

@Injectable()
export class ProfessionalSummaryService {
  constructor(private aggregatorService: ProfileAggregatorService) {}

  generateSummary(candidate: CandidateDocument, populatedCompany?: string, populatedTitle?: string, populatedSkills?: string[]) {
    const snapshot = this.aggregatorService.generateSnapshot(candidate);
    
    const structured = {
      headline: snapshot.professionalHeadline || 'Professional Candidate',
      coreCompetencies: populatedSkills || [],
      experienceSummary: `${snapshot.totalYearsExperience} years of professional experience`,
      availability: snapshot.openToWork ? `Available for new opportunities (${snapshot.noticePeriod || 'Immediate'})` : 'Currently employed'
    };

    const expText = snapshot.totalYearsExperience > 0 
      ? `with ${snapshot.totalYearsExperience} years of experience` 
      : 'starting their career';
      
    const roleText = populatedTitle ? `as a ${populatedTitle}` : 'professional';
    const companyText = populatedCompany ? ` at ${populatedCompany}` : '';
    
    const text = `${candidate.personalInfo.firstName} is a dedicated ${roleText}${companyText} ${expText}. ${structured.availability}.`;

    return {
      structured,
      fullText: text
    };
  }
}
