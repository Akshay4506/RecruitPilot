export interface DashboardMetrics {
  openJobs: number;
  applicationsReceived: number;
  pendingReviews: number;
  interviewsToday: number;
  offersSent: number;
  hires: number;
  hiringVelocityDays: number;
  timeToHireDays: number;
}

export interface HiringGoal {
  targetHires: number;
  currentHires: number;
  month: string;
}

export interface RecruitmentInsight {
  id: string;
  title: string;
  description: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  type: "JOB_AGING" | "REJECTION_RATE" | "WORKLOAD" | "PIPELINE_HEALTH" | "VELOCITY";
  actionLabel?: string;
  actionUrl?: string;
}

export interface AssignedJob {
  id: string;
  title: string;
  department: string;
  applicationsCount: number;
  hiringManager: string;
  daysOpen: number;
  status: "PUBLISHED" | "DRAFT" | "CLOSED" | "ON_HOLD";
  progressPercentage: number;
}

export interface RecentApplication {
  id: string;
  candidateName: string;
  candidateAvatarUrl?: string;
  jobTitle: string;
  jobId: string;
  status: "NEW" | "REVIEWING" | "SHORTLISTED" | "INTERVIEWING" | "OFFERED" | "REJECTED";
  appliedAt: string;
  matchScore: number;
}

export interface UpcomingInterview {
  id: string;
  candidateName: string;
  candidateAvatarUrl?: string;
  jobTitle: string;
  type: "INITIAL_SCREEN" | "TECHNICAL" | "SYSTEM_DESIGN" | "BEHAVIORAL" | "FOUNDER_CHAT";
  date: string;
  panelCount: number;
  meetingPlatform: "IN_PERSON" | "VIDEO" | "PHONE";
  joinUrl?: string;
}

export interface PipelineMetric {
  stage: "SUBMITTED" | "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEW" | "OFFER" | "HIRED";
  count: number;
  conversionRateFromPrevious: number;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "APPLICATION" | "INTERVIEW" | "OFFER" | "SYSTEM" | "REMINDER";
  read: boolean;
}

export type TimelineEventActor = "CANDIDATE" | "RECRUITER" | "SYSTEM" | "AI";

export interface RecruiterActivityEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  actor: TimelineEventActor;
  relatedEntityId?: string;
}

export interface RecruiterDashboard {
  recruiterName: string;
  companyName: string;
  metrics: DashboardMetrics;
  hiringGoal: HiringGoal;
  insights: RecruitmentInsight[];
  assignedJobs: AssignedJob[];
  recentApplications: RecentApplication[];
  upcomingInterviews: UpcomingInterview[];
  pipeline: PipelineMetric[];
  notifications: Notification[];
  activityTimeline: RecruiterActivityEvent[];
}
