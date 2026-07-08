"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { analyticsService } from "./analytics.service";
import type { AnalyticsQueryParams } from "./analytics.service";

export function useRecruitmentAnalytics(params?: AnalyticsQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.recruitment(params as Record<string, unknown>),
    queryFn: () => analyticsService.getRecruitmentAnalytics(params),
    staleTime: APP_CONSTANTS.STALE_TIME_SHORT,
  });
}

export function useInterviewAnalytics(params?: AnalyticsQueryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.interviews(params as Record<string, unknown>),
    queryFn: () => analyticsService.getInterviewAnalytics(params),
    staleTime: APP_CONSTANTS.STALE_TIME_SHORT,
  });
}
