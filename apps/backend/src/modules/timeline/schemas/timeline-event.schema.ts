import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type TimelineEventDocument = TimelineEvent & Document;

@Schema({ timestamps: true })
export class TimelineEvent {
  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  entityType: string; // e.g., 'CANDIDATE', 'COMPANY', 'JOB', 'APPLICATION'

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  entityId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  actorId?: Types.ObjectId; // The user or candidate who performed the action

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const TimelineEventSchema = SchemaFactory.createForClass(TimelineEvent);
