"use client";

import * as React from "react";
import { Webhook } from "../../../types";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { StatusChip } from "@/components/display/status-chip";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Edit2, Activity } from "lucide-react";

interface WebhooksTableProps {
  webhooks: Webhook[];
}

export function WebhooksTable({ webhooks }: WebhooksTableProps) {
  const columns: ColumnDef<Webhook>[] = React.useMemo(
    () => [
      {
        id: "url",
        header: "Endpoint URL",
        accessorKey: "url",
        cell: (hook: Webhook) => (
          <div className="flex flex-col max-w-[200px] lg:max-w-[300px]">
            <span className="font-mono text-sm text-[hsl(var(--foreground))] truncate">{hook.url}</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              {hook.events.length} event{hook.events.length !== 1 ? 's' : ''} subscribed
            </span>
          </div>
        ),
      },
      {
        id: "health",
        header: "Health (Last 24h)",
        accessorKey: "successRate",
        cell: (hook: Webhook) => {
          const isHealthy = hook.successRate > 95;
          return (
            <div className="flex flex-col gap-1">
              <span className={`text-sm font-medium ${isHealthy ? "text-[hsl(var(--success))]" : "text-[hsl(var(--warning))]"}`}>
                {hook.successRate}% Success
              </span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                {hook.recentDeliveries.toLocaleString()} deliveries
              </span>
            </div>
          );
        },
      },
      {
        id: "latency",
        header: "Avg. Latency",
        accessorKey: "averageLatencyMs",
        cell: (hook: Webhook) => (
          <span className="text-sm font-mono text-[hsl(var(--muted-foreground))]">{hook.averageLatencyMs}ms</span>
        ),
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (hook: Webhook) => (
          <StatusChip 
            variant={hook.status === "ACTIVE" ? "success" : "neutral"} 
            label={hook.status} 
          />
        ),
      },
      {
        id: "actions",
        header: "",
        accessorKey: "id",
        cell: (hook: Webhook) => (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon" title="View Logs">
              <Activity className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Edit Endpoint">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[hsl(var(--destructive))]" title="Delete Webhook">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <SettingsSection 
      title="Configured Webhooks" 
      description="Manage outgoing webhooks to push event notifications to your internal systems."
      footer={
        <div className="flex justify-end w-full">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Endpoint
          </Button>
        </div>
      }
    >
      <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden">
        <DataTable data={webhooks} columns={columns} keyField="id" />
      </div>
    </SettingsSection>
  );
}
