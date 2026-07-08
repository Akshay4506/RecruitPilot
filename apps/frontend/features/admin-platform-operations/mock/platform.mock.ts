import { 
  PlatformHealth, 
  SystemAlert, 
  BackgroundJob, 
  JobMetrics, 
  QueueHealth, 
  AuditLog, 
  FeatureFlag, 
  EmailTemplate, 
  StorageMetrics, 
  Backup, 
  MaintenanceEvent, 
  SystemConfiguration 
} from "../types";

export const mockPlatformHealth: PlatformHealth = {
  overallScore: 98,
  status: "HEALTHY",
  lastUpdated: new Date().toISOString(),
  services: {
    database: "HEALTHY",
    queue: "HEALTHY",
    storage: "HEALTHY",
    email: "HEALTHY",
    search: "HEALTHY",
    cache: "HEALTHY",
  }
};

export const mockSystemAlerts: SystemAlert[] = [
  {
    id: "al-1",
    title: "High API Latency",
    message: "Average response time exceeded 500ms in EU-West region.",
    severity: "WARNING",
    source: "API Gateway",
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: "ACTIVE"
  },
  {
    id: "al-2",
    title: "Database Connection Pool Limit Reached",
    message: "Max connections (500) reached during peak hours.",
    severity: "CRITICAL",
    source: "PostgreSQL",
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    resolvedAt: new Date(Date.now() - 3600000).toISOString(),
    status: "RESOLVED"
  }
];

export const mockJobMetrics: JobMetrics = {
  averageDurationMs: 1450,
  successRate: 99.8,
  failureRate: 0.2,
  totalRunCount: 154200,
  lastRun: new Date().toISOString(),
  nextRun: new Date(Date.now() + 60000).toISOString() // 1 min from now
};

export const mockBackgroundJobs: BackgroundJob[] = [
  {
    id: "job-1",
    name: "Sync Candidate Emails",
    queue: "high",
    status: "RUNNING",
    durationMs: 4500,
    attempts: 1,
    maxAttempts: 3,
    createdAt: new Date(Date.now() - 5000).toISOString(),
    startedAt: new Date(Date.now() - 4500).toISOString(),
  },
  {
    id: "job-2",
    name: "Generate Monthly Invoices",
    queue: "default",
    status: "FAILED",
    durationMs: 12000,
    attempts: 3,
    maxAttempts: 3,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    errorMessage: "Stripe API rate limit exceeded.",
  },
  {
    id: "job-3",
    name: "Parse Resume Document",
    queue: "high",
    status: "QUEUED",
    durationMs: 0,
    attempts: 0,
    maxAttempts: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "job-4",
    name: "Index New Jobs",
    queue: "low",
    status: "RETRYING",
    durationMs: 800,
    attempts: 2,
    maxAttempts: 5,
    createdAt: new Date(Date.now() - 120000).toISOString(),
    startedAt: new Date(Date.now() - 110000).toISOString(),
    errorMessage: "Elasticsearch connection timeout.",
  }
];

export const mockQueueHealth: QueueHealth[] = [
  { name: "high", size: 12, averageWaitMs: 150, failureCount: 2, retryCount: 5, status: "HEALTHY" },
  { name: "default", size: 145, averageWaitMs: 850, failureCount: 12, retryCount: 45, status: "HEALTHY" },
  { name: "low", size: 5400, averageWaitMs: 12500, failureCount: 150, retryCount: 890, status: "DEGRADED" }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "audit-1",
    action: "USER_LOGIN",
    entityType: "USER",
    entityId: "usr-987",
    result: "SUCCESS",
    metadata: {
      correlationId: "corr-12345",
      requestId: "req-89012",
      actor: "john.doe@company.com",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      durationMs: 45,
      ipAddress: "192.168.1.45",
      region: "us-east-1",
      timestamp: new Date().toISOString()
    },
    payload: { method: "SSO", provider: "Okta" }
  },
  {
    id: "audit-2",
    action: "UPDATE_FEATURE_FLAG",
    entityType: "FEATURE_FLAG",
    entityId: "ff-ai-parsing",
    result: "SUCCESS",
    metadata: {
      correlationId: "corr-12346",
      requestId: "req-89013",
      actor: "admin@company.com",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      durationMs: 120,
      ipAddress: "10.0.0.15",
      region: "eu-west-1",
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    payload: { flag: "AI_RESUME_PARSING" },
    beforeSnapshot: { rolloutPercentage: 10 },
    afterSnapshot: { rolloutPercentage: 25 }
  }
];

