export type ApplicationStatus = 
  | "NEW"
  | "UNDER_REVIEW"
  | "SHORTLISTED"
  | "INTERVIEW_SCHEDULED"
  | "OFFER"
  | "HIRED"
  | "REJECTED"
  | "WITHDRAWN";

export type ApplicationStage = string;

export interface CandidateSnapshot {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  location?: string;
  experienceYears: number;
  education?: string;
  skills: string[];
  projects: { name: string; description: string; url?: string }[];
  resumeUrl?: string;
  resumeVersion?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  availability?: string;
  currentSalary?: string;
  expectedSalary?: string;
  noticePeriod?: string;
}

export interface JobSnapshot {
  id: string;
  title: string;
  department: string;
  location: string;
  workMode: string;
}

export interface ScreeningAnswer {
  id: string;
  question: string;
  answer: string;
  score?: number; // 0-100
  flags?: string[]; // e.g. "Missing keyword", "Strong experience"
}

export interface ApplicationTimelineEvent {
  id: string;
  type: "STATUS_CHANGE" | "STAGE_CHANGE" | "NOTE_ADDED" | "INTERVIEW_SCHEDULED" | "SYSTEM_LOG" | "AI_INSIGHT" | "EMAIL_SENT";
  title: string;
  description?: string;
  timestamp: string;
  actor: {
    type: "CANDIDATE" | "RECRUITER" | "SYSTEM" | "AI";
    name?: string;
    avatarUrl?: string;
  };
  metadata?: Record<string, string | number | boolean>;
}

export interface RecruiterNote {
  id: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
    role: string;
  };
  content: string;
  timestamp: string;
  visibility: "PRIVATE" | "SHARED" | "HIRING_MANAGER_ONLY";
  mentions?: string[];
  replies?: RecruiterNote[];
}

export interface ApplicationTag {
  id: string;
  label: string;
  color?: string;
}

export type ApplicationPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface ApplicationAssignment {
  recruiter?: { id: string; name: string; avatarUrl?: string };
  hiringManager?: { id: string; name: string; avatarUrl?: string };
  coordinator?: { id: string; name: string; avatarUrl?: string };
}

export interface ApplicationHealth {
  lastActivityAt: string;
  daysInStage: number;
  totalAgeDays: number;
  responseTimeHours?: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  riskFactors: string[];
  expectedNextStage?: string;
}

export interface ApplicationRecommendation {
  overallMatchScore: number;
  technicalMatchScore: number;
  cultureMatchScore: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  recommendedNextAction: string;
  confidence: "LOW" | "MEDIUM" | "HIGH";
}

export interface InterviewSummary {
  id: string;
  title: string;
  date: string;
  interviewer: string;
  overallScore: number;
  feedback: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
}

export interface ApplicationAnalytics {
  views: number;
  resumeDownloads: number;
  emailsSent: number;
  timeToReview: number; // hours
}

export interface Application {
  id: string;
  candidate: CandidateSnapshot;
  job: JobSnapshot;
  status: ApplicationStatus;
  stage: ApplicationStage;
  appliedAt: string;
  updatedAt: string;
  priority: ApplicationPriority;
  matchScore: number;
  
  screeningAnswers: ScreeningAnswer[];
  timeline: ApplicationTimelineEvent[];
  notes: RecruiterNote[];
  tags: ApplicationTag[];
  assignment: ApplicationAssignment;
  health: ApplicationHealth;
  recommendation: ApplicationRecommendation;
  interviews: InterviewSummary[];
  analytics: ApplicationAnalytics;
}
