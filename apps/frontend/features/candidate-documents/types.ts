import { BaseEntity } from "@/types/api.types";

export type DocumentType = 
  | "RESUME"
  | "COVER_LETTER"
  | "PORTFOLIO"
  | "CERTIFICATE"
  | "TRANSCRIPT"
  | "OFFER_LETTER"
  | "OTHER";

export type DocumentStatus = 
  | "UPLOADED"
  | "PROCESSING"
  | "OCR_COMPLETE"
  | "VIRUS_CLEAN"
  | "AI_PARSED"
  | "DELETED"
  | "ERROR";

export type DocumentVisibility = "PRIVATE" | "PUBLIC" | "RECRUITERS_ONLY";

export interface CandidateDocument extends BaseEntity {
  candidateId: string;
  documentGroupId?: string; // Groups different versions together
  name: string;
  type: DocumentType;
  version: number;
  isDefault: boolean;
  status: DocumentStatus;
  visibility: DocumentVisibility;
  
  // File metadata
  checksum: string;
  mimeType: string;
  extension: string;
  sizeBytes: number;
  
  // Storage backend
  storageKey: string;
  provider: "AWS_S3" | "GCP_STORAGE" | "AZURE_BLOB";
  bucket: string;
  region: string;
  
  // Processing flags
  downloadCount: number;
  virusScanned: boolean;
  ocrProcessed: boolean;
  aiParsed: boolean;
  
  // Timestamps
  deletedAt?: string;
  uploadedBy?: string; // user ID
}

export interface DocumentStorageOverview {
  totalDocuments: number;
  totalSizeBytes: number;
  maxSizeBytes: number;
  resumesCount: number;
  certificatesCount: number;
  portfolioFilesCount: number;
}
