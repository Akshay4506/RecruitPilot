import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApplicationDocument = Application & Document;

export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  SHORTLISTED = 'SHORTLISTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
  HIRED = 'HIRED',
}

export enum ApplicationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

@Schema({ _id: false })
export class DocumentReference {
  @Prop({ type: Types.ObjectId, ref: 'Document', required: true })
  documentId: Types.ObjectId;

  @Prop({ type: Number })
  documentVersion?: number;

  @Prop({ type: String })
  storageKey?: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String })
  checksum?: string;

  @Prop({ type: Date })
  uploadedAt?: Date;

  @Prop({ type: String })
  name?: string;
}

@Schema({ _id: false })
export class ScreeningAnswer {
  @Prop({ type: String, required: true })
  question: string;

  @Prop({ type: String })
  type?: string;

  @Prop({ type: String, required: true })
  answer: string;

  @Prop({ type: Boolean, default: false })
  required: boolean;
}

@Schema({ _id: false })
export class RecruiterNote {
  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

@Schema({ _id: false })
export class StatusHistoryItem {
  @Prop({ type: String, enum: ApplicationStatus })
  fromStatus?: ApplicationStatus;

  @Prop({ type: String, enum: ApplicationStatus, required: true })
  toStatus: ApplicationStatus;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  changedBy?: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  changedAt: Date;

  @Prop({ type: String })
  reason?: string;
}

@Schema({ _id: false })
export class CandidateSnapshot {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  headline?: string;

  @Prop({ type: String })
  currentCompany?: string;

  @Prop({ type: String })
  currentRole?: string;

  @Prop({ type: Number })
  totalExperienceYears?: number;

  @Prop({ type: [String] })
  topSkills?: string[];

  @Prop({ type: Number })
  resumeVersion?: number;

  @Prop({ type: String })
  careerSummary?: string;

  @Prop({ type: Number })
  profileCompletion?: number;

  @Prop({ type: Number })
  careerReadiness?: number;
}

@Schema({ _id: false })
export class JobSnapshot {
  @Prop({ type: String })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  departmentId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  hiringManagerId?: Types.ObjectId;

  @Prop({ type: Number })
  jobVersion?: number;

  @Prop({ type: Object })
  salaryInformation?: any;

  @Prop({ type: [Object] })
  requiredSkills?: any[];

  @Prop({ type: [Object] })
  technologies?: any[];
}

@Schema({ _id: false })
export class ApplicationMetadata {
  @Prop({ type: String })
  source?: string;

  @Prop({ type: Date })
  appliedAt?: Date;

  @Prop({ type: Date })
  withdrawnAt?: Date;

  @Prop({ type: String })
  withdrawalReason?: string;

  @Prop({ type: Date })
  lastActivity?: Date;

  @Prop({ type: String })
  referral?: string;

  @Prop({ type: String })
  device?: string;

  @Prop({ type: String })
  ipAddress?: string;

  @Prop({ type: Boolean, default: false })
  consentGiven: boolean;

  @Prop({ type: Date })
  consentTimestamp?: Date;
}

@Schema({ _id: false })
export class ApplicationSearchMetadata {
  @Prop({ type: String, index: true })
  normalizedCandidateName: string;

  @Prop({ type: String, index: true })
  normalizedJobTitle: string;

  @Prop({ type: [String], index: true })
  searchKeywords: string[];
}

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: String, unique: true, required: true })
  applicationNumber: string;

  // --- Core References ---
  @Prop({ type: Types.ObjectId, ref: 'Candidate', required: true, index: true })
  candidateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Job', required: true, index: true })
  jobId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  // --- Status & Lifecycle ---
  @Prop({ type: String, enum: ApplicationStatus, default: ApplicationStatus.DRAFT, index: true })
  status: ApplicationStatus;

  @Prop({ type: [{ type: StatusHistoryItem }], default: [] })
  statusHistory: StatusHistoryItem[];

  @Prop({ type: String, enum: ApplicationPriority, default: ApplicationPriority.NORMAL })
  priority: ApplicationPriority;

  @Prop({ type: [String], default: [] })
  labels: string[];

  // --- Documents ---
  @Prop({ type: DocumentReference })
  resume?: DocumentReference;

  @Prop({ type: [{ type: DocumentReference }], default: [] })
  supportingDocuments: DocumentReference[];

  // --- Screening ---
  @Prop({ type: [{ type: ScreeningAnswer }], default: [] })
  screeningAnswers: ScreeningAnswer[];

  // --- Snapshots ---
  @Prop({ type: CandidateSnapshot })
  candidateSnapshot: CandidateSnapshot;

  @Prop({ type: JobSnapshot })
  jobSnapshot: JobSnapshot;

  @Prop({ type: Number, default: 1 })
  snapshotVersion: number;

  // --- Recruiter Interaction & Assignment ---
  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedRecruiterId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedHiringManagerId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedCoordinatorId?: Types.ObjectId;

  @Prop({ type: [{ type: RecruiterNote }], default: [] })
  recruiterNotes: RecruiterNote[];

  @Prop({ type: Date })
  viewedByRecruiterAt?: Date;

  @Prop({ type: Date })
  firstReviewedAt?: Date;

  @Prop({ type: Date })
  lastUpdatedAt?: Date;

  // --- Metadata ---
  @Prop({ type: ApplicationMetadata, default: () => ({}) })
  metadata: ApplicationMetadata;

  @Prop({ type: ApplicationSearchMetadata })
  searchMetadata: ApplicationSearchMetadata;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

// Ensure a candidate can only apply once to a job (unless overridden by business logic which handles sparse/deleted)
// Standard unique index might be too restrictive if they can re-apply, so we handle duplicate checks in the validation service instead of DB level.
// We will add an index for faster querying.
ApplicationSchema.index({ candidateId: 1, jobId: 1 });
