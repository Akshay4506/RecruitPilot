import type { BaseEntity, BaseQueryParams } from "./api.types";

// ─────────────────────────────────────────────────────────────────────────────
// Job domain types
// ─────────────────────────────────────────────────────────────────────────────

export type JobStatus = "DRAFT" | "PUBLISHED" | "CLOSED" | "ARCHIVED";
export type JobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "REMOTE";
export type ExperienceLevel = "ENTRY" | "MID" | "SENIOR" | "LEAD" | "EXECUTIVE";

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

export interface Job extends BaseEntity {
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  status: JobStatus;
  type: JobType;
  experienceLevel: ExperienceLevel;
  location: string;
  isRemote: boolean;
  salaryRange?: SalaryRange;
  skills: string[];
  tags: string[];
  companyId: string;
  departmentId?: string;
  postedById: string;
  closingDate?: string;
  applicationCount: number;
  viewCount: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Candidate domain types
// ─────────────────────────────────────────────────────────────────────────────

export type CandidateStatus = "ACTIVE" | "PASSIVE" | "NOT_LOOKING";

export interface WorkExperience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
}

export interface Candidate extends BaseEntity {
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  headline?: string;
  summary?: string;
  status: CandidateStatus;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  location?: string;
  isOpenToRelocation: boolean;
  expectedSalary?: number;
  expectedSalaryCurrency?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Application domain types
// ─────────────────────────────────────────────────────────────────────────────

export type ApplicationStatus =
  | "APPLIED"
  | "SCREENING"
  | "PHONE_SCREEN"
  | "INTERVIEW"
  | "TECHNICAL"
  | "OFFER"
  | "HIRED"
  | "REJECTED"
  | "WITHDRAWN";

export interface Application extends BaseEntity {
  candidateId: string;
  candidate?: Candidate;
  jobId: string;
  job?: Job;
  status: ApplicationStatus;
  coverLetter?: string;
  resumeUrl?: string;
  currentStage: string;
  rating?: number;
  recruiterNotes?: string;
  rejectionReason?: string;
  withdrawnAt?: string;
  hiredAt?: string;
  sourceChannel?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Interview domain types
// ─────────────────────────────────────────────────────────────────────────────

export type InterviewStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type InterviewType =
  | "PHONE"
  | "VIDEO"
  | "IN_PERSON"
  | "TECHNICAL"
  | "BEHAVIORAL"
  | "PANEL"
  | "CASE_STUDY";

export type InterviewDecision =
  | "PASS"
  | "FAIL"
  | "HOLD"
  | "NEEDS_DISCUSSION"
  | "STRONG_HIRE"
  | "NO_HIRE";

export interface InterviewParticipant {
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  isLead: boolean;
}

export interface Interview extends BaseEntity {
  applicationId: string;
  application?: Application;
  title: string;
  type: InterviewType;
  status: InterviewStatus;
  scheduledAt: string;
  durationMinutes: number;
  location?: string;
  meetingLink?: string;
  participants: InterviewParticipant[];
  decision?: InterviewDecision;
  overallScore?: number;
  confidenceLevel?: string;
  notes?: string;
  feedbackDeadline?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Analytics domain types
// ─────────────────────────────────────────────────────────────────────────────

export interface HiringFunnelData {
  stage: string;
  count: number;
  percentage: number;
  conversionRate?: number;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface AnalyticsMetric {
  id: string;
  label: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  unit?: string;
}

export interface RecruitmentAnalytics {
  overview: AnalyticsMetric[];
  hiringFunnel: HiringFunnelData[];
  applicationsByDate: TimeSeriesDataPoint[];
  hiresByMonth: TimeSeriesDataPoint[];
  timeToHire: AnalyticsMetric;
  timeToFirstInterview: AnalyticsMetric;
  offerAcceptanceRate: AnalyticsMetric;
}

// ─────────────────────────────────────────────────────────────────────────────
// Company/Workspace domain types
// ─────────────────────────────────────────────────────────────────────────────

export interface Company extends BaseEntity {
  name: string;
  logoUrl?: string;
  website?: string;
  industry?: string;
  size?: string;
  description?: string;
  plan: "FREE" | "STARTER" | "GROWTH" | "ENTERPRISE";
}

export interface Department extends BaseEntity {
  name: string;
  companyId: string;
  headCount: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Request param types
// ─────────────────────────────────────────────────────────────────────────────

export interface GetJobsParams extends BaseQueryParams {
  status?: JobStatus | JobStatus[];
  type?: JobType;
  companyId?: string;
  departmentId?: string;
}

export interface GetCandidatesParams extends BaseQueryParams {
  status?: CandidateStatus;
  skills?: string[];
}

export interface GetApplicationsParams extends BaseQueryParams {
  status?: ApplicationStatus | ApplicationStatus[];
  jobId?: string;
  candidateId?: string;
}

export interface GetInterviewsParams extends BaseQueryParams {
  status?: InterviewStatus | InterviewStatus[];
  applicationId?: string;
  scheduledFrom?: string;
  scheduledTo?: string;
}
