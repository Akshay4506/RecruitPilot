import { Injectable } from '@nestjs/common';
import { CandidateDocument } from './schemas/candidate.schema';

export interface TalentInsight {
  title: string;
  description: string;
  type: 'WARNING' | 'SUGGESTION' | 'CRITICAL' | 'INFO';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  expectedImpact: string;
  actionUrl: string;
}

@Injectable()
export class TalentInsightsService {
  generateInsights(candidate: CandidateDocument, hasResume: boolean): TalentInsight[] {
    const insights: TalentInsight[] = [];

    if (!hasResume) {
      insights.push({
        title: 'Upload your Resume',
        description: 'Profiles with resumes get 4x more recruiter views.',
        type: 'CRITICAL',
        priority: 'HIGH',
        expectedImpact: '+400% Visibility',
        actionUrl: '/dashboard/documents'
      });
    }

    if (!candidate.experiences || candidate.experiences.length === 0) {
      insights.push({
        title: 'Add Work Experience',
        description: 'Add your most recent role so recruiters know what you do.',
        type: 'CRITICAL',
        priority: 'HIGH',
        expectedImpact: 'Required for Job Matching',
        actionUrl: '/dashboard/profile/experience'
      });
    }

    if (!candidate.professionalInfo?.headline) {
      insights.push({
        title: 'Craft a Professional Headline',
        description: 'Your headline is the first thing recruiters see in search results.',
        type: 'WARNING',
        priority: 'MEDIUM',
        expectedImpact: '+20% Click-through Rate',
        actionUrl: '/dashboard/profile/headline'
      });
    }

    if (!candidate.skills || candidate.skills.length === 0) {
      insights.push({
        title: 'Add Core Skills',
        description: 'Our AI matching engine relies heavily on verified skills.',
        type: 'WARNING',
        priority: 'HIGH',
        expectedImpact: 'Enables AI Job Matching',
        actionUrl: '/dashboard/profile/skills'
      });
    }

    if (!candidate.references || candidate.references.length === 0) {
      insights.push({
        title: 'Add Professional References',
        description: 'Adding a reference boosts your credibility significantly.',
        type: 'SUGGESTION',
        priority: 'LOW',
        expectedImpact: 'Higher Trust Score',
        actionUrl: '/dashboard/profile/references'
      });
    }

    return insights.sort((a, b) => {
      const p = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return p[b.priority] - p[a.priority];
    });
  }
}
