import type { Candidate, WorkExperience, Education } from "@/types/domain.types";

export type ProficiencyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
export type LanguageProficiency = "NATIVE" | "FLUENT" | "PROFESSIONAL" | "CONVERSATIONAL" | "BASIC";

export interface ExtendedWorkExperience extends WorkExperience {
  achievements?: string[];
  responsibilities?: string[];
  skillsUsed?: string[];
  technologiesUsed?: string[];
}

export interface ExtendedEducation extends Education {
  achievements?: string[];
  activities?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  documents?: { name: string; url: string }[];
  images?: { name: string; url: string }[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Language {
  id: string;
  name: string;
  reading: LanguageProficiency;
  writing: LanguageProficiency;
  speaking: LanguageProficiency;
  isNative: boolean;
}

export interface Reference {
  id: string;
  name: string;
  company: string;
  title: string;
  relationship: string;
  email: string;
  phone?: string;
  status: "VERIFIED" | "PENDING" | "UNVERIFIED";
}

export interface Technology {
  id: string;
  name: string;
  proficiency: ProficiencyLevel;
  yearsOfExperience: number;
  projectsUsedCount: number;
  isVerified: boolean;
}

export interface SkillDetail {
  id: string;
  name: string;
  type: "PRIMARY" | "SECONDARY";
  proficiency: ProficiencyLevel;
  yearsOfExperience: number;
  isVerified: boolean;
}

export interface SocialProfile {
  network: "GitHub" | "LinkedIn" | "Portfolio" | "Website" | "LeetCode" | "HackerRank" | "StackOverflow" | "Twitter" | "Other";
  url: string;
  username?: string;
}

export interface CareerPreferences {
  preferredRoles: string[];
  preferredLocations: string[];
  employmentTypes: string[];
  expectedSalary: { min: number; max: number; currency: string };
  noticePeriod: string;
  remotePreference: "REMOTE" | "HYBRID" | "ON_SITE";
  isOpenToRelocation: boolean;
  requiresVisaSponsorship: boolean;
}

export interface CandidateProfile extends Omit<Candidate, "experience" | "education" | "skills"> {
  experience: ExtendedWorkExperience[];
  education: ExtendedEducation[];
  skills: SkillDetail[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  references: Reference[];
  technologies: Technology[];
  socialProfiles: SocialProfile[];
  preferences: CareerPreferences;
  healthScore: number;
  profileCompletion: number;
}
