import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Location extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  city?: string;

  @Prop()
  country?: string;

  @Prop({ required: true, unique: true, index: true })
  normalizedName: string;

  @Prop({ type: [String], default: [] })
  aliases: string[];

  @Prop({ default: false })
  isVerified: boolean;
}
export const LocationSchema = SchemaFactory.createForClass(Location);
LocationSchema.index({ normalizedName: 'text', aliases: 'text' });
