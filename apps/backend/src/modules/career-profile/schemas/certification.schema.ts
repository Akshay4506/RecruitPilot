import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Certification {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, required: true })
  issuingOrganizationId: Types.ObjectId;

  @Prop()
  credentialId?: string;

  @Prop()
  verificationUrl?: string;

  @Prop({ required: true })
  issueDate: Date;

  @Prop()
  expirationDate?: Date;

  @Prop({ default: false })
  neverExpires: boolean;

  @Prop({ type: Types.ObjectId })
  documentId?: Types.ObjectId;
}
export const CertificationSchema = SchemaFactory.createForClass(Certification);
