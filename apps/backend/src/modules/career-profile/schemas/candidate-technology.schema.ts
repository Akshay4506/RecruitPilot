import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { SkillProficiency } from './candidate-skill.schema';

@Schema({ timestamps: true })
export class CandidateTechnology {
  @Prop({ type: Types.ObjectId, required: true })
  technologyId: Types.ObjectId;

  @Prop({ type: String, enum: SkillProficiency, default: SkillProficiency.INTERMEDIATE })
  experienceLevel: SkillProficiency;

  @Prop()
  yearsUsed?: number;

  @Prop()
  lastUsedYear?: number;
}
export const CandidateTechnologySchema = SchemaFactory.createForClass(CandidateTechnology);
