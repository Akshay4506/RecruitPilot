"use client";

import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { QueueHealth } from "../../../types";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { StatusChip } from "@/components/display/status-chip";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface QueueOverviewProps {
  queues: QueueHealth[];
}

export function QueueOverview({ queues }: QueueOverviewProps) {
  const columns: ColumnDef<QueueHealth>[] = React.useMemo(
    () => [
      {
        id: "name",
        header: "Queue Name",
        accessorKey: "name",
        cell: (q: QueueHealth) => (
          <span className="font-semibold text-[hsl(var(--foreground))]">{q.name}</span>
        ),
      },
      {
        id: "size",
        header: "Size",
        accessorKey: "size",
        cell: (q: QueueHealth) => (
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">{q.size.toLocaleString()}</span>
        ),
      },
      {
        id: "wait",
        header: "Avg Wait",
        accessorKey: "averageWaitMs",
        cell: (q: QueueHealth) => (
          <span className="text-sm font-mono text-[hsl(var(--muted-foreground))]">{q.averageWaitMs}ms</span>
        ),
      },
      {
        id: "failures",
        header: "Failures (24h)",
        accessorKey: "failureCount",
        cell: (q: QueueHealth) => (
          <span className={`text-sm font-medium ${q.failureCount > 10 ? "text-[hsl(var(--destructive))]" : "text-[hsl(var(--foreground))]"}`}>
            {q.failureCount.toLocaleString()}
          </span>
        ),
      },
      {
        id: "status",
        header: "Health",
        accessorKey: "status",
        cell: (q: QueueHealth) => {
          let variant: "success" | "warning" | "error" = "success";
          if (q.status === "DEGRADED") variant = "warning";
          if (q.status === "DOWN") variant = "error";
          return <StatusChip variant={variant} label={q.status} />;
        },
      },
      {
        id: "actions",
        header: "",
        accessorKey: "name",
        cell: (q: QueueHealth) => (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon" title="Configure Queue">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <SettingsSection 
      title="Queue Monitoring" 
      description="Real-time visibility into message brokers and event queues."
    >
      <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden">
        <DataTable data={queues} columns={columns} keyField="name" />
      </div>
    </SettingsSection>
  );
}
