import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  RECRUITER = 'RECRUITER',
  INTERVIEWER = 'INTERVIEWER',
  HIRING_MANAGER = 'HIRING_MANAGER',
  HR = 'HR',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company', required: true })
  companyId: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, enum: Role, default: Role.RECRUITER })
  role: Role;

  @Prop()
  avatar?: string;

  @Prop()
  jobTitle?: string;

  @Prop()
  phone?: string;

  @Prop()
  bio?: string;

  @Prop()
  refreshTokenHash?: string;

  // Account Status Fields
  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  lastLoginAt?: Date;

  @Prop()
  lastSeenAt?: Date;

  @Prop()
  lastPasswordChangedAt?: Date;

  @Prop({ default: 0 })
  failedLoginAttempts: number;

  @Prop()
  lockedUntil?: Date;

  // Soft Deletes
  @Prop()
  deletedAt?: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  deletedBy?: MongooseSchema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
