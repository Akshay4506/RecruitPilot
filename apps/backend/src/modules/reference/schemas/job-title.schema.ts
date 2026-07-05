import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class JobTitle extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  normalizedName: string;

  @Prop({ type: [String], default: [] })
  aliases: string[];

  @Prop({ default: false })
  isVerified: boolean;
}
export const JobTitleSchema = SchemaFactory.createForClass(JobTitle);
JobTitleSchema.index({ normalizedName: 'text', aliases: 'text' });
