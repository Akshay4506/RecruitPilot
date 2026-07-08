import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InterviewTemplateDocument = InterviewTemplate & Document;

@Schema({ _id: false })
export class AgendaItem {
  @Prop({ type: Number, required: true })
  durationMinutes: number;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description?: string;
}

@Schema({ timestamps: true })
export class InterviewTemplate {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  interviewType: string;

  @Prop({ type: String })
  department?: string;

  @Prop({ type: String })
  jobFamily?: string;

  @Prop({ type: String })
  seniority?: string;

  @Prop({ type: Number, required: true })
  durationMinutes: number;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  instructions?: string;

  @Prop({ type: Number, default: 1 })
  version: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'ScorecardTemplate' })
  scorecardTemplateId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }], default: [] })
  recommendedQuestions: Types.ObjectId[];

  @Prop({ type: [{ type: AgendaItem }], default: [] })
  agenda: AgendaItem[];
}

export const InterviewTemplateSchema = SchemaFactory.createForClass(InterviewTemplate);
