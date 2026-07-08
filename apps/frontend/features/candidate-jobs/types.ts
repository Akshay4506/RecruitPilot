import { BaseEntity } from "@/types/api.types";

export type JobStatus = "DRAFT" | "PUBLISHED" | "CLOSED" | "ON_HOLD";
export type JobVisibility = "PUBLIC" | "INTERNAL" | "UNLISTED";
export type WorkMode = "REMOTE" | "HYBRID" | "ON_SITE";
export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
export type ExperienceLevel = "ENTRY" | "MID" | "SENIOR" | "LEAD" | "EXECUTIVE";

export interface JobLocation {
  city: string;
  state?: string;
  country: string;
  isRemote: boolean;
}

export interface JobSalary {
  min: number;
  max: number;
  currency: string;
  interval: "YEARLY" | "MONTHLY" | "HOURLY";
  hideSalary: boolean;
}

export interface HiringTeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface JobAnalytics {
  viewsCount: number;
  applicationsCount: number;
  savesCount: number;
}

export interface JobSearchMetadata {
  matchScore?: number; // 0-100 percentage match against candidate profile
  matchedSkills?: string[];
  missingSkills?: string[];
  experienceMatch?: boolean;
  educationMatch?: boolean;
}

export interface CompanyInfo {
  id: string;
  name: string;
  logoUrl?: string;
  industry: string;
  size: string; // e.g. "100-500", "Enterprise"
  website: string;
  headquarters: string;
  about: string;
  hiringInsights?: {
    averageResponseTimeDays: number;
    hiringVelocity: "SLOW" | "MEDIUM" | "FAST";
    interviewDifficulty: "EASY" | "MEDIUM" | "HARD";
    candidatesApplied: number;
  };
}

export interface JobSkill {
  name: string;
  type: "MANDATORY" | "PREFERRED";
}

export interface Job extends BaseEntity {
  slug: string;
  title: string;
  company: CompanyInfo;
  department: string;
  team?: string;
  summary: string;
  
  employmentType: EmploymentType;
  workMode: WorkMode;
  status: JobStatus;
  visibility: JobVisibility;
  experienceLevel: ExperienceLevel;
  
  location: JobLocation;
  office?: string;
  salary: JobSalary;
  
  benefits: string[];
  requirements: string[];
  responsibilities: string[];
  
  skills: JobSkill[];
  technologies: string[];
  
  hiringTeam: HiringTeamMember[];
  
  publishedAt?: string;
  closingDate?: string;
  
  analytics: JobAnalytics;
  searchMetadata?: JobSearchMetadata;
  
  isSaved?: boolean;
  isApplied?: boolean;
}
