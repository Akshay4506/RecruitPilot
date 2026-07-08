"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { candidateService } from "./candidate.service";
import { showErrorToast } from "@/lib/error-handler";
import { toast } from "sonner";
import type { GetCandidatesParams } from "@/types/domain.types";
import type { UpdateCandidateProfileDto } from "./candidate.service";

export function useCandidates(params?: GetCandidatesParams) {
  return useQuery({
    queryKey: QUERY_KEYS.candidates.list(params),
    queryFn: () => candidateService.list(params),
  });
}

export function useCandidate(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.candidates.detail(id),
    queryFn: () => candidateService.getById(id),
    enabled: !!id,
  });
}

export function useMyCandidateProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.candidates.profile(),
    queryFn: candidateService.getMyProfile,
  });
}

export function useUpdateCandidateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCandidateProfileDto) => candidateService.updateProfile(data),
    onSuccess: (updated) => {
      qc.setQueryData(QUERY_KEYS.candidates.profile(), updated);
      toast.success("Profile updated successfully.");
    },
    onError: (error) => showErrorToast(error, "Failed to update profile."),
  });
}

