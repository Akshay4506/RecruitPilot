import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Experience, ExperienceSchema } from '../../career-profile/schemas/experience.schema';
import { Education, EducationSchema } from '../../career-profile/schemas/education.schema';
import { CandidateSkill, CandidateSkillSchema } from '../../career-profile/schemas/candidate-skill.schema';
import { CandidateTechnology, CandidateTechnologySchema } from '../../career-profile/schemas/candidate-technology.schema';
import { Certification, CertificationSchema } from '../../career-profile/schemas/certification.schema';
import { LanguageProficiency, LanguageProficiencySchema } from '../../career-profile/schemas/language-proficiency.schema';
import { Achievement, AchievementSchema } from '../../career-profile/schemas/achievement.schema';
import { ProfessionalReference, ProfessionalReferenceSchema } from '../../career-profile/schemas/professional-reference.schema';

export type CandidateDocument = Candidate & Document;

export enum CandidateStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  DEACTIVATED = 'DEACTIVATED',
}

export enum VisibilitySetting {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  APPLIED_ONLY = 'APPLIED_ONLY',
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  INTERNSHIP = 'INTERNSHIP',
  CONTRACT = 'CONTRACT',
  FREELANCE = 'FREELANCE',
}

@Schema({ _id: false })
class PersonalInfo {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop()
  gender?: string;

  @Prop()
  nationality?: string;

  @Prop()
  currentLocation?: string;
}

@Schema({ _id: false })
class ProfessionalInfo {
  @Prop()
  headline?: string;

  @Prop()
  summary?: string;

  @Prop()
  yearsOfExperience?: number;

  @Prop()
  currentJobTitle?: string;

  @Prop()
  currentCompany?: string;

  @Prop()
  employmentStatus?: string;
}

@Schema({ _id: false })
class CareerPreferences {
  @Prop({ default: false })
  openToWork: boolean;

  @Prop({ type: [String] })
  preferredLocations: string[];

  @Prop({ type: [String] })
  preferredWorkMode: string[];

  @Prop()
  expectedSalary?: string;

  @Prop()
  currentSalary?: string;

  @Prop()
  noticePeriod?: string;

  @Prop({ default: false })
  willingToRelocate: boolean;

  @Prop({ type: [String] })
  preferredJobRoles: string[];

  @Prop({ type: [String], enum: EmploymentType })
  preferredEmploymentTypes: EmploymentType[];
}

@Schema({ _id: false })
class SocialProfiles {
  @Prop()
  linkedIn?: string;

  @Prop()
  github?: string;

  @Prop()
  portfolio?: string;

  @Prop()
  personalWebsite?: string;

  @Prop({ type: Map, of: String })
  otherProfiles?: Map<string, string>;
}

@Schema({ timestamps: true })
export class Candidate {
  @Prop({ type: PersonalInfo, required: true })
  personalInfo: PersonalInfo;

  @Prop({ type: ProfessionalInfo, default: {} })
  professionalInfo: ProfessionalInfo;

  @Prop({ type: CareerPreferences, default: {} })
  careerPreferences: CareerPreferences;

  @Prop({ type: SocialProfiles, default: {} })
  socialProfiles: SocialProfiles;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  avatarUrl?: string;

  @Prop({ type: String, enum: VisibilitySetting, default: VisibilitySetting.APPLIED_ONLY })
  visibility: VisibilitySetting;

  @Prop({ type: String, enum: CandidateStatus, default: CandidateStatus.PENDING_VERIFICATION })
  status: CandidateStatus;

  @Prop({ type: [String], default: [] })
  searchKeywords: string[];

  @Prop()
  workAuthorization?: string;

  @Prop()
  refreshTokenHash?: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  verificationToken?: string;

  @Prop()
  verificationTokenExpiresAt?: Date;

  @Prop()
  lastLoginAt?: Date;

  @Prop()
  lastSeenAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop({ type: [ExperienceSchema], default: [] })
  experiences: Experience[];

  @Prop({ type: [EducationSchema], default: [] })
  educations: Education[];

  @Prop({ type: [CandidateSkillSchema], default: [] })
  skills: CandidateSkill[];

  @Prop({ type: [CandidateTechnologySchema], default: [] })
  technologies: CandidateTechnology[];

  @Prop({ type: [CertificationSchema], default: [] })
  certifications: Certification[];

  @Prop({ type: [LanguageProficiencySchema], default: [] })
  languages: LanguageProficiency[];

  @Prop({ type: [AchievementSchema], default: [] })
  achievements: Achievement[];

  @Prop({ type: [ProfessionalReferenceSchema], default: [] })
  references: ProfessionalReference[];
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);

CandidateSchema.index({ searchKeywords: 'text', 'professionalInfo.headline': 'text', 'professionalInfo.summary': 'text' });
