import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Institution extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  normalizedName: string;

  @Prop({ type: [String], default: [] })
  aliases: string[];

  @Prop({ default: false })
  isVerified: boolean;
}
export const InstitutionSchema = SchemaFactory.createForClass(Institution);
InstitutionSchema.index({ normalizedName: 'text', aliases: 'text' });
