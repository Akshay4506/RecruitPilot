import { Injectable } from '@nestjs/common';
import { CandidateDocument } from './schemas/candidate.schema';

@Injectable()
export class ProfileCompletionService {
  calculate(candidate: CandidateDocument, hasDocuments: boolean = false) {
    const sections = {
      personalInfo: this.calculatePersonalInfo(candidate),
      professionalInfo: this.calculateProfessionalInfo(candidate),
      careerPreferences: this.calculateCareerPreferences(candidate),
      socialProfiles: this.calculateSocialProfiles(candidate),
      experience: (candidate.experiences?.length || 0) > 0 ? 100 : 0,
      education: (candidate.educations?.length || 0) > 0 ? 100 : 0,
      skills: (candidate.skills?.length || 0) >= 3 ? 100 : ((candidate.skills?.length || 0) * 33.3),
      certifications: (candidate.certifications?.length || 0) > 0 ? 100 : 0,
      references: (candidate.references?.length || 0) > 0 ? 100 : 0,
      documents: hasDocuments ? 100 : 0,
    };

    const weights = {
      personalInfo: 0.10,
      professionalInfo: 0.10,
      careerPreferences: 0.10,
      socialProfiles: 0.05,
      experience: 0.20,
      education: 0.10,
      skills: 0.20,
      certifications: 0.05,
      references: 0.05,
      documents: 0.05,
    };

    let overall = 0;
    for (const [key, score] of Object.entries(sections)) {
      overall += score * weights[key as keyof typeof weights];
    }

    const healthScore = this.calculateHealthScore(candidate, overall);

    return {
      overall: Math.min(Math.round(overall), 100),
      healthScore,
      sections: {
        ...sections,
        skills: Math.min(Math.round(sections.skills), 100),
      },
    };
  }

  private calculateHealthScore(candidate: CandidateDocument, overallCompletion: number): number {
    let score = overallCompletion;
    
    // Penalize if no recent login
    const daysSinceLogin = candidate.lastLoginAt 
      ? (Date.now() - candidate.lastLoginAt.getTime()) / (1000 * 3600 * 24)
      : 30;
    if (daysSinceLogin > 30) score -= 10;

    // Bonus for open to work
    if (candidate.careerPreferences?.openToWork) score += 5;

    // Bonus for highly verified skills
    const verifiedSkills = (candidate.skills || []).filter(s => s.verificationSource !== 'SELF_DECLARED').length;
    if (verifiedSkills > 0) score += 5;

    return Math.max(0, Math.min(Math.round(score), 100));
  }

  private calculatePersonalInfo(candidate: CandidateDocument): number {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'currentLocation'];
    let filled = 0;
    fields.forEach(f => {
      if (candidate.personalInfo?.[f as keyof typeof candidate.personalInfo]) filled++;
    });
    return Math.round((filled / fields.length) * 100);
  }

  private calculateProfessionalInfo(candidate: CandidateDocument): number {
    const fields = ['headline', 'summary', 'currentJobTitle']; // Removed yearsOfExperience because it's computed now
    let filled = 0;
    fields.forEach(f => {
      if (candidate.professionalInfo?.[f as keyof typeof candidate.professionalInfo]) filled++;
    });
    return Math.round((filled / fields.length) * 100);
  }

  private calculateCareerPreferences(candidate: CandidateDocument): number {
    const prefs = candidate.careerPreferences;
    if (!prefs) return 0;
    let filled = 0;
    const total = 4;
    if (prefs.preferredJobRoles?.length > 0) filled++;
    if (prefs.preferredEmploymentTypes?.length > 0) filled++;
    if (prefs.preferredLocations?.length > 0 || prefs.preferredWorkMode?.includes('Remote')) filled++;
    if (prefs.expectedSalary) filled++;
    return Math.round((filled / total) * 100);
  }

  private calculateSocialProfiles(candidate: CandidateDocument): number {
    const socials = candidate.socialProfiles;
    if (!socials) return 0;
    if (socials.linkedIn || socials.github || socials.portfolio || socials.personalWebsite) {
      return 100;
    }
    return 0;
  }
}
