export type StageStatus = "ACTIVE" | "WARNING" | "CRITICAL";
export type CandidatePriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type CandidateRisk = "LOW" | "MEDIUM" | "HIGH";
export type HiringStage = "APPLIED" | "SCREENING" | "ASSESSMENT" | "TECHNICAL" | "MANAGER" | "HR" | "OFFER" | "HIRED" | "REJECTED" | "WITHDRAWN";

export interface PipelineColumn {
  id: string;
  title: string;
  capacity?: number;
  averageDays?: number;
  health: StageStatus;
}

export interface PipelineCandidate {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  jobId: string;
  matchScore: number;
  priority: CandidatePriority;
  risk: CandidateRisk;
  stage: string;
  skills: string[];
  experienceYears: number;
  lastActivity: string;
  assignedRecruiter?: { id: string; name: string; avatarUrl?: string };
}

export interface PipelineMetrics {
  velocity: number;
  conversionPercent: number;
  timeToHireDays: number;
  interviewRatePercent: number;
  offerRatePercent: number;
}

export interface DragOperation {
  candidateId: string;
  fromStage: string;
  toStage: string;
  timestamp: string;
}

export interface PipelineBoard {
  id: string;
  name: string;
  department?: string;
  columns: PipelineColumn[];
  candidates: PipelineCandidate[];
  metrics: PipelineMetrics;
}
