"use client";

import * as React from "react";
import { ApiKey } from "../../../types";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { StatusChip } from "@/components/display/status-chip";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Trash2, Plus } from "lucide-react";

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
}

export function ApiKeysTable({ apiKeys }: ApiKeysTableProps) {
  const columns: ColumnDef<ApiKey>[] = React.useMemo(
    () => [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        cell: (key: ApiKey) => (
          <span className="font-medium text-[hsl(var(--foreground))]">{key.name}</span>
        ),
      },
      {
        id: "keyPrefix",
        header: "Key Prefix",
        accessorKey: "keyPrefix",
        cell: (key: ApiKey) => (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">{key.keyPrefix}••••••••</span>
            <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="h-3 w-3" /></Button>
          </div>
        ),
      },
      {
        id: "created",
        header: "Created",
        accessorKey: "createdAt",
        cell: (key: ApiKey) => (
          <span className="text-sm text-[hsl(var(--muted-foreground))]">{new Date(key.createdAt).toLocaleDateString()}</span>
        ),
      },
      {
        id: "lastUsed",
        header: "Last Used",
        accessorKey: "lastUsedAt",
        cell: (key: ApiKey) => (
          <span className="text-sm text-[hsl(var(--muted-foreground))]">{key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : "Never"}</span>
        ),
      },
      {
        id: "scopes",
        header: "Scopes",
        accessorKey: "scopes",
        cell: (key: ApiKey) => (
          <span className="text-xs font-mono bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] px-2 py-1 rounded">
            {key.scopes.join(", ")}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (key: ApiKey) => (
          <StatusChip 
            variant={key.status === "ACTIVE" ? "success" : "neutral"} 
            label={key.status} 
          />
        ),
      },
      {
        id: "actions",
        header: "",
        accessorKey: "id",
        cell: (key: ApiKey) => (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon" title="Rotate Key">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[hsl(var(--destructive))]" title="Revoke Key">
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
      title="API Credentials" 
      description="Manage API keys for programmatic access to the RecruitPilot API."
      footer={
        <div className="flex justify-end w-full">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Generate New Key
          </Button>
        </div>
      }
    >
      <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden">
        <DataTable data={apiKeys} columns={columns} keyField="id" />
      </div>
    </SettingsSection>
  );
}
