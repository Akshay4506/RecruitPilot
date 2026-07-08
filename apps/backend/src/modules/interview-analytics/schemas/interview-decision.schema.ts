import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InterviewDecisionDocument = InterviewDecision & Document;

export enum DecisionStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  COMMITTEE_REVIEW = 'COMMITTEE_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  HOLD = 'HOLD',
  ESCALATED = 'ESCALATED',
}

export enum ConfidenceLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

@Schema({ _id: false })
export class ConsensusData {
  @Prop({ type: String, enum: ConfidenceLevel })
  confidenceLevel: ConfidenceLevel;

  @Prop({ type: Number })
  confidencePercentage: number; // 0-100%

  @Prop({ type: Number })
  scoreVariance: number;
}

@Schema({ _id: false })
export class CommitteeMember {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  role: string;
}

@Schema({ _id: false })
export class HiringCommittee {
  @Prop({ type: [{ type: CommitteeMember }], default: [] })
  members: CommitteeMember[];

  @Prop({ type: String })
  notes?: string;

  @Prop({ type: Date })
  decisionDate?: Date;

  @Prop({ type: String, default: 'PENDING' }) // 'PENDING', 'IN_PROGRESS', 'COMPLETED'
  status: string;
}

@Schema({ _id: false })
export class DecisionAuditLog {
  @Prop({ type: String })
  previousDecision?: string;

  @Prop({ type: String, required: true })
  newDecision: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  changedBy: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  changedAt: Date;

  @Prop({ type: String, required: true })
  reason: string;

  @Prop({ type: Number })
  confidenceChange?: number; // E.g. -15 (confidence went down 15%)
}

@Schema({ timestamps: true })
export class InterviewDecision {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Interview', required: true, unique: true })
  interviewId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Application', required: true })
  applicationId: Types.ObjectId;

  @Prop({ type: String, enum: DecisionStatus, default: DecisionStatus.PENDING_REVIEW })
  status: DecisionStatus;

  @Prop({ type: ConsensusData, default: () => ({}) })
  consensus: ConsensusData;

  @Prop({ type: HiringCommittee, default: () => ({ status: 'PENDING' }) })
  committee: HiringCommittee;

  @Prop({ type: [{ type: DecisionAuditLog }], default: [] })
  auditTrail: DecisionAuditLog[];
}

export const InterviewDecisionSchema = SchemaFactory.createForClass(InterviewDecision);
