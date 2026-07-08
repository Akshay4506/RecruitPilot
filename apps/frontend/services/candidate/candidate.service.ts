import { get, post, patch } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/constants/routes";
import type {
  Candidate,
  GetCandidatesParams,
} from "@/types/domain.types";
import type { PaginatedResponse } from "@/types/api.types";

export interface UpdateCandidateProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  headline?: string;
  summary?: string;
  skills?: string[];
  location?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  isOpenToRelocation?: boolean;
  expectedSalary?: number;
}

export const candidateService = {
  list: (params?: GetCandidatesParams) =>
    get<PaginatedResponse<Candidate>>(API_ENDPOINTS.candidates.list, { params }),

  getById: (id: string) =>
    get<Candidate>(API_ENDPOINTS.candidates.detail(id)),

  getMyProfile: () =>
    get<Candidate>(API_ENDPOINTS.candidates.profile),

  updateProfile: (data: UpdateCandidateProfileDto) =>
    patch<Candidate>(API_ENDPOINTS.candidates.profile, data),

  uploadResume: (formData: FormData) =>
    post<{ resumeUrl: string }>("/candidates/resume", formData),
};
