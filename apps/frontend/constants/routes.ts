// ─────────────────────────────────────────────────────────────────────────────
// Application Routes — single source of truth
// No hardcoded paths anywhere else
// ─────────────────────────────────────────────────────────────────────────────

export const ROUTES = {
  // ── Public ────────────────────────────────────────────────────────────────
  public: {
    home:    "/",
    pricing: "/pricing",
    docs:    "/docs",
    blog:    "/blog",
  },

  // ── Auth ──────────────────────────────────────────────────────────────────
  auth: {
    login:         "/login",
    register:      "/register",
    forgotPassword:"/forgot-password",
    resetPassword: "/reset-password",
    verifyEmail:   "/verify-email",
  },

  // ── Candidate ─────────────────────────────────────────────────────────────
  candidate: {
    dashboard:    "/candidate/dashboard",
    jobs:         "/candidate/jobs",
    job:    (id: string) => `/candidate/jobs/${id}`,
    applications: "/candidate/applications",
    application:  (id: string) => `/candidate/applications/${id}`,
    interviews:   "/candidate/interviews",
    saved:        "/candidate/saved",
    profile:      "/candidate/profile",
    documents:    "/candidate/documents",
    settings:     "/candidate/settings",
    notifications:"/candidate/notifications",
  },

  // ── Recruiter ─────────────────────────────────────────────────────────────
  recruiter: {
    dashboard:   "/recruiter/dashboard",
    jobs:        "/recruiter/jobs",
    job:         (id: string) => `/recruiter/jobs/${id}`,
    jobNew:      "/recruiter/jobs/new",
    jobEdit:     (id: string) => `/recruiter/jobs/${id}/edit`,
    candidates:  "/recruiter/candidates",
    candidate:   (id: string) => `/recruiter/candidates/${id}`,
    candidateNew:"/recruiter/candidates/new",
    applications:"/recruiter/applications",
    application: (id: string) => `/recruiter/applications/${id}`,
    interviews:  "/recruiter/interviews",
    interview:   (id: string) => `/recruiter/interviews/${id}`,
    interviewNew:"/recruiter/interviews/new",
    interviewWorkspace: (id: string, tab?: string) =>
      `/recruiter/interviews/${id}/${tab ?? "overview"}`,
    evaluations: "/recruiter/evaluations",
    analytics:   "/recruiter/analytics",
    settings:    "/recruiter/settings",
    notifications:"/recruiter/notifications",
  },

  // ── Company Admin ─────────────────────────────────────────────────────────
  admin: {
    dashboard:   "/admin/dashboard",
    jobs:        "/admin/jobs",
    candidates:  "/admin/candidates",
    team:        "/admin/team",
    analytics:   "/admin/analytics",
    company:     "/admin/company",
    departments: "/admin/departments",
    permissions: "/admin/permissions",
    billing:     "/admin/billing",
    integrations:"/admin/integrations",
    settings:    "/admin/settings",
  },

  // ── Analytics ─────────────────────────────────────────────────────────────
  analytics: {
    overview: "/analytics/overview",
    funnel:   "/analytics/funnel",
    team:     "/analytics/team",
    time:     "/analytics/time",
    sources:  "/analytics/sources",
    reports:  "/analytics/reports",
    export:   "/analytics/export",
  },

  // ── Hiring Manager ────────────────────────────────────────────────────────
  manager: {
    dashboard:   "/manager/dashboard",
    requisitions:"/manager/requisitions",
    candidates:  "/manager/candidates",
    interviews:  "/manager/interviews",
    evaluations: "/manager/evaluations",
    settings:    "/manager/settings",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// API Endpoint constants
// ─────────────────────────────────────────────────────────────────────────────

export const API_ENDPOINTS = {
  auth: {
    login:         "/auth/login",
    register:      "/auth/register",
    refresh:       "/auth/refresh",
    logout:        "/auth/logout",
    forgotPassword:"/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyEmail:   "/auth/verify-email",
    me:            "/auth/me",
  },
  candidates: {
    list:   "/candidates",
    detail: (id: string) => `/candidates/${id}`,
    profile:"/candidates/profile",
  },
  jobs: {
    list:   "/jobs",
    detail: (id: string) => `/jobs/${id}`,
    public: "/jobs/public",
  },
  applications: {
    list:   "/applications",
    detail: (id: string) => `/applications/${id}`,
    mine:   "/applications/mine",
  },
  interviews: {
    list:   "/interviews",
    detail: (id: string) => `/interviews/${id}`,
    mine:   "/interviews/mine",
    scorecard: (id: string) => `/interviews/${id}/scorecard`,
  },
  analytics: {
    recruitment: "/recruitment-analytics",
    interviews:  "/interview-analytics",
  },
  documents: {
    list:   "/documents",
    upload: "/documents/upload",
    detail: (id: string) => `/documents/${id}`,
  },
  company:     "/company",
  departments: "/departments",
  team:        "/team",
  notifications: "/notifications",
  workspaces:  "/recruiter-workspace",
} as const;
