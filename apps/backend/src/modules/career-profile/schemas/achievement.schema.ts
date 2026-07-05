import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum AchievementCategory {
  AWARD = 'AWARD',
  HACKATHON = 'HACKATHON',
  COMPETITION = 'COMPETITION',
  SCHOLARSHIP = 'SCHOLARSHIP',
  PUBLICATION = 'PUBLICATION',
  COMMUNITY = 'COMMUNITY',
  OTHER = 'OTHER'
}

@Schema({ timestamps: true })
export class Achievement {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, enum: AchievementCategory, required: true })
  category: AchievementCategory;

  @Prop()
  organization?: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId })
  documentId?: Types.ObjectId;
}
export const AchievementSchema = SchemaFactory.createForClass(Achievement);
