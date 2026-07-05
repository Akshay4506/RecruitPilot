import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type FileDocument = File & MongooseDocument;

export enum OwnerType {
  CANDIDATE = 'CANDIDATE',
  COMPANY = 'COMPANY',
  EMPLOYEE = 'EMPLOYEE',
  JOB = 'JOB',
  OFFER = 'OFFER',
}

export enum DocumentType {
  RESUME = 'RESUME',
  COVER_LETTER = 'COVER_LETTER',
  CERTIFICATE = 'CERTIFICATE',
  EXPERIENCE_LETTER = 'EXPERIENCE_LETTER',
  RECOMMENDATION_LETTER = 'RECOMMENDATION_LETTER',
  ACADEMIC_TRANSCRIPT = 'ACADEMIC_TRANSCRIPT',
  PORTFOLIO = 'PORTFOLIO',
  OTHER = 'OTHER',
}

export enum DocumentVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  APPLIED_ONLY = 'APPLIED_ONLY',
}

export enum DocumentStatus {
  UPLOADED = 'UPLOADED',
  VALIDATED = 'VALIDATED',
  STORED = 'STORED',
  AVAILABLE = 'AVAILABLE',
  PROCESSING = 'PROCESSING',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
}

@Schema({ timestamps: true })
export class File {
  @Prop({ type: String, enum: OwnerType, required: true })
  ownerType: OwnerType;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  ownerId: Types.ObjectId;

  @Prop({ type: String, enum: DocumentType, required: true })
  documentType: DocumentType;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  documentGroupId: Types.ObjectId;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  storageKey: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  extension: string;

  @Prop({ required: true })
  checksum: string;

  @Prop({ required: true, default: 1 })
  version: number;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ type: String, enum: DocumentVisibility, default: DocumentVisibility.PRIVATE })
  visibility: DocumentVisibility;

  @Prop({ type: String, enum: DocumentStatus, default: DocumentStatus.UPLOADED })
  status: DocumentStatus;

  @Prop()
  numberOfPages?: number;

  @Prop()
  thumbnailUrl?: string;

  @Prop()
  previewStatus?: string;

  @Prop()
  provider?: string;

  @Prop()
  bucket?: string;

  @Prop()
  region?: string;

  @Prop({ default: false })
  virusScanned?: boolean;

  @Prop({ default: false })
  ocrProcessed?: boolean;

  @Prop({ default: false })
  aiParsed?: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  uploadedBy?: Types.ObjectId;

  @Prop()
  uploadedFrom?: string;

  @Prop({ default: 0 })
  downloadCount: number;

  @Prop()
  lastDownloadedAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  deletedBy?: Types.ObjectId;
}

export const DocumentSchema = SchemaFactory.createForClass(File);

DocumentSchema.index({ ownerId: 1, documentType: 1, status: 1, createdAt: 1, isDefault: 1 });
DocumentSchema.index({ checksum: 1 });
DocumentSchema.index({ documentGroupId: 1 });
