import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobDocument = Job & Document;

export enum WorkMode {
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
  ONSITE = 'ONSITE',
}

export enum JobStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  PAUSED = 'PAUSED',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

export enum JobVisibility {
  PUBLIC = 'PUBLIC',
  INTERNAL = 'INTERNAL',
  CONFIDENTIAL = 'CONFIDENTIAL',
}

export enum HiringRole {
  HIRING_MANAGER = 'Hiring Manager',
  RECRUITER = 'Recruiter',
  INTERVIEWER = 'Interviewer',
  HIRING_COORDINATOR = 'Hiring Coordinator',
  APPROVER = 'Approver',
  HR = 'HR',
  OBSERVER = 'Observer',
}

export enum JobTag {
  URGENT = 'Urgent',
  CAMPUS_HIRING = 'Campus Hiring',
  INTERNAL = 'Internal',
  DIVERSITY_HIRING = 'Diversity Hiring',
  CONFIDENTIAL = 'Confidential',
}

@Schema({ _id: false })
export class HiringTeamMember {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: HiringRole, required: true })
  role: HiringRole;
}

@Schema({ _id: false })
export class LocationRequirement {
  @Prop({ type: Types.ObjectId, ref: 'Location', required: true })
  globalLocationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Office' }) // Assuming an Office schema might exist in Company module
  officeId?: Types.ObjectId;

  @Prop({ default: false })
  remoteAllowed: boolean;
}

@Schema({ _id: false })
export class Compensation {
  @Prop({ type: String })
  currency: string;

  @Prop({ type: Number })
  minSalary: number;

  @Prop({ type: Number })
  maxSalary: number;

  @Prop({ type: Boolean, default: false })
  visibility: boolean;

  @Prop({ type: [String], default: [] })
  benefits: string[];
}

@Schema({ _id: false })
export class ExperienceRequirement {
  @Prop({ type: Number })
  minYears: number;

  @Prop({ type: Number })
  maxYears: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Degree' }] })
  educationReqs: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Certification' }] }) // Referencing Master Data if exists, or just strings. Wait, Milestone 2 didn't create a standalone Certification master data, let's use strings for now or omit. I'll use String for simplicity, or omit. I'll just use String array for generic certs.
  certifications: string[];
}

@Schema({ _id: false })
export class SkillRequirement {
  @Prop({ type: Types.ObjectId, ref: 'Skill', required: true })
  skillId: Types.ObjectId;

  @Prop({ type: String }) // e.g. 'Beginner', 'Intermediate', 'Expert'
  proficiency?: string;

  @Prop({ type: Boolean, default: false })
  isMandatory: boolean;
}

@Schema({ _id: false })
export class TechRequirement {
  @Prop({ type: Types.ObjectId, ref: 'Technology', required: true })
  technologyId: Types.ObjectId;

  @Prop({ type: Number })
  yearsExperience?: number;

  @Prop({ type: Boolean, default: false })
  isMandatory: boolean;
}

@Schema({ _id: false })
export class JobDescription {
  @Prop({ type: String })
  summary: string;

  @Prop({ type: String })
  responsibilities: string;

  @Prop({ type: String })
  requirements: string;

  @Prop({ type: String })
  niceToHave?: string;

  @Prop({ type: String })
  hiringProcess?: string;

  @Prop({ type: String })
  additionalInformation?: string;
}

@Schema({ _id: false })
export class JobAnalytics {
  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  applications: number;

  @Prop({ default: 0 })
  shares: number;

  @Prop({ default: 0 })
  bookmarks: number;
}

@Schema({ _id: false })
export class SearchMetadata {
  @Prop({ type: String, index: true })
  normalizedTitle: string;

  @Prop({ type: [String], index: true })
  searchKeywords: string[];

  @Prop({ type: [String] })
  searchTokens: string[];
}

@Schema({ timestamps: true })
export class Job {
  // --- Basic Info ---
  @Prop({ type: Types.ObjectId, ref: 'JobTitle', required: true })
  jobTitleId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  departmentId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Team' })
  teamId?: Types.ObjectId;

  @Prop({ type: [{ type: HiringTeamMember }], default: [] })
  hiringTeam: HiringTeamMember[];

  @Prop({ type: Types.ObjectId, ref: 'EmploymentType' })
  employmentTypeId?: Types.ObjectId;

  @Prop({ type: String, enum: WorkMode })
  workMode: WorkMode;

  @Prop({ type: String, enum: JobStatus, default: JobStatus.DRAFT })
  status: JobStatus;

  @Prop({ type: String, enum: JobVisibility, default: JobVisibility.PUBLIC })
  visibility: JobVisibility;

  @Prop({ type: Number, default: 1 })
  openPositions: number;

  // --- Grouped Fields ---
  @Prop({ type: LocationRequirement })
  location: LocationRequirement;

  @Prop({ type: Compensation })
  compensation: Compensation;

  @Prop({ type: ExperienceRequirement })
  experience: ExperienceRequirement;

  @Prop({ type: [{ type: SkillRequirement }], default: [] })
  skills: SkillRequirement[];

  @Prop({ type: [{ type: TechRequirement }], default: [] })
  technologies: TechRequirement[];

  @Prop({ type: JobDescription })
  description: JobDescription;

  // --- Metadata & Versioning ---
  @Prop({ type: Number, default: 1 })
  version: number;

  @Prop({ type: [String], enum: JobTag, default: [] })
  tags: JobTag[];

  @Prop({ type: String, unique: true, sparse: true })
  slug?: string;

  @Prop({ type: JobAnalytics, default: () => ({}) })
  analytics: JobAnalytics;

  @Prop({ type: SearchMetadata })
  searchMetadata: SearchMetadata;

  // --- Timestamps & Approvals ---
  @Prop({ type: Types.ObjectId, ref: 'User' })
  approvedBy?: Types.ObjectId;

  @Prop({ type: Date })
  approvedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  publishedBy?: Types.ObjectId;

  @Prop({ type: Date })
  publishedAt?: Date;

  @Prop({ type: Date })
  expiresAt?: Date;

  @Prop({ type: Date })
  closedAt?: Date;

  @Prop({ type: Date })
  archivedAt?: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);

// Text Indexing for AI / Search
JobSchema.index({
  'searchMetadata.normalizedTitle': 'text',
  'searchMetadata.searchKeywords': 'text',
  'description.summary': 'text',
});
