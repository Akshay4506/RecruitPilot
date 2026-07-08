// ─────────────────────────────────────────────────────────────────────────────
// Role-based constants
// ─────────────────────────────────────────────────────────────────────────────

export const USER_ROLES = {
  CANDIDATE:      "CANDIDATE",
  RECRUITER:      "RECRUITER",
  HIRING_MANAGER: "HIRING_MANAGER",
  COMPANY_ADMIN:  "COMPANY_ADMIN",
  SUPER_ADMIN:    "SUPER_ADMIN",
} as const;

export type UserRoleKey = keyof typeof USER_ROLES;

// ─────────────────────────────────────────────────────────────────────────────
// Job / Application / Interview status constants
// ─────────────────────────────────────────────────────────────────────────────

export const JOB_STATUS = {
  DRAFT:     "DRAFT",
  PUBLISHED: "PUBLISHED",
  CLOSED:    "CLOSED",
  ARCHIVED:  "ARCHIVED",
} as const;

export const APPLICATION_STATUS = {
  APPLIED:      "APPLIED",
  SCREENING:    "SCREENING",
  PHONE_SCREEN: "PHONE_SCREEN",
  INTERVIEW:    "INTERVIEW",
  TECHNICAL:    "TECHNICAL",
  OFFER:        "OFFER",
  HIRED:        "HIRED",
  REJECTED:     "REJECTED",
  WITHDRAWN:    "WITHDRAWN",
} as const;

export const INTERVIEW_STATUS = {
  DRAFT:      "DRAFT",
  SCHEDULED:  "SCHEDULED",
  CONFIRMED:  "CONFIRMED",
  IN_PROGRESS:"IN_PROGRESS",
  COMPLETED:  "COMPLETED",
  CANCELLED:  "CANCELLED",
  NO_SHOW:    "NO_SHOW",
} as const;

export const INTERVIEW_DECISION = {
  PASS:             "PASS",
  FAIL:             "FAIL",
  HOLD:             "HOLD",
  NEEDS_DISCUSSION: "NEEDS_DISCUSSION",
  STRONG_HIRE:      "STRONG_HIRE",
  NO_HIRE:          "NO_HIRE",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Application constants
// ─────────────────────────────────────────────────────────────────────────────

export const APP_CONSTANTS = {
  // Token storage key
  ACCESS_TOKEN_KEY: "rp_access_token",
  REFRESH_TOKEN_KEY: "rp_refresh_token",
  WORKSPACE_KEY: "rp_workspace",

  // API
  API_TIMEOUT_MS: 30_000,
  UPLOAD_TIMEOUT_MS: 120_000,
  MAX_RETRY_ATTEMPTS: 3,

  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  // File upload
  MAX_RESUME_SIZE_MB: 5,
  MAX_DOCUMENT_SIZE_MB: 10,
  ALLOWED_RESUME_TYPES: [".pdf", ".doc", ".docx"],
  ALLOWED_IMAGE_TYPES: [".jpg", ".jpeg", ".png", ".webp"],

  // Stale times (ms)
  STALE_TIME_FAST:   0,          // always fresh
  STALE_TIME_SHORT:  30_000,     // 30 seconds
  STALE_TIME_MEDIUM: 2 * 60_000, // 2 minutes
  STALE_TIME_LONG:   5 * 60_000, // 5 minutes
  STALE_TIME_STATIC: 60 * 60_000,// 1 hour

  // GC times (ms)
  GC_TIME_SHORT:  2 * 60_000,  // 2 minutes
  GC_TIME_MEDIUM: 5 * 60_000,  // 5 minutes
  GC_TIME_LONG:   10 * 60_000, // 10 minutes
} as const;
