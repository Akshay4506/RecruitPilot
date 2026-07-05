import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Technology extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  normalizedName: string;

  @Prop({ type: [String], default: [] })
  aliases: string[];

  @Prop({ default: false })
  isVerified: boolean;
}
export const TechnologySchema = SchemaFactory.createForClass(Technology);
TechnologySchema.index({ normalizedName: 'text', aliases: 'text' });
