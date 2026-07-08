"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { interviewsService } from "./interviews.service";
import { showErrorToast } from "@/lib/error-handler";
import { toast } from "sonner";
import type { GetInterviewsParams } from "@/types/domain.types";
import type { CreateInterviewDto, UpdateInterviewDto, SubmitScorecardDto } from "./interviews.service";

export function useInterviews(params?: GetInterviewsParams) {
  return useQuery({
    queryKey: QUERY_KEYS.interviews.list(params),
    queryFn: () => interviewsService.list(params),
  });
}

export function useMyInterviews() {
  return useQuery({
    queryKey: QUERY_KEYS.interviews.mine(),
    queryFn: interviewsService.getMine,
  });
}

export function useInterview(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.interviews.detail(id),
    queryFn: () => interviewsService.getById(id),
    enabled: !!id,
  });
}

export function useInterviewScorecard(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.interviews.scorecard(id),
    queryFn: () => interviewsService.getScorecard(id),
    enabled: !!id,
  });
}

export function useCreateInterview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInterviewDto) => interviewsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.interviews.lists() });
      toast.success("Interview scheduled successfully.");
    },
    onError: (error) => showErrorToast(error, "Failed to schedule interview."),
  });
}

export function useUpdateInterview(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateInterviewDto) => interviewsService.update(id, data),
    onSuccess: (updated) => {
      qc.setQueryData(QUERY_KEYS.interviews.detail(id), updated);
      toast.success("Interview updated.");
    },
    onError: (error) => showErrorToast(error, "Failed to update interview."),
  });
}

export function useCancelInterview(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (reason?: string) => interviewsService.cancel(id, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.interviews.detail(id) });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.interviews.lists() });
      toast.success("Interview cancelled.");
    },
    onError: (error) => showErrorToast(error, "Failed to cancel interview."),
  });
}

export function useSubmitScorecard(interviewId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SubmitScorecardDto) => interviewsService.submitScorecard(interviewId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.interviews.scorecard(interviewId) });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.interviews.detail(interviewId) });
      toast.success("Scorecard submitted successfully.");
    },
    onError: (error) => showErrorToast(error, "Failed to submit scorecard."),
  });
}

