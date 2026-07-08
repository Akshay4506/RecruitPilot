import { BaseEntity } from "@/types/api.types";

export type JobStatus = "DRAFT" | "PUBLISHED" | "PAUSED" | "CLOSED" | "ARCHIVED";
export type JobVisibility = "PUBLIC" | "INTERNAL" | "UNLISTED";
export type WorkMode = "REMOTE" | "HYBRID" | "ON_SITE";
export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "TEMPORARY";
export type ExperienceLevel = "ENTRY" | "MID" | "SENIOR" | "LEAD" | "EXECUTIVE";
export type HiringStage = "APPLIED" | "SCREENING" | "TECHNICAL" | "MANAGER" | "HR" | "OFFER" | "HIRED";

export interface JobLocation {
  city: string;
  state?: string;
  country: string;
  isRemote: boolean;
}

export interface SalaryRange {
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
  department?: string;
  avatarUrl?: string;
}

export interface JobRequirement {
  id: string;
  content: string;
  isMandatory: boolean;
}

export interface JobBenefit {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface JobSkill {
  name: string;
  type: "MANDATORY" | "PREFERRED";
}

export interface JobAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface PublishingHistory {
  id: string;
  status: JobStatus;
  timestamp: string;
  changedBy: string;
  notes?: string;
}

export interface JobAnalytics {
  viewsCount: number;
  applicationsCount: number;
  savesCount: number;
  interviewsCount: number;
  offersCount: number;
  hiresCount: number;
  conversionRate: number; // percentage
  avgTimeToHireDays?: number;
  avgTimeToFillDays?: number;
}

export interface CandidatePipelineSummary {
  applied: number;
  screening: number;
  technical: number;
  manager: number;
  hr: number;
  offer: number;
  hired: number;
  totalActive: number;
}

export interface JobTimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  actor: "RECRUITER" | "SYSTEM" | "CANDIDATE";
  type: "STATUS_CHANGE" | "EDIT" | "COMMENT" | "MILESTONE";
}

export interface JobHealth {
  status: "HEALTHY" | "AGING" | "NEEDS_ATTENTION";
  reasons: string[];
}

export interface Job extends BaseEntity {
  slug: string;
  title: string;
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
  salary: SalaryRange;
  
  benefits: JobBenefit[];
  requirements: JobRequirement[];
  responsibilities: string[];
  qualifications: string[];
  
  skills: JobSkill[];
  technologies: string[];
  
  hiringTeam: HiringTeamMember[];
  attachments: JobAttachment[];
  
  publishedAt?: string;
  closingDate?: string;
  
  analytics: JobAnalytics;
  pipeline: CandidatePipelineSummary;
  publishingHistory: PublishingHistory[];
  health: JobHealth;
}
