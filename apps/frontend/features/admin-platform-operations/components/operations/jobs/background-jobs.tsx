"use client";

import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { BackgroundJob, JobMetrics } from "../../../types";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { StatusChip } from "@/components/display/status-chip";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BackgroundJobsProps {
  jobs: BackgroundJob[];
  metrics: JobMetrics;
}

export function BackgroundJobs({ jobs, metrics }: BackgroundJobsProps) {
  const columns: ColumnDef<BackgroundJob>[] = React.useMemo(
    () => [
      {
        id: "name",
        header: "Job Name",
        accessorKey: "name",
        cell: (job: BackgroundJob) => (
          <div className="flex flex-col">
            <span className="font-medium text-[hsl(var(--foreground))]">{job.name}</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">Queue: {job.queue}</span>
          </div>
        ),
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (job: BackgroundJob) => {
          let variant: "success" | "warning" | "error" | "neutral" = "neutral";
          if (job.status === "RUNNING") variant = "success";
          if (job.status === "FAILED" || job.status === "RETRYING") variant = "error";
          if (job.status === "QUEUED") variant = "warning";
          return <StatusChip variant={variant} label={job.status} />;
        },
      },
      {
        id: "duration",
        header: "Duration",
        accessorKey: "durationMs",
        cell: (job: BackgroundJob) => (
          <span className="text-sm font-mono text-[hsl(var(--muted-foreground))]">
            {job.durationMs > 0 ? `${job.durationMs}ms` : "-"}
          </span>
        ),
      },
      {
        id: "attempts",
        header: "Attempts",
        accessorKey: "attempts",
        cell: (job: BackgroundJob) => (
          <span className="text-sm text-[hsl(var(--muted-foreground))]">
            {job.attempts} / {job.maxAttempts}
          </span>
        ),
      },
      {
        id: "startedAt",
        header: "Started",
        accessorKey: "startedAt",
        cell: (job: BackgroundJob) => (
          <span className="text-sm text-[hsl(var(--muted-foreground))]">
            {job.startedAt ? new Date(job.startedAt).toLocaleTimeString() : "-"}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        accessorKey: "id",
        cell: (job: BackgroundJob) => (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon" title="Retry Job">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <SettingsSection 
      title="Background Jobs" 
      description="Monitor asynchronous task execution across all worker nodes."
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))]">
          <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Avg Duration</p>
          <p className="text-xl font-bold mt-1 text-[hsl(var(--foreground))]">{metrics.averageDurationMs}ms</p>
        </div>
        <div className="p-4 rounded-lg bg-[hsl(var(--success)/0.1)] border border-[hsl(var(--success)/0.2)]">
          <p className="text-xs text-[hsl(var(--success))] uppercase tracking-wider">Success Rate</p>
          <p className="text-xl font-bold mt-1 text-[hsl(var(--success))]">{metrics.successRate}%</p>
        </div>
        <div className="p-4 rounded-lg bg-[hsl(var(--destructive)/0.1)] border border-[hsl(var(--destructive)/0.2)]">
          <p className="text-xs text-[hsl(var(--destructive))] uppercase tracking-wider">Failure Rate</p>
          <p className="text-xl font-bold mt-1 text-[hsl(var(--destructive))]">{metrics.failureRate}%</p>
        </div>
        <div className="p-4 rounded-lg bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.2)]">
          <p className="text-xs text-[hsl(var(--primary))] uppercase tracking-wider">Next Run</p>
          <p className="text-xl font-bold mt-1 text-[hsl(var(--primary))] text-sm">
            {metrics.nextRun ? new Date(metrics.nextRun).toLocaleTimeString() : "N/A"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <Input placeholder="Search jobs..." className="pl-9" />
        </div>
        <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
      </div>

      <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden">
        <DataTable data={jobs} columns={columns} keyField="id" />
      </div>
    </SettingsSection>
  );
}
