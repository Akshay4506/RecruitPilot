export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: "dashboard:view",

  // Jobs
  JOBS_VIEW: "jobs:view",
  JOBS_CREATE: "jobs:create",
  JOBS_UPDATE: "jobs:update",
  JOBS_DELETE: "jobs:delete",
  JOBS_MANAGE: "jobs:manage",

  // Candidates
  CANDIDATES_VIEW: "candidates:view",
  CANDIDATES_CREATE: "candidates:create",
  CANDIDATES_UPDATE: "candidates:update",
  CANDIDATES_DELETE: "candidates:delete",
  CANDIDATES_MANAGE: "candidates:manage",

  // Applications
  APPLICATIONS_VIEW: "applications:view",
  APPLICATIONS_UPDATE: "applications:update",
  APPLICATIONS_MANAGE: "applications:manage",

  // Interviews
  INTERVIEWS_VIEW: "interviews:view",
  INTERVIEWS_SCHEDULE: "interviews:schedule",
  INTERVIEWS_MANAGE: "interviews:manage",
  INTERVIEWS_EVALUATE: "interviews:evaluate",

  // Analytics
  ANALYTICS_VIEW: "analytics:view",
  ANALYTICS_EXPORT: "analytics:export",

  // Organization
  ORG_VIEW: "org:view",
  ORG_MANAGE: "org:manage",

  // Users
  USERS_VIEW: "users:view",
  USERS_MANAGE: "users:manage",

  // Roles & Permissions
  ROLES_VIEW: "roles:view",
  ROLES_MANAGE: "roles:manage",

  // System
  SYSTEM_MANAGE: "system:manage",
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;
export type PermissionValue = typeof PERMISSIONS[PermissionKey];
