import { CandidateDocument, DocumentStorageOverview } from "../types";
import { TimelineItem } from "@/components/display/timeline";
import { subDays, subMinutes } from "date-fns";

const now = new Date();

export const mockStorageOverview: DocumentStorageOverview = {
  totalDocuments: 12,
  totalSizeBytes: 350 * 1024 * 1024, // 350 MB
  maxSizeBytes: 1024 * 1024 * 1024, // 1 GB
  resumesCount: 3,
  certificatesCount: 5,
  portfolioFilesCount: 4,
};

export const mockDefaultResume: CandidateDocument = {
  id: "doc-001",
  candidateId: "can-123",
  documentGroupId: "grp-resume-base",
  name: "Frontend_Engineer_Resume_2026.pdf",
  type: "RESUME",
  version: 3,
  isDefault: true,
  status: "AI_PARSED",
  visibility: "PUBLIC",
  checksum: "8f4e3c1b...",
  mimeType: "application/pdf",
  extension: ".pdf",
  sizeBytes: 2 * 1024 * 1024, // 2MB
  storageKey: "resumes/Frontend_Engineer_Resume_2026_v3.pdf",
  provider: "AWS_S3",
  bucket: "recruitpilot-prod-docs",
  region: "us-east-1",
  downloadCount: 15,
  virusScanned: true,
  ocrProcessed: true,
  aiParsed: true,
  createdAt: subDays(now, 2).toISOString(),
  updatedAt: subDays(now, 2).toISOString(),
  uploadedBy: "usr-999"
};

export const mockResumeHistory: CandidateDocument[] = [
  mockDefaultResume,
  {
    ...mockDefaultResume,
    id: "doc-002",
    name: "Frontend_Engineer_Resume_v2.pdf",
    version: 2,
    isDefault: false,
    status: "AI_PARSED",
    sizeBytes: 1.8 * 1024 * 1024,
    storageKey: "resumes/Frontend_Engineer_Resume_v2.pdf",
    createdAt: subDays(now, 45).toISOString(),
    updatedAt: subDays(now, 45).toISOString(),
  },
  {
    ...mockDefaultResume,
    id: "doc-003",
    name: "Frontend_Engineer_Resume_v1.pdf",
    version: 1,
    isDefault: false,
    status: "VIRUS_CLEAN",
    sizeBytes: 1.5 * 1024 * 1024,
    storageKey: "resumes/Frontend_Engineer_Resume_v1.pdf",
    createdAt: subDays(now, 120).toISOString(),
    updatedAt: subDays(now, 120).toISOString(),
  }
];

export const mockOtherDocuments: CandidateDocument[] = [
  {
    id: "doc-004",
    candidateId: "can-123",
    name: "AWS_Certified_Developer.pdf",
    type: "CERTIFICATE",
    version: 1,
    isDefault: false,
    status: "VIRUS_CLEAN",
    visibility: "PUBLIC",
    checksum: "a1b2c3d4...",
    mimeType: "application/pdf",
    extension: ".pdf",
    sizeBytes: 1.2 * 1024 * 1024,
    storageKey: "certs/AWS_Certified_Developer.pdf",
    provider: "AWS_S3",
    bucket: "recruitpilot-prod-docs",
    region: "us-east-1",
    downloadCount: 2,
    virusScanned: true,
    ocrProcessed: true,
    aiParsed: false,
    createdAt: subDays(now, 15).toISOString(),
    updatedAt: subDays(now, 15).toISOString(),
  },
  {
    id: "doc-005",
    candidateId: "can-123",
    name: "Portfolio_Slides_2025.pptx",
    type: "PORTFOLIO",
    version: 1,
    isDefault: false,
    status: "UPLOADED",
    visibility: "RECRUITERS_ONLY",
    checksum: "99x88y77z...",
    mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    extension: ".pptx",
    sizeBytes: 12.5 * 1024 * 1024,
    storageKey: "portfolio/Portfolio_Slides_2025.pptx",
    provider: "AWS_S3",
    bucket: "recruitpilot-prod-docs",
    region: "us-east-1",
    downloadCount: 5,
    virusScanned: false,
    ocrProcessed: false,
    aiParsed: false,
    createdAt: subDays(now, 30).toISOString(),
    updatedAt: subDays(now, 30).toISOString(),
  },
  {
    id: "doc-006",
    candidateId: "can-123",
    name: "University_Transcript_Official.pdf",
    type: "TRANSCRIPT",
    version: 1,
    isDefault: false,
    status: "OCR_COMPLETE",
    visibility: "PRIVATE",
    checksum: "55a44b33c...",
    mimeType: "application/pdf",
    extension: ".pdf",
    sizeBytes: 3.1 * 1024 * 1024,
    storageKey: "transcripts/University_Transcript_Official.pdf",
    provider: "AWS_S3",
    bucket: "recruitpilot-prod-docs",
    region: "us-east-1",
    downloadCount: 0,
    virusScanned: true,
    ocrProcessed: true,
    aiParsed: false,
    createdAt: subDays(now, 200).toISOString(),
    updatedAt: subDays(now, 200).toISOString(),
  }
];

export const mockDocumentTimeline: TimelineItem[] = [
  {
    id: "evt-1",
    title: "Resume Parsed",
    description: "AI successfully extracted skills and experience from your resume.",
    timestamp: subMinutes(now, 30).toISOString(),
    status: "success",
    actor: {
      name: "AI Engine",
      role: "System"
    }
  },
  {
    id: "evt-2",
    title: "OCR Completed",
    description: "Text extraction complete for Frontend_Engineer_Resume_2026.pdf",
    timestamp: subMinutes(now, 35).toISOString(),
    status: "neutral",
    actor: {
      name: "System",
      role: "System"
    }
  },
  {
    id: "evt-3",
    title: "Resume Set as Default",
    description: "Frontend_Engineer_Resume_2026.pdf is now your active resume.",
    timestamp: subMinutes(now, 40).toISOString(),
    status: "neutral",
    actor: {
      name: "You",
      role: "User"
    }
  },
  {
    id: "evt-4",
    title: "Resume Uploaded",
    description: "Frontend_Engineer_Resume_2026.pdf (v3) was uploaded successfully.",
    timestamp: subMinutes(now, 45).toISOString(),
    status: "neutral",
    actor: {
      name: "You",
      role: "User"
    }
  },
  {
    id: "evt-5",
    title: "Document Downloaded",
    description: "Google Inc. recruiter downloaded your Portfolio_Slides_2025.pptx",
    timestamp: subDays(now, 1).toISOString(),
    status: "neutral",
    actor: {
      name: "System",
      role: "System"
    }
  },
  {
    id: "evt-6",
    title: "Document Deleted",
    description: "Old_Cover_Letter.docx was permanently deleted.",
    timestamp: subDays(now, 5).toISOString(),
    status: "error",
    actor: {
      name: "You",
      role: "User"
    }
  }
];
