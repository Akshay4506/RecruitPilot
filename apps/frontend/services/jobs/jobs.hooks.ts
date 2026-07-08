"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { jobsService } from "./jobs.service";
import { showErrorToast } from "@/lib/error-handler";
import { toast } from "sonner";
import type { GetJobsParams } from "@/types/domain.types";
import type { CreateJobDto, UpdateJobDto } from "./jobs.service";

export function useJobs(params?: GetJobsParams) {
  return useQuery({
    queryKey: QUERY_KEYS.jobs.list(params),
    queryFn: () => jobsService.list(params),
    staleTime: APP_CONSTANTS.STALE_TIME_MEDIUM,
  });
}

export function usePublicJobs(params?: GetJobsParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.jobs.lists(), "public", params],
    queryFn: () => jobsService.listPublic(params),
    staleTime: APP_CONSTANTS.STALE_TIME_LONG,
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.jobs.detail(id),
    queryFn: () => jobsService.getById(id),
    enabled: !!id,
    staleTime: APP_CONSTANTS.STALE_TIME_MEDIUM,
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateJobDto) => jobsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.jobs.lists() });
      toast.success("Job created successfully.");
    },
    onError: (error) => showErrorToast(error, "Failed to create job."),
  });
}

export function useUpdateJob(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateJobDto) => jobsService.update(id, data),
    onSuccess: (updated) => {
      qc.setQueryData(QUERY_KEYS.jobs.detail(id), updated);
      qc.invalidateQueries({ queryKey: QUERY_KEYS.jobs.lists() });
      toast.success("Job updated.");
    },
    onError: (error) => showErrorToast(error, "Failed to update job."),
  });
}

export function usePublishJob(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => jobsService.publish(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.jobs.detail(id) });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.jobs.lists() });
      toast.success("Job published successfully.");
    },
    onError: (error) => showErrorToast(error, "Failed to publish job."),
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => jobsService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.jobs.lists() });
      toast.success("Job deleted.");
    },
    onError: (error) => showErrorToast(error, "Failed to delete job."),
  });
}

