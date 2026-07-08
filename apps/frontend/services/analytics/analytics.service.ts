import { get } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/constants/routes";
import type { RecruitmentAnalytics } from "@/types/domain.types";

export interface AnalyticsQueryParams {
  from?: string;
  to?: string;
  companyId?: string;
  jobId?: string;
}

export const analyticsService = {
  getRecruitmentAnalytics: (params?: AnalyticsQueryParams) =>
    get<RecruitmentAnalytics>(API_ENDPOINTS.analytics.recruitment, { params }),

  getInterviewAnalytics: (params?: AnalyticsQueryParams) =>
    get<Record<string, unknown>>(API_ENDPOINTS.analytics.interviews, { params }),
};
