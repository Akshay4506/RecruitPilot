"use client";

import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { FeatureFlag } from "../../types";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { StatusChip } from "@/components/display/status-chip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings2, Plus } from "lucide-react";
import { Progress } from "@/components/ui/primitives";

interface FeatureFlagsTableProps {
  flags: FeatureFlag[];
  onEditFlag: (flag: FeatureFlag) => void;
}

export function FeatureFlagsTable({ flags, onEditFlag }: FeatureFlagsTableProps) {
  const columns: ColumnDef<FeatureFlag>[] = React.useMemo(
    () => [
      {
        id: "feature",
        header: "Feature",
        accessorKey: "name",
        cell: (flag: FeatureFlag) => (
          <div className="flex flex-col gap-1 max-w-[250px]">
            <span className="font-semibold text-sm text-[hsl(var(--foreground))]">{flag.name}</span>
            <span className="font-mono text-xs text-[hsl(var(--muted-foreground))] truncate">{flag.key}</span>
          </div>
        ),
      },
      {
        id: "environment",
        header: "Environment",
        accessorKey: "environment",
        cell: (flag: FeatureFlag) => {
          let variant: "default" | "outline" | "secondary" | "destructive" | "success" | "warning" = "default";
          if (flag.environment === "PRODUCTION") variant = "destructive"; // Red/attention for prod
          if (flag.environment === "STAGING") variant = "warning";
          if (flag.environment === "DEVELOPMENT") variant = "success";
          return <Badge variant={variant} className="text-[10px] uppercase">{flag.environment}</Badge>;
        },
      },
      {
        id: "rollout",
        header: "Rollout",
        accessorKey: "rolloutPercentage",
        cell: (flag: FeatureFlag) => (
          <div className="flex flex-col gap-1 w-24">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[hsl(var(--muted-foreground))]">Traffic</span>
              <span className="font-semibold text-[hsl(var(--foreground))]">{flag.rolloutPercentage}%</span>
            </div>
            <Progress value={flag.rolloutPercentage} className="h-1.5" />
          </div>
        ),
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (flag: FeatureFlag) => (
          <StatusChip 
            variant={flag.status === "ENABLED" ? "success" : "neutral"} 
            label={flag.status} 
          />
        ),
      },
      {
        id: "owner",
        header: "Owner",
        accessorKey: "owner",
        cell: (flag: FeatureFlag) => (
          <span className="text-xs text-[hsl(var(--muted-foreground))] truncate max-w-[120px] inline-block">{flag.owner}</span>
        ),
      },
      {
        id: "actions",
        header: "",
        accessorKey: "id",
        cell: (flag: FeatureFlag) => (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEditFlag(flag)}>
              <Settings2 className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        ),
      },
    ],
    [onEditFlag]
  );

  return (
    <SettingsSection 
      title="Feature Flags" 
      description="Control the rollout of new features and experimental capabilities."
      footer={
        <div className="flex justify-end w-full">
          <Button className="gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
            <Plus className="h-4 w-4" />
            Create Flag
          </Button>
        </div>
      }
    >
      <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden">
        <DataTable data={flags} columns={columns} keyField="id" />
      </div>
    </SettingsSection>
  );
}
