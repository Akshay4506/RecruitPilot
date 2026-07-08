import type { BaseEntity } from "@/types/api.types";

export type ApplicationStatus = "ACTIVE" | "WITHDRAWN" | "REJECTED" | "HIRED";
export type ApplicationStage = "SUBMITTED" | "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEW" | "OFFER" | "HIRED";

export interface CandidateSnapshot {
  currentRole: string;
  yearsOfExperience: number;
  topSkills: string[];
  resumeVersion: string;
}

export interface JobSnapshot {
  jobTitle: string;
  department: string;
  requirements: string[];
  salaryRange: string;
  hiringManager: string;
  version: string;
}

export interface ScreeningAnswer {
  id: string;
  question: string;
  answer: string;
  type: "TEXT" | "MULTIPLE_CHOICE" | "BOOLEAN";
  isRequired: boolean;
}

export type TimelineEventActor = "CANDIDATE" | "RECRUITER" | "SYSTEM" | "AI";

export interface ApplicationTimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  actor: TimelineEventActor;
}

export type InterviewStatus = "UPCOMING" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";

export interface InterviewInfo {
  id: string;
  title: string;
  date: string; // ISO string
  durationMinutes: number;
  type: "VIDEO" | "PHONE" | "ON_SITE";
  status: InterviewStatus;
  meetingLink?: string;
}

export interface RecruiterContact {
  id: string;
  name: string;
  role: string;
  department?: string;
  avatarUrl?: string;
  responseTime?: string;
}

export interface ApplicationInsights {
  matchScore: number;
  resumeMatchScore: number;
  profileCompletionScore: number;
  missingSkills: string[];
  nextExpectedStage: string;
  probabilityScore?: number;
  estimatedNextUpdateDays?: number;
  competitionLevel?: "LOW" | "MEDIUM" | "HIGH";
  recruiterActivity?: "ACTIVE" | "INACTIVE" | "MODERATE";
}

export interface Application extends BaseEntity {
  applicationNumber: string;
  candidateId: string;
  jobId: string;
  companyId: string;
  
  // High-level summary fields mapped for quick list view
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string;
  location: string;
  
  status: ApplicationStatus;
  stage: ApplicationStage;
  progressPercentage: number;
  
  resume: {
    id: string;
    name: string;
    version: string;
    uploadedAt: string;
    url?: string;
  };
  
  supportingDocuments: {
    id: string;
    name: string;
    type: string;
    uploadedAt: string;
    url?: string;
  }[];
  
  screeningAnswers: ScreeningAnswer[];
  candidateSnapshot: CandidateSnapshot;
  jobSnapshot: JobSnapshot;
  
  assignedRecruiter?: RecruiterContact;
  assignedHiringManager?: RecruiterContact;
  assignedCoordinator?: RecruiterContact;
  
  source: string;
  appliedAt: string;
  withdrawnAt?: string;
  rejectedAt?: string;
  lastActivityAt: string;
  
  priority: "LOW" | "MEDIUM" | "HIGH";
  notes?: string;
  
  timeline: ApplicationTimelineEvent[];
  interviews: InterviewInfo[];
  insights: ApplicationInsights;
}
