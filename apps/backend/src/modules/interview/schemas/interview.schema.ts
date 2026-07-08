import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InterviewDocument = Interview & Document;

export enum InterviewStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum CandidateConfirmationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  RESCHEDULE_REQUESTED = 'RESCHEDULE_REQUESTED',
  EXPIRED = 'EXPIRED',
}

export enum MeetingType {
  IN_PERSON = 'IN_PERSON',
  VIRTUAL = 'VIRTUAL',
  PHONE = 'PHONE',
}

export enum Recommendation {
  STRONG_HIRE = 'Strong Hire',
  HIRE = 'Hire',
  LEAN_HIRE = 'Lean Hire',
  NEUTRAL = 'Neutral',
  LEAN_NO_HIRE = 'Lean No Hire',
  NO_HIRE = 'No Hire',
  STRONG_NO_HIRE = 'Strong No Hire',
  NEEDS_DISCUSSION = 'Needs Discussion',
}

export enum FeedbackStatus {
  DRAFT = 'DRAFT',
  FINAL = 'FINAL',
}

export enum AttendanceStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

@Schema({ _id: false })
export class Meeting {
  @Prop({ type: String, enum: MeetingType, required: true })
  type: MeetingType;

  @Prop({ type: String })
  locationOrUrl?: string;

  @Prop({ type: String })
  dialInNumber?: string;

  @Prop({ type: String })
  instructions?: string;

  @Prop({ type: String })
  joinUrl?: string;

  @Prop({ type: String })
  meetingId?: string;

  @Prop({ type: String })
  passcode?: string;

  @Prop({ type: String })
  organizer?: string;

  @Prop({ type: String })
  preparationNotes?: string;

  @Prop({ type: String })
  language?: string;

  @Prop({ type: String })
  accessibilityNotes?: string;
}

@Schema({ _id: false })
export class Competency {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  score: number;

  @Prop({ type: Number, required: true })
  maxScore: number;

  @Prop({ type: Number, default: 1 })
  weight: number;

  @Prop({ type: String })
  comments?: string;
}

@Schema({ _id: false })
export class ScorecardCategory {
  @Prop({ type: String, required: true })
  categoryName: string;

  @Prop({ type: [{ type: Competency }], default: [] })
  competencies: Competency[];
}

@Schema({ _id: false })
export class PanelMemberFeedback {
  @Prop({ type: [{ type: ScorecardCategory }], default: [] })
  categories: ScorecardCategory[];

  @Prop({ type: String })
  notes?: string;

  @Prop({ type: String, enum: Recommendation })
  recommendation?: Recommendation;

  @Prop({ type: String, enum: FeedbackStatus, default: FeedbackStatus.DRAFT })
  status: FeedbackStatus;

  @Prop({ type: Date })
  submittedAt?: Date;
}

@Schema({ _id: false })
export class InterviewPanelMember {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  role: string;

  @Prop({ type: Boolean, default: true })
  isRequired: boolean;

  @Prop({ type: String, enum: AttendanceStatus, default: AttendanceStatus.PENDING })
  attendanceStatus: AttendanceStatus;

  @Prop({ type: PanelMemberFeedback })
  feedback?: PanelMemberFeedback;
}

@Schema({ _id: false })
export class InterviewLifecycleMetadata {
  @Prop({ type: Date })
  startedAt?: Date;

  @Prop({ type: Date })
  endedAt?: Date;

  @Prop({ type: Number })
  actualDurationMinutes?: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  completedBy?: Types.ObjectId;
}

@Schema({ _id: false })
export class ScheduleHistoryItem {
  @Prop({ type: Date, required: true })
  previousStart: Date;

  @Prop({ type: Date, required: true })
  previousEnd: Date;

  @Prop({ type: String, required: true })
  changedBy: string; // UserId or 'System' or CandidateId

  @Prop({ type: Date, default: Date.now })
  changedAt: Date;

  @Prop({ type: String })
  reason?: string;

  @Prop({ type: String })
  initiatorType: string; // RECRUITER, CANDIDATE, SYSTEM
}

@Schema({ _id: false })
export class EvaluationSummary {
  @Prop({ type: Number })
  averageScore?: number;

  @Prop({ type: Number })
  weightedScore?: number;

  @Prop({ type: Number })
  highestScore?: number;

  @Prop({ type: Number })
  lowestScore?: number;

  @Prop({ type: Number })
  scoreVariance?: number;

  @Prop({ type: Object, default: {} })
  recommendationDistribution: Record<string, number>;

  @Prop({ type: Number, default: 0 })
  completedFeedbackCount: number;

  @Prop({ type: Number, default: 0 })
  pendingFeedbackCount: number;

  @Prop({ type: Boolean, default: false })
  hasVeto: boolean;
}

@Schema({ timestamps: true })
export class Interview {
  // Core Refs
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Job', required: true, index: true })
  jobId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Application', required: true, index: true })
  applicationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Candidate', required: true, index: true })
  candidateId: Types.ObjectId;

  // Interview Details
  @Prop({ type: String, unique: true, sparse: true })
  interviewNumber?: string;

  @Prop({ type: Number, required: true })
  roundNumber: number;

  @Prop({ type: String, required: true })
  roundName: string; // e.g. 'Technical Assessment'

  @Prop({ type: String, required: true })
  interviewType: string; // e.g. 'Technical', 'HR', 'Behavioral'

  // Schedule
  @Prop({ type: Date, required: true })
  scheduledStart: Date;

  @Prop({ type: Date, required: true })
  scheduledEnd: Date;

  @Prop({ type: String, required: true })
  timezone: string;

  @Prop({ type: Number })
  utcOffset?: number; // Store original UTC offset

  @Prop({ type: String })
  originalTimezone?: string; // Store original timezone if different from normalized

  @Prop({ type: Meeting })
  meeting: Meeting;

  // Panel
  @Prop({ type: [{ type: InterviewPanelMember }], default: [] })
  panel: InterviewPanelMember[];

  // Status
  @Prop({ type: String, enum: InterviewStatus, default: InterviewStatus.DRAFT, index: true })
  status: InterviewStatus;

  @Prop({ type: String, enum: CandidateConfirmationStatus, default: CandidateConfirmationStatus.PENDING })
  candidateConfirmationStatus: CandidateConfirmationStatus;

  @Prop({ type: [{ type: ScheduleHistoryItem }], default: [] })
  scheduleHistory: ScheduleHistoryItem[];

  // Snapshots
  @Prop({ type: Object, required: true })
  candidateSnapshot: Record<string, any>;

  @Prop({ type: Object, required: true })
  jobSnapshot: Record<string, any>;

  // Attachments
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Document' }], default: [] })
  attachments: Types.ObjectId[];

  // Metadata
  @Prop({ type: InterviewLifecycleMetadata, default: () => ({}) })
  lifecycleMetadata: InterviewLifecycleMetadata;

  // Evaluation & Final Decision
  @Prop({ type: EvaluationSummary, default: () => ({}) })
  evaluationSummary: EvaluationSummary;

  @Prop({ type: String, enum: Recommendation })
  finalDecision?: Recommendation;
}

export const InterviewSchema = SchemaFactory.createForClass(Interview);
