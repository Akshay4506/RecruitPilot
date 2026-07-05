import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CompanyDocument = Company & Document;

export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  TRIAL = 'TRIAL',
  SUSPENDED = 'SUSPENDED',
  EXPIRED = 'EXPIRED',
}

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  domain: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: String, enum: CompanyStatus, default: CompanyStatus.TRIAL })
  status: CompanyStatus;

  @Prop()
  website?: string;

  @Prop()
  industry?: string;

  @Prop()
  size?: string;

  @Prop()
  address?: string;

  @Prop({ type: Object, default: {} })
  branding: {
    logo?: string;
    themeColor?: string;
    careerPageBanner?: string;
    emailFooter?: string;
  };

  @Prop({ type: Object, default: {} })
  settings: {
    timezone?: string;
    dateFormat?: string;
    currency?: string;
    language?: string;
    preferences?: Record<string, any>;
  };

  @Prop({ default: 'free' })
  subscriptionTier: string;

  // Soft Deletes
  @Prop()
  deletedAt?: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  deletedBy?: MongooseSchema.Types.ObjectId;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
