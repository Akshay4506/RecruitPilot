import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Degree extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  level?: string;

  @Prop({ required: true, unique: true, index: true })
  normalizedName: string;

  @Prop({ type: [String], default: [] })
  aliases: string[];

  @Prop({ default: false })
  isVerified: boolean;
}
export const DegreeSchema = SchemaFactory.createForClass(Degree);
DegreeSchema.index({ normalizedName: 'text', aliases: 'text' });
