"use client";

import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Backup } from "../../types";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { StatusChip } from "@/components/display/status-chip";
import { Button } from "@/components/ui/button";
import { RotateCcw, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BackupsTableProps {
  backups: Backup[];
  onRestore: (backup: Backup) => void;
}

export function BackupsTable({ backups, onRestore }: BackupsTableProps) {
  const columns: ColumnDef<Backup>[] = React.useMemo(
    () => [
      {
        id: "id",
        header: "Backup ID",
        accessorKey: "id",
        cell: (b: Backup) => (
          <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">{b.id}</span>
        ),
      },
      {
        id: "type",
        header: "Type",
        accessorKey: "type",
        cell: (b: Backup) => (
          <Badge variant="outline" className="bg-[hsl(var(--muted)/0.5)] text-[10px]">{b.type}</Badge>
        ),
      },
      {
        id: "size",
        header: "Size",
        accessorKey: "sizeGb",
        cell: (b: Backup) => (
          <span className="text-sm font-mono text-[hsl(var(--foreground))]">{b.sizeGb > 0 ? `${b.sizeGb} GB` : "-"}</span>
        ),
      },
      {
        id: "createdAt",
        header: "Created At",
        accessorKey: "createdAt",
        cell: (b: Backup) => (
          <span className="text-sm text-[hsl(var(--foreground))]">{new Date(b.createdAt).toLocaleString()}</span>
        ),
      },
      {
        id: "retention",
        header: "Retention",
        accessorKey: "retentionDays",
        cell: (b: Backup) => (
          <span className="text-sm text-[hsl(var(--muted-foreground))]">{b.retentionDays} days</span>
        ),
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (b: Backup) => {
          let variant: "success" | "warning" | "error" | "neutral" = "success";
          if (b.status === "FAILED") variant = "error";
          if (b.status === "IN_PROGRESS") variant = "warning";
          return <StatusChip variant={variant} label={b.status} />;
        },
      },
      {
        id: "actions",
        header: "",
        accessorKey: "id",
        cell: (b: Backup) => (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon" disabled={b.status !== "COMPLETED"} title="Download Backup">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" disabled={b.status !== "COMPLETED"} onClick={() => onRestore(b)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restore
            </Button>
          </div>
        ),
      },
    ],
    [onRestore]
  );

  return (
    <SettingsSection 
      title="System Backups" 
      description="Database and storage backups. Backups are retained automatically based on organizational policies."
    >
      <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden">
        <DataTable data={backups} columns={columns} keyField="id" />
      </div>
    </SettingsSection>
  );
}