export const mockFeatureFlags: FeatureFlag[] = [
  {
    id: "ff-1",
    key: "AI_RESUME_PARSING",
    name: "AI Resume Parsing V2",
    description: "Uses new LLM model for better extraction accuracy.",
    environment: "PRODUCTION",
    rolloutPercentage: 25,
    status: "ENABLED",
    owner: "jane.smith@company.com",
    lastModified: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "ff-2",
    key: "NEW_BILLING_PORTAL",
    name: "Stripe Billing Portal Integration",
    description: "Replaces legacy billing view with Stripe Customer Portal.",
    environment: "STAGING",
    rolloutPercentage: 100,
    status: "ENABLED",
    owner: "finance.team@company.com",
    lastModified: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: "ff-3",
    key: "DARK_MODE_V2",
    name: "Experimental Dark Mode Colors",
    description: "Slightly higher contrast dark mode palette.",
    environment: "DEVELOPMENT",
    rolloutPercentage: 10,
    status: "ENABLED",
    owner: "design.team@company.com",
    lastModified: new Date().toISOString()
  },
  {
    id: "ff-4",
    key: "BETA_ANALYTICS",
    name: "Advanced Analytics Dashboard",
    description: "New Tableau-embedded dashboards for enterprise.",
    environment: "PRODUCTION",
    rolloutPercentage: 1,
    status: "DISABLED",
    owner: "data.science@company.com",
    lastModified: new Date(Date.now() - 604800000).toISOString()
  }
];

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: "tpl-1",
    name: "Interview Invitation",
    subject: "Interview Scheduled: {{job_title}} at {{company_name}}",
    variables: ["candidate_name", "job_title", "company_name", "interview_date", "interview_link"],
    version: "v2.1.0",
    lastModified: new Date(Date.now() - 1209600000).toISOString(),
    status: "PUBLISHED"
  },
  {
    id: "tpl-2",
    name: "Offer Letter",
    subject: "Offer of Employment from {{company_name}}",
    variables: ["candidate_name", "company_name", "offer_link", "expiry_date"],
    version: "v1.5.2",
    lastModified: new Date(Date.now() - 4500000).toISOString(),
    status: "DRAFT"
  },
  {
    id: "tpl-3",
    name: "Password Reset",
    subject: "Reset your password",
    variables: ["user_name", "reset_link"],
    version: "v1.0.0",
    lastModified: new Date(Date.now() - 31536000000).toISOString(), // 1 year ago
    status: "PUBLISHED"
  }
];

export const mockStorageMetrics: StorageMetrics = {
  totalAllocatedGb: 5000,
  totalUsedGb: 3245,
  categories: [
    { category: "DATABASE", sizeGb: 450, percentage: 13.8 },
    { category: "BLOB_STORAGE", sizeGb: 1850, percentage: 57.0 },
    { category: "LOGS", sizeGb: 250, percentage: 7.7 },
    { category: "BACKUPS", sizeGb: 550, percentage: 16.9 },
    { category: "EMAIL_ATTACHMENTS", sizeGb: 145, percentage: 4.5 }
  ]
};

export const mockBackups: Backup[] = [
  {
    id: "bkp-1",
    type: "INCREMENTAL",
    sizeGb: 12.5,
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    completedAt: new Date(Date.now() - 3500000).toISOString(),
    retentionDays: 30
  },
  {
    id: "bkp-2",
    type: "FULL",
    sizeGb: 450.2,
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 82800000).toISOString(),
    retentionDays: 90
  },
  {
    id: "bkp-3",
    type: "INCREMENTAL",
    sizeGb: 0,
    status: "IN_PROGRESS",
    createdAt: new Date().toISOString(),
    retentionDays: 30
  }
];

export const mockMaintenanceEvents: MaintenanceEvent[] = [
  {
    id: "maint-1",
    title: "Database Index Rebuild",
    description: "Monthly maintenance to rebuild heavily fragmented indexes.",
    status: "SCHEDULED",
    scheduledStart: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    scheduledEnd: new Date(Date.now() + 180000000).toISOString()
  },
  {
    id: "maint-2",
    title: "Redis Cluster Upgrade",
    description: "Upgrading ElastiCache Redis from 6.x to 7.x.",
    status: "COMPLETED",
    scheduledStart: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    scheduledEnd: new Date(Date.now() - 601200000).toISOString(),
    actualStart: new Date(Date.now() - 604800000).toISOString(),
    actualEnd: new Date(Date.now() - 601000000).toISOString()
  }
];

export const mockSystemConfiguration: SystemConfiguration = {
  environment: "Production",
  timezone: "UTC",
  region: "us-east-1",
  maintenanceModeEnabled: false,
  debugModeEnabled: false,
  maxUploadSizeMb: 50,
  sessionTimeoutMinutes: 60
};
