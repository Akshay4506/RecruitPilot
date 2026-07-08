"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { applicationsService } from "./applications.service";
import { showErrorToast } from "@/lib/error-handler";
import { toast } from "sonner";
import type { GetApplicationsParams } from "@/types/domain.types";
import type { CreateApplicationDto, UpdateApplicationStatusDto } from "./applications.service";

export function useApplications(params?: GetApplicationsParams) {
  return useQuery({
    queryKey: QUERY_KEYS.applications.list(params),
    queryFn: () => applicationsService.list(params),
  });
}

export function useMyApplications() {
  return useQuery({
    queryKey: QUERY_KEYS.applications.mine(),
    queryFn: applicationsService.getMine,
  });
}

export function useApplication(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.applications.detail(id),
    queryFn: () => applicationsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateApplicationDto) => applicationsService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.applications.lists() });
      toast.success("Application submitted successfully!");
    },
    onError: (error) => showErrorToast(error, "Failed to submit application."),
  });
}

export function useUpdateApplicationStatus(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateApplicationStatusDto) => applicationsService.updateStatus(id, data),
    onSuccess: (updated) => {
      qc.setQueryData(QUERY_KEYS.applications.detail(id), updated);
      qc.invalidateQueries({ queryKey: QUERY_KEYS.applications.lists() });
      toast.success("Application status updated.");
    },
    onError: (error) => showErrorToast(error, "Failed to update status."),
  });
}

export function useWithdrawApplication(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => applicationsService.withdraw(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.applications.lists() });
      toast.success("Application withdrawn.");
    },
    onError: (error) => showErrorToast(error, "Failed to withdraw application."),
  });
}

