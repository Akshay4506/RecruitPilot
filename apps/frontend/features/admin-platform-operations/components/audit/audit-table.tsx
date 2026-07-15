"use client";

import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { AuditLog } from "../../types";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { StatusChip } from "@/components/display/status-chip";
import { Button } from "@/components/ui/button";
import { Eye, Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AuditTableProps {
  logs: AuditLog[];
  onViewDetails: (log: AuditLog) => void;
}

export function AuditTable({ logs, onViewDetails }: AuditTableProps) {
  const columns: ColumnDef<AuditLog>[] = React.useMemo(
    () => [
      {
        id: "timestamp",
        header: "Time",
        accessorKey: "metadata.timestamp",
        cell: (log: AuditLog) => (
          <div className="flex flex-col">
            <span className="font-medium text-[hsl(var(--foreground))] text-sm">
              {new Date(log.metadata.timestamp).toLocaleDateString()}
            </span>
            <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono">
              {new Date(log.metadata.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ),
      },
      {
        id: "actor",
        header: "Actor",
        accessorKey: "metadata.actor",
        cell: (log: AuditLog) => (
          <span className="text-sm font-medium text-[hsl(var(--foreground))] truncate max-w-[150px] inline-block">
            {log.metadata.actor}
          </span>
        ),
      },
      {
        id: "action",
        header: "Action",
        accessorKey: "action",
        cell: (log: AuditLog) => (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{log.action}</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              {log.entityType} ({log.entityId})
            </span>
          </div>
        ),
      },
      {
        id: "ip",
        header: "IP & Region",
        accessorKey: "metadata.ipAddress",
        cell: (log: AuditLog) => (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-mono text-[hsl(var(--muted-foreground))]">{log.metadata.ipAddress}</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{log.metadata.region}</span>
          </div>
        ),
      },
      {
        id: "result",
        header: "Result",
        accessorKey: "result",
        cell: (log: AuditLog) => (
          <StatusChip 
            variant={log.result === "SUCCESS" ? "success" : "error"} 
            label={log.result} 
          />
        ),
      },
      {
        id: "actions",
        header: "",
        accessorKey: "id",
        cell: (log: AuditLog) => (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => onViewDetails(log)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </div>
        ),
      },
    ],
    [onViewDetails]
  );

  return (
    <SettingsSection 
      title="Audit Log Explorer" 
      description="Immutable ledger of administrative and system events across the organization."
    >
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <Input placeholder="Search logs by actor, action, or IP..." className="pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

        <div className="border border-[hsl(var(--border))] rounded-xl overflow-hidden bg-[hsl(var(--card))]">
          <DataTable 
            data={logs} 
            columns={columns as any}
            keyField="id" 
            virtualized={true}
          />
        </div>
    </SettingsSection>
  );
}
