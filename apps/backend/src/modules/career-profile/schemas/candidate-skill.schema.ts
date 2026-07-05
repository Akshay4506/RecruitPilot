import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum SkillProficiency {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export enum VerificationSource {
  SELF_DECLARED = 'SELF_DECLARED',
  ASSESSMENT = 'ASSESSMENT',
  CERTIFICATION = 'CERTIFICATION',
  INTERVIEW = 'INTERVIEW',
  COMPANY = 'COMPANY'
}

@Schema({ timestamps: true })
export class CandidateSkill {
  @Prop({ type: Types.ObjectId, required: true })
  skillId: Types.ObjectId;

  @Prop({ type: String, enum: SkillProficiency, default: SkillProficiency.INTERMEDIATE })
  proficiency: SkillProficiency;

  @Prop()
  yearsOfExperience?: number;

  @Prop()
  lastUsedYear?: number;

  @Prop({ type: String, enum: VerificationSource, default: VerificationSource.SELF_DECLARED })
  verificationSource: VerificationSource;
}
export const CandidateSkillSchema = SchemaFactory.createForClass(CandidateSkill);
