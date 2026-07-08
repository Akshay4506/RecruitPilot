import type { BaseEntity } from "@/types/api.types";

export type InterviewStatus = "SCHEDULED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
export type MeetingPlatform = "ZOOM" | "GOOGLE_MEET" | "TEAMS" | "PHONE" | "IN_PERSON";
export type InterviewType = "TECHNICAL" | "BEHAVIORAL" | "SYSTEM_DESIGN" | "FOUNDER_CHAT" | "INITIAL_SCREEN";
export type InterviewConfirmationStatus = "PENDING" | "CONFIRMED" | "DECLINED" | "RESCHEDULE_REQUESTED";

export interface PanelMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarUrl?: string;
  companyName: string;
}

export type TimelineEventActor = "CANDIDATE" | "RECRUITER" | "SYSTEM" | "AI";

export interface InterviewTimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  actor: TimelineEventActor;
}

export interface InterviewMeetingDetails {
  platform: MeetingPlatform;
  joinUrl?: string;
  meetingId?: string;
  passcode?: string;
  organizerName: string;
  instructions?: string;
  language: string;
  accessibilityNotes?: string;
  location?: string; // For IN_PERSON
}

export interface InterviewPreparationInfo {
  agenda: string[];
  preparationNotes: string;
  requiredDocuments: string[];
  tips: string[];
  expectedDurationMinutes: number;
}

export interface InterviewInsights {
  preparationScore: number;
  profileMatchScore: number;
  interviewReadiness: "HIGH" | "MEDIUM" | "LOW";
  documentsReady: boolean;
  reminderStatus: string;
}

export interface Interview extends BaseEntity {
  interviewNumber: string;
  applicationId: string;
  candidateId: string;
  jobId: string;
  companyId: string;
  
  // High-level summary
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string;
  
  round: string; // e.g., "Round 1", "Final Round"
  type: InterviewType;
  status: InterviewStatus;
  confirmationStatus: InterviewConfirmationStatus;
  
  // Schedule
  date: string; // ISO string
  durationMinutes: number;
  timezone: string;
  
  meeting: InterviewMeetingDetails;
  panel: PanelMember[];
  preparation: InterviewPreparationInfo;
  insights: InterviewInsights;
  
  // Context
  applicationStage: string;
  applicationStatus: string;
  appliedAt: string;
  resumeUsed: {
    name: string;
    version: string;
  };
  
  timeline: InterviewTimelineEvent[];
}
