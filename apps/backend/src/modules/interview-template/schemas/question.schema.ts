import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionDocument = Question & Document;

export enum QuestionDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

@Schema({ timestamps: true })
export class Question {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: String, enum: QuestionDifficulty, default: QuestionDifficulty.MEDIUM })
  difficulty: QuestionDifficulty;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Competency' }], default: [] })
  competencies: Types.ObjectId[];

  @Prop({ type: [String], default: [] })
  suggestedFollowUps: string[];

  @Prop({ type: String })
  notes?: string;

  @Prop({ type: Number })
  expectedDurationMinutes?: number;

  @Prop({ type: String })
  hints?: string;

  @Prop({ type: String })
  redFlags?: string;

  @Prop({ type: String })
  excellentAnswerGuidance?: string;

  @Prop({ type: Number, default: 0 })
  usageCount: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
