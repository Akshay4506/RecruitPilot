export type ServiceStatus = "HEALTHY" | "DEGRADED" | "DOWN" | "MAINTENANCE";

export interface PlatformHealth {
  overallScore: number;
  status: ServiceStatus;
  lastUpdated: string;
  services: {
    database: ServiceStatus;
    queue: ServiceStatus;
    storage: ServiceStatus;
    email: ServiceStatus;
    search: ServiceStatus;
    cache: ServiceStatus;
  };
}

export type AlertSeverity = "CRITICAL" | "WARNING" | "INFO";

export interface SystemAlert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  source: string;
  createdAt: string;
  resolvedAt?: string;
  status: "ACTIVE" | "RESOLVED";
}

export interface BackgroundJob {
  id: string;
  name: string;
  queue: string;
  status: "RUNNING" | "QUEUED" | "RETRYING" | "COMPLETED" | "FAILED";
  durationMs: number;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  errorMessage?: string;
}

export interface JobMetrics {
  averageDurationMs: number;
  successRate: number;
  failureRate: number;
  totalRunCount: number;
  lastRun: string;
  nextRun?: string;
}

export interface QueueHealth {
  name: string;
  size: number;
  averageWaitMs: number;
  failureCount: number;
  retryCount: number;
  status: ServiceStatus;
}

export interface AuditLogMetadata {
  correlationId: string;
  requestId: string;
  actor: string;
  userAgent: string;
  durationMs: number;
  ipAddress: string;
  region: string;
  timestamp: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  result: "SUCCESS" | "FAILURE";
  metadata: AuditLogMetadata;
  payload: any;
  beforeSnapshot?: any;
  afterSnapshot?: any;
}

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  environment: "PRODUCTION" | "STAGING" | "DEVELOPMENT";
  rolloutPercentage: number;
  status: "ENABLED" | "DISABLED";
  owner: string;
  lastModified: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  variables: string[];
  version: string;
  lastModified: string;
  status: "DRAFT" | "PUBLISHED";
}

export interface StorageCategory {
  category: "DATABASE" | "BLOB_STORAGE" | "LOGS" | "BACKUPS" | "EMAIL_ATTACHMENTS";
  sizeGb: number;
  percentage: number;
}

export interface StorageMetrics {
  totalAllocatedGb: number;
  totalUsedGb: number;
  categories: StorageCategory[];
}

export interface Backup {
  id: string;
  type: "FULL" | "INCREMENTAL";
  sizeGb: number;
  status: "COMPLETED" | "FAILED" | "IN_PROGRESS";
  createdAt: string;
  completedAt?: string;
  retentionDays: number;
}

export interface MaintenanceEvent {
  id: string;
  title: string;
  description: string;
  status: "SCHEDULED" | "ACTIVE" | "COMPLETED";
  scheduledStart: string;
  scheduledEnd: string;
  actualStart?: string;
  actualEnd?: string;
}

export interface SystemConfiguration {
  environment: string;
  timezone: string;
  region: string;
  maintenanceModeEnabled: boolean;
  debugModeEnabled: boolean;
  maxUploadSizeMb: number;
  sessionTimeoutMinutes: number;
}
