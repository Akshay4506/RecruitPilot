import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Education {
  @Prop({ type: Types.ObjectId, required: true })
  institutionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  degreeId: Types.ObjectId;

  @Prop()
  specialization?: string;

  @Prop()
  cgpaOrPercentage?: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate?: Date;

  @Prop({ default: false })
  isCurrent: boolean;

  @Prop({ type: [String], default: [] })
  activities: string[];

  @Prop({ type: [String], default: [] })
  honors: string[];

  @Prop()
  description?: string;
}
export const EducationSchema = SchemaFactory.createForClass(Education);
