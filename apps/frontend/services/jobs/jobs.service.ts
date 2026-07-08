import { get, post, patch, del } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/constants/routes";
import type { Job, GetJobsParams } from "@/types/domain.types";
import type { PaginatedResponse } from "@/types/api.types";

export interface CreateJobDto {
  title: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  type: string;
  experienceLevel: string;
  location: string;
  isRemote?: boolean;
  salaryRange?: { min: number; max: number; currency: string };
  skills?: string[];
  tags?: string[];
  departmentId?: string;
  closingDate?: string;
}

export type UpdateJobDto = Partial<CreateJobDto> & { status?: string };

export const jobsService = {
  list: (params?: GetJobsParams) =>
    get<PaginatedResponse<Job>>(API_ENDPOINTS.jobs.list, { params }),

  listPublic: (params?: GetJobsParams) =>
    get<PaginatedResponse<Job>>(API_ENDPOINTS.jobs.public, { params }),

  getById: (id: string) =>
    get<Job>(API_ENDPOINTS.jobs.detail(id)),

  create: (data: CreateJobDto) =>
    post<Job>(API_ENDPOINTS.jobs.list, data),

  update: (id: string, data: UpdateJobDto) =>
    patch<Job>(API_ENDPOINTS.jobs.detail(id), data),

  publish: (id: string) =>
    patch<Job>(`${API_ENDPOINTS.jobs.detail(id)}/publish`),

  close: (id: string) =>
    patch<Job>(`${API_ENDPOINTS.jobs.detail(id)}/close`),

  remove: (id: string) =>
    del<void>(API_ENDPOINTS.jobs.detail(id)),
};
