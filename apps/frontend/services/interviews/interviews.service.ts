import { get, post, patch } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/constants/routes";
import type { Interview, GetInterviewsParams } from "@/types/domain.types";
import type { PaginatedResponse } from "@/types/api.types";

export interface CreateInterviewDto {
  applicationId: string;
  title: string;
  type: string;
  scheduledAt: string;
  durationMinutes: number;
  location?: string;
  meetingLink?: string;
  participantIds?: string[];
}

export type UpdateInterviewDto = Partial<CreateInterviewDto> & { status?: string };

export interface SubmitScorecardDto {
  decision: string;
  overallScore: number;
  competencyScores?: Record<string, number>;
  notes?: string;
}

export const interviewsService = {
  list: (params?: GetInterviewsParams) =>
    get<PaginatedResponse<Interview>>(API_ENDPOINTS.interviews.list, { params }),

  getMine: () =>
    get<PaginatedResponse<Interview>>(API_ENDPOINTS.interviews.mine),

  getById: (id: string) =>
    get<Interview>(API_ENDPOINTS.interviews.detail(id)),

  create: (data: CreateInterviewDto) =>
    post<Interview>(API_ENDPOINTS.interviews.list, data),

  update: (id: string, data: UpdateInterviewDto) =>
    patch<Interview>(API_ENDPOINTS.interviews.detail(id), data),

  cancel: (id: string, reason?: string) =>
    patch<Interview>(`${API_ENDPOINTS.interviews.detail(id)}/cancel`, { reason }),

  confirm: (id: string) =>
    patch<Interview>(`${API_ENDPOINTS.interviews.detail(id)}/confirm`),

  getScorecard: (id: string) =>
    get<Record<string, unknown>>(API_ENDPOINTS.interviews.scorecard(id)),

  submitScorecard: (id: string, data: SubmitScorecardDto) =>
    post<Record<string, unknown>>(API_ENDPOINTS.interviews.scorecard(id), data),
};
