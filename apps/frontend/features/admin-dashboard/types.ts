export type HealthStatus = "HEALTHY" | "DEGRADED" | "DOWN";
export type Severity = "INFO" | "WARNING" | "CRITICAL";
export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";
export type SubscriptionStatus = "ACTIVE" | "PAST_DUE" | "CANCELED" | "TRIAL";
export type ActivityType = "USER" | "JOB" | "SYSTEM" | "BILLING" | "WORKSPACE";

export interface AdminMetrics {
  totalUsers: number;
  recruiters: number;
  hiringManagers: number;
  candidates: number;
  jobs: number;
  applications: number;
  interviews: number;
  companies: number;
  activeSessions: number;
  storageUsedGb: number;
  storageLimitGb: number;
}

export interface SystemHealthNode {
  id: string;
  name: string;
  status: HealthStatus;
  latencyMs: number;
  uptimePercentage: number;
  lastChecked: string;
}

export interface PendingApproval {
  id: string;
  type: string; // User Invite, Department, Integration, etc.
  title: string;
  requester: string;
  requestedAt: string;
  status: ApprovalStatus;
}

export interface ActivityTimelineItem {
  id: string;
  type: ActivityType;
  title: string;
  timestamp: string;
  actor: string;
}

export interface PlatformInsight {
  id: string;
  title: string;
  description: string;
  severity: Severity;
}

export interface SubscriptionSummary {
  planName: string;
  status: SubscriptionStatus;
  billingCycle: string;
  nextBillingDate: string;
  amount: number;
  seatsUsed: number;
  seatsTotal: number;
}

export interface TimeSeriesData {
  date: string;
  users: number;
  jobs: number;
  applications: number;
}

export interface PieData {
  name: string;
  value: number;
}

export interface StorageDistribution {
  name: string;
  sizeGb: number;
}
