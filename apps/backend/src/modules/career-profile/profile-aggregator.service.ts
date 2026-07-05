import { Injectable } from '@nestjs/common';
import { CandidateDocument } from '../candidate/schemas/candidate.schema';

@Injectable()
export class ProfileAggregatorService {
  generateSnapshot(candidate: CandidateDocument) {
    const experiences = candidate.experiences || [];
    const currentExperiences = experiences.filter(exp => exp.isCurrent);
    
    // Sort by start date descending
    const sortedExperiences = [...experiences].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    const latestExperience = sortedExperiences[0];
    
    // Assuming companyId and jobTitleId are populated or we return the raw ObjectIds
    const currentCompany = currentExperiences.length > 0 ? currentExperiences[0].companyId : (latestExperience ? latestExperience.companyId : null);
    const currentRole = currentExperiences.length > 0 ? currentExperiences[0].jobTitleId : (latestExperience ? latestExperience.jobTitleId : null);

    const skills = candidate.skills || [];
    const topSkills = [...skills]
      .sort((a, b) => {
        const profWeight = { 'EXPERT': 4, 'ADVANCED': 3, 'INTERMEDIATE': 2, 'BEGINNER': 1 };
        const wA = profWeight[a.proficiency] || 0;
        const wB = profWeight[b.proficiency] || 0;
        if (wA !== wB) return wB - wA;
        return (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0);
      })
      .slice(0, 5)
      .map(s => s.skillId);

    const technologies = candidate.technologies || [];
    const topTechnologies = [...technologies]
      .sort((a, b) => (b.yearsUsed || 0) - (a.yearsUsed || 0))
      .slice(0, 5)
      .map(t => t.technologyId);

    const educations = candidate.educations || [];
    // Simplistic approach to highest degree: we assume the most recent is highest, or sort by a known enum
    const highestDegree = educations.length > 0 
      ? [...educations].sort((a, b) => b.startDate.getTime() - a.startDate.getTime())[0].degreeId 
      : null;

    const totalMonths = experiences.reduce((acc, exp) => {
      const start = exp.startDate.getTime();
      const end = exp.endDate ? exp.endDate.getTime() : Date.now();
      return acc + (end - start) / (1000 * 60 * 60 * 24 * 30.44);
    }, 0);
    const totalYearsExperience = Math.floor(totalMonths / 12 * 10) / 10;

    return {
      professionalHeadline: candidate.professionalInfo?.headline || null,
      currentJobTitle: currentRole,
      currentCompany: currentCompany,
      totalYearsExperience,
      currentEmploymentStatus: candidate.professionalInfo?.employmentStatus || null,
      preferredWorkMode: candidate.careerPreferences?.preferredWorkMode || [],
      preferredLocations: candidate.careerPreferences?.preferredLocations || [],
      openToWork: candidate.careerPreferences?.openToWork || false,
      noticePeriod: candidate.careerPreferences?.noticePeriod || null,
      topSkills,
      topTechnologies,
      highestDegree,
      primaryDomain: candidate.professionalInfo?.summary ? 'Software Engineering' : 'Unknown', // Simplistic heuristic or future AI field
      resumeVersion: 1, // Will be linked to document versions
      profileCompletion: this.calculateCompletion(candidate),
      careerReadiness: candidate.careerPreferences?.openToWork ? 'HIGH' : 'LOW'
    };
  }

  generateStatistics(candidate: CandidateDocument) {
    const experiences = candidate.experiences || [];
    
    const companiesSet = new Set(experiences.map(e => e.companyId?.toString()).filter(Boolean));
    const industriesSet = new Set(experiences.map(e => e.industryId?.toString()).filter(Boolean));
    
    const remoteExperienceRoles = experiences.filter(e => e.isRemote).length;
    const leadershipExperienceRoles = experiences.filter(e => e.isLeadership).length;
    
    let longestTenureMonths = 0;
    let totalTenureMonths = 0;
    
    experiences.forEach(exp => {
      const start = exp.startDate.getTime();
      const end = exp.endDate ? exp.endDate.getTime() : Date.now();
      const months = (end - start) / (1000 * 60 * 60 * 24 * 30.44);
      totalTenureMonths += months;
      if (months > longestTenureMonths) longestTenureMonths = months;
    });

    const averageTenureMonths = experiences.length > 0 ? totalTenureMonths / experiences.length : 0;

    return {
      totalYearsExperience: Math.floor(totalTenureMonths / 12 * 10) / 10,
      companiesWorked: companiesSet.size,
      numberOfProjects: 0, // Since Projects are a separate collection, this requires a DB count query, which should be passed in or fetched asynchronously
      numberOfCertifications: (candidate.certifications || []).length,
      numberOfSkills: (candidate.skills || []).length,
      numberOfTechnologies: (candidate.technologies || []).length,
      numberOfAchievements: (candidate.achievements || []).length,
      educationLevel: (candidate.educations || []).length,
      longestTenureYears: Math.floor(longestTenureMonths / 12 * 10) / 10,
      averageTenureYears: Math.floor(averageTenureMonths / 12 * 10) / 10,
      industriesWorked: industriesSet.size,
      remoteExperienceRoles,
      leadershipExperienceRoles
    };
  }

  private calculateCompletion(candidate: CandidateDocument): number {
    let score = 0;
    if (candidate.personalInfo?.firstName) score += 10;
    if (candidate.professionalInfo?.headline) score += 10;
    if (candidate.experiences && candidate.experiences.length > 0) score += 25;
    if (candidate.educations && candidate.educations.length > 0) score += 20;
    if (candidate.skills && candidate.skills.length > 0) score += 15;
    if (candidate.careerPreferences?.openToWork !== undefined) score += 10;
    if (candidate.certifications && candidate.certifications.length > 0) score += 10;
    return Math.min(score, 100);
  }
}
