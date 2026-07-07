import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  HiringTeamMember,
  LocationRequirement,
  Compensation,
  ExperienceRequirement,
  SkillRequirement,
  TechRequirement,
  JobDescription,
  WorkMode,
  JobVisibility,
  JobTag,
} from './job.schema';

export type JobTemplateDocument = JobTemplate & Document;

@Schema({ timestamps: true })
export class JobTemplate {
  @Prop({ type: String, required: true })
  templateName: string;

  @Prop({ type: String })
  templateDescription?: string;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  // --- Job Blueprint Fields ---
  @Prop({ type: Types.ObjectId, ref: 'JobTitle' })
  jobTitleId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  departmentId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Team' })
  teamId?: Types.ObjectId;

  @Prop({ type: [{ type: HiringTeamMember }], default: [] })
  hiringTeam: HiringTeamMember[];

  @Prop({ type: Types.ObjectId, ref: 'EmploymentType' })
  employmentTypeId?: Types.ObjectId;

  @Prop({ type: String, enum: WorkMode })
  workMode?: WorkMode;

  @Prop({ type: String, enum: JobVisibility, default: JobVisibility.PUBLIC })
  visibility: JobVisibility;

  @Prop({ type: LocationRequirement })
  location?: LocationRequirement;

  @Prop({ type: Compensation })
  compensation?: Compensation;

  @Prop({ type: ExperienceRequirement })
  experience?: ExperienceRequirement;

  @Prop({ type: [{ type: SkillRequirement }], default: [] })
  skills: SkillRequirement[];

  @Prop({ type: [{ type: TechRequirement }], default: [] })
  technologies: TechRequirement[];

  @Prop({ type: JobDescription })
  description?: JobDescription;

  @Prop({ type: [String], enum: JobTag, default: [] })
  tags: JobTag[];
}

export const JobTemplateSchema = SchemaFactory.createForClass(JobTemplate);
