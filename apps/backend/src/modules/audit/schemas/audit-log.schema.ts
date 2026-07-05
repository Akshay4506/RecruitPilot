import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({ timestamps: true })
export class AuditLog {
  @Prop({ required: true })
  action: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  actorId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company', required: true })
  companyId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  targetId?: MongooseSchema.Types.ObjectId;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
