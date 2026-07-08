export type ChartType = "BAR" | "LINE" | "PIE" | "AREA" | "COMPOSED";
export type ReportFrequency = "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY";
export type ExportFormat = "PDF" | "EXCEL" | "CSV" | "PPT" | "JSON";
export type MetricTrend = "UP" | "DOWN" | "NEUTRAL";
export type InsightSeverity = "INFO" | "WARNING" | "CRITICAL" | "SUCCESS";
export type ExportStatus = "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED";

export interface DashboardMetrics {
  openJobs: number;
  totalApplications: number;
  conversionRate: number; // percentage
  offersExtended: number;
  offerAcceptanceRate: number; // percentage
  hiringVelocity: number; // metric based on days
  pipelineHealthScore: number; // 0-100
  avgTimeToHire: number; // days
  avgTimeToFill: number; // days
}

export interface FunnelStage {
  stage: string;
  count: number;
  conversionFromPrevious: number; // percentage
}

export interface HiringFunnel {
  stages: FunnelStage[];
  totalDropoffRate: number;
}

export interface TimeSeriesData {
  date: string; // ISO or label like 'Mon', 'Jan'
  value: number;
  secondaryValue?: number;
}

export interface SourceAnalytics {
  source: string;
  count: number;
  conversionRate: number;
}

export interface RecruiterPerformance {
  recruiterId: string;
  name: string;
  avatarUrl?: string;
  activeJobs: number;
  candidatesProcessed: number;
  timeToHireAvg: number;
  offerAcceptanceRate: number;
}

export interface AIInsight {
  id: string;
  severity: InsightSeverity;
  title: string;
  description: string;
  suggestedAction?: string;
}

export interface ExportJob {
  id: string;
  name: string;
  format: ExportFormat;
  status: ExportStatus;
  requestedAt: string;
  completedAt?: string;
  url?: string;
}

export interface ReportDefinition {
  id: string;
  name: string;
  description: string;
  type: string;
  isPreset: boolean;
}

export interface AnalyticsFilterState {
  dateRange: string;
  jobIds: string[];
  departmentIds: string[];
  recruiterIds: string[];
}
