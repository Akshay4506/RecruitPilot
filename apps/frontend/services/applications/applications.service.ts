import { get, post, patch } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/constants/routes";
import type { Application, GetApplicationsParams } from "@/types/domain.types";
import type { PaginatedResponse } from "@/types/api.types";

export interface CreateApplicationDto {
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export interface UpdateApplicationStatusDto {
  status: string;
  rejectionReason?: string;
  recruiterNotes?: string;
}

export const applicationsService = {
  list: (params?: GetApplicationsParams) =>
    get<PaginatedResponse<Application>>(API_ENDPOINTS.applications.list, { params }),

  getMine: () =>
    get<PaginatedResponse<Application>>(API_ENDPOINTS.applications.mine),

  getById: (id: string) =>
    get<Application>(API_ENDPOINTS.applications.detail(id)),

  create: (data: CreateApplicationDto) =>
    post<Application>(API_ENDPOINTS.applications.list, data),

  updateStatus: (id: string, data: UpdateApplicationStatusDto) =>
    patch<Application>(`${API_ENDPOINTS.applications.detail(id)}/status`, data),

  moveStage: (id: string, stage: string) =>
    patch<Application>(`${API_ENDPOINTS.applications.detail(id)}/stage`, { stage }),

  addNote: (id: string, note: string) =>
    post<Application>(`${API_ENDPOINTS.applications.detail(id)}/notes`, { note }),

  withdraw: (id: string) =>
    patch<Application>(`${API_ENDPOINTS.applications.detail(id)}/withdraw`),
};
