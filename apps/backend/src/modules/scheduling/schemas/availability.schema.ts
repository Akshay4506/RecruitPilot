import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AvailabilityDocument = Availability & Document;

@Schema({ _id: false })
export class WorkingHours {
  @Prop({ type: String, required: true })
  dayOfWeek: string; // 'Monday', 'Tuesday', etc.

  @Prop({ type: String, required: true })
  startTime: string; // '09:00' (24-hour format in local timezone)

  @Prop({ type: String, required: true })
  endTime: string; // '17:00'
}

@Schema({ _id: false })
export class AvailabilityException {
  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: String, required: true })
  reason: string; // 'Vacation', 'Public Holiday', etc.
}

@Schema({ timestamps: true })
export class Availability {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true, index: true })
  companyId: Types.ObjectId;

  @Prop({ type: String, required: true })
  timezone: string;

  @Prop({ type: [{ type: WorkingHours }], default: [] })
  workingHours: WorkingHours[];

  @Prop({ type: [{ type: AvailabilityException }], default: [] })
  exceptions: AvailabilityException[];

  @Prop({ type: Number, default: 15 })
  preBufferMinutes: number;

  @Prop({ type: Number, default: 15 })
  postBufferMinutes: number;

  @Prop({ type: Number, default: 5 })
  maxInterviewsPerDay: number;

  @Prop({ type: [Number], default: [24, 1] }) // Hours before interview to send reminder
  reminderPreferences: number[];
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);

// Compound index to ensure one availability profile per user per company
AvailabilitySchema.index({ userId: 1, companyId: 1 }, { unique: true });
