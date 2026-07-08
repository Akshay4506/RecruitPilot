// ─────────────────────────────────────────────────────────────────────────────
// TanStack Query Key Factory
// Hierarchical key structure for precise invalidation
// ─────────────────────────────────────────────────────────────────────────────

import type {
  GetJobsParams,
  GetCandidatesParams,
  GetApplicationsParams,
  GetInterviewsParams,
} from "@/types/domain.types";

export const QUERY_KEYS = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  auth: {
    me:    ["auth", "me"] as const,
    session: ["auth", "session"] as const,
  },

  // ── Jobs ──────────────────────────────────────────────────────────────────
  jobs: {
    all:     ["jobs"] as const,
    lists:   () => [...QUERY_KEYS.jobs.all, "list"] as const,
    list:    (params?: GetJobsParams) => [...QUERY_KEYS.jobs.lists(), params] as const,
    details: () => [...QUERY_KEYS.jobs.all, "detail"] as const,
    detail:  (id: string) => [...QUERY_KEYS.jobs.details(), id] as const,
    stats:   (id: string) => [...QUERY_KEYS.jobs.detail(id), "stats"] as const,
  },

  // ── Candidates ────────────────────────────────────────────────────────────
  candidates: {
    all:     ["candidates"] as const,
    lists:   () => [...QUERY_KEYS.candidates.all, "list"] as const,
    list:    (params?: GetCandidatesParams) => [...QUERY_KEYS.candidates.lists(), params] as const,
    details: () => [...QUERY_KEYS.candidates.all, "detail"] as const,
    detail:  (id: string) => [...QUERY_KEYS.candidates.details(), id] as const,
    profile: () => [...QUERY_KEYS.candidates.all, "profile"] as const,
  },

  // ── Applications ──────────────────────────────────────────────────────────
  applications: {
    all:     ["applications"] as const,
    lists:   () => [...QUERY_KEYS.applications.all, "list"] as const,
    list:    (params?: GetApplicationsParams) => [...QUERY_KEYS.applications.lists(), params] as const,
    details: () => [...QUERY_KEYS.applications.all, "detail"] as const,
    detail:  (id: string) => [...QUERY_KEYS.applications.details(), id] as const,
    mine:    () => [...QUERY_KEYS.applications.all, "mine"] as const,
  },

  // ── Interviews ────────────────────────────────────────────────────────────
  interviews: {
    all:      ["interviews"] as const,
    lists:    () => [...QUERY_KEYS.interviews.all, "list"] as const,
    list:     (params?: GetInterviewsParams) => [...QUERY_KEYS.interviews.lists(), params] as const,
    details:  () => [...QUERY_KEYS.interviews.all, "detail"] as const,
    detail:   (id: string) => [...QUERY_KEYS.interviews.details(), id] as const,
    scorecard:(id: string) => [...QUERY_KEYS.interviews.detail(id), "scorecard"] as const,
    mine:     () => [...QUERY_KEYS.interviews.all, "mine"] as const,
  },

  // ── Analytics ─────────────────────────────────────────────────────────────
  analytics: {
    all:         ["analytics"] as const,
    recruitment: (params?: Record<string, unknown>) =>
      [...QUERY_KEYS.analytics.all, "recruitment", params] as const,
    interviews:  (params?: Record<string, unknown>) =>
      [...QUERY_KEYS.analytics.all, "interviews", params] as const,
  },

  // ── Company ───────────────────────────────────────────────────────────────
  company: {
    all:         ["company"] as const,
    detail:      () => [...QUERY_KEYS.company.all, "detail"] as const,
    departments: () => [...QUERY_KEYS.company.all, "departments"] as const,
    team:        () => [...QUERY_KEYS.company.all, "team"] as const,
  },

  // ── Documents ─────────────────────────────────────────────────────────────
  documents: {
    all:  ["documents"] as const,
    list: (params?: Record<string, unknown>) =>
      [...QUERY_KEYS.documents.all, "list", params] as const,
  },

  // ── Notifications ─────────────────────────────────────────────────────────
  notifications: {
    all:    ["notifications"] as const,
    unread: () => [...QUERY_KEYS.notifications.all, "unread"] as const,
  },

  // ── Workspaces ────────────────────────────────────────────────────────────
  workspaces: {
    all:    ["workspaces"] as const,
    list:   () => [...QUERY_KEYS.workspaces.all, "list"] as const,
    detail: (id: string) => [...QUERY_KEYS.workspaces.all, "detail", id] as const,
  },
} as const;
