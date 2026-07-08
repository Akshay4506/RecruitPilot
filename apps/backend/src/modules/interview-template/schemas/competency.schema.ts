import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompetencyDocument = Competency & Document;

@Schema({ _id: false })
export class RubricLevel {
  @Prop({ type: String, required: true })
  range: string; // e.g., '1-3'

  @Prop({ type: String, required: true })
  description: string; // e.g., 'Poor: lacks fundamental understanding'
}

@Schema({ timestamps: true })
export class Competency {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String, required: true })
  category: string; // e.g., 'Technical', 'Behavioral', 'Core'

  @Prop({ type: Number, default: 1 })
  defaultWeight: number;

  @Prop({ type: Number, default: 10 })
  defaultMaxScore: number;

  @Prop({ type: [{ type: RubricLevel }], default: [] })
  rubric: RubricLevel[];

  @Prop({ type: Boolean, default: true })
  mandatory: boolean;

  @Prop({ type: Boolean, default: false })
  isVetoCompetency: boolean; // True means a failing score on this competency raises a Needs Discussion flag
}

export const CompetencySchema = SchemaFactory.createForClass(Competency);
