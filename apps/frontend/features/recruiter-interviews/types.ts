export type InterviewStatus = 
  | "DRAFT" 
  | "PENDING_SCHEDULING"
  | "SCHEDULED"
  | "COMPLETED"
  | "CANCELLED"
  | "RESCHEDULED"
  | "PENDING_FEEDBACK"
  | "NEEDS_DISCUSSION"
  | "OFFER_APPROVED";

export type InterviewType = "SCREENING" | "TECHNICAL" | "BEHAVIORAL" | "SYSTEM_DESIGN" | "MANAGER" | "CULTURE_FIT" | "PANEL";

export type Recommendation = "STRONG_HIRE" | "HIRE" | "LEAN_HIRE" | "NEUTRAL" | "LEAN_NO_HIRE" | "NO_HIRE" | "STRONG_NO_HIRE" | "NEEDS_DISCUSSION";

export type PanelRole = "LEAD" | "INTERVIEWER" | "OBSERVER";
export type MeetingPlatform = "GOOGLE_MEET" | "ZOOM" | "MICROSOFT_TEAMS" | "PHONE" | "IN_PERSON";

export interface PanelMember {
  id: string;
  name: string;
  avatarUrl?: string;
  role: PanelRole;
  department: string;
  title: string;
}

export interface MeetingDetails {
  platform: MeetingPlatform;
  url?: string;
  passcode?: string;
  instructions?: string;
}

export interface InterviewCandidate {
  id: string;
  name: string;
  avatarUrl?: string;
  jobId: string;
  jobTitle: string;
}

export interface Interview {
  id: string;
  candidate: InterviewCandidate;
  type: InterviewType;
  status: InterviewStatus;
  round: number;
  totalRounds: number;
  scheduledAt: string; // ISO String
  durationMinutes: number;
  timezone: string;
  panel: PanelMember[];
  meetingDetails?: MeetingDetails;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilitySlot {
  id: string;
  panelMemberId: string;
  startAt: string;
  endAt: string;
}

export interface QuestionResponse {
  questionId: string;
  competencyId: string;
  question: string;
  notes: string;
  rating: number; // 1-5
}

export interface CompetencyScore {
  competencyId: string;
  name: string;
  weight: number; // e.g. 1.0, 1.5
  score: number; // 1-5
  evidence: string;
}

export interface Scorecard {
  id: string;
  interviewId: string;
  panelMemberId: string;
  status: "DRAFT" | "SUBMITTED" | "LOCKED";
  competencies: CompetencyScore[];
  questions: QuestionResponse[];
  recommendation: Recommendation;
  overallComments: string;
  submittedAt?: string;
}

export interface EvaluationSummary {
  interviewId: string;
  averageScore: number;
  variance: number;
  highestScore: number;
  lowestScore: number;
  vetoTriggered: boolean;
  consensusAchieved: boolean;
  consensusRecommendation: Recommendation;
}

export interface InterviewTemplate {
  id: string;
  name: string;
  type: InterviewType;
  description: string;
  durationMinutes: number;
  competencies: { id: string; name: string; weight: number }[];
  defaultQuestions: { id: string; competencyId: string; question: string }[];
}

export interface DashboardMetrics {
  averageDurationMins: number;
  feedbackCompletionPercent: number;
  panelUtilizationPercent: number;
  timeToDecisionDays: number;
  upcomingCount: number;
  completedCount: number;
}
