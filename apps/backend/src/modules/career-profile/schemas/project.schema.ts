import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  ownerType: string; // 'CANDIDATE', 'COMPANY', 'EMPLOYEE'

  @Prop({ type: Types.ObjectId, required: true })
  ownerId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop()
  detailedDescription?: string;

  @Prop({ type: [{ type: Types.ObjectId }], default: [] })
  technologies: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId }], default: [] })
  skills: Types.ObjectId[];

  @Prop()
  githubUrl?: string;

  @Prop()
  liveDemoUrl?: string;

  @Prop()
  teamSize?: number;

  @Prop()
  role?: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ type: [{ type: Types.ObjectId }], default: [] })
  documentIds: Types.ObjectId[];
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.index({ ownerId: 1, ownerType: 1 });
