import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Experience {
  @Prop({ type: Types.ObjectId, required: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  jobTitleId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  industryId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  employmentTypeId?: Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate?: Date;

  @Prop({ default: false })
  isCurrent: boolean;

  @Prop({ type: Types.ObjectId })
  locationId?: Types.ObjectId;

  @Prop({ default: false })
  isRemote: boolean;

  @Prop({ default: false })
  isLeadership: boolean;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  responsibilities: string[];

  @Prop({ type: [String], default: [] })
  achievements: string[];

  @Prop({ type: [{ type: Types.ObjectId }], default: [] })
  skillsUsed: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId }], default: [] })
  technologiesUsed: Types.ObjectId[];
}
export const ExperienceSchema = SchemaFactory.createForClass(Experience);
