import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { FeatureEntitlement } from "../../types";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeatureEntitlementsProps {
  entitlements: FeatureEntitlement[];
}

export function FeatureEntitlements({ entitlements }: FeatureEntitlementsProps) {
  const columns: ColumnDef<FeatureEntitlement>[] = React.useMemo(
    () => [
      {
        id: "feature",
        header: "Feature",
        accessorKey: "featureName",
        cell: (feature: FeatureEntitlement) => (
          <span className="font-medium text-[hsl(var(--foreground))]">{feature.featureName}</span>
        ),
      },
      {
        id: "access",
        header: "Access",
        accessorKey: "isIncluded",
        cell: (feature: FeatureEntitlement) => (
          feature.isIncluded ? (
            <div className="flex items-center gap-2 text-[hsl(var(--success))]">
              <Check className="h-4 w-4" />
              <span className="text-sm">Included</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
              <X className="h-4 w-4" />
              <span className="text-sm">Not Included</span>
            </div>
          )
        ),
      },
      {
        id: "limits",
        header: "Limits",
        accessorKey: "limit",
        cell: (feature: FeatureEntitlement) => (
          feature.limit ? (
            <Badge variant="default">{feature.currentUsage || 0} / {feature.limit}</Badge>
          ) : feature.isIncluded ? (
            <Badge variant="outline" className="text-[hsl(var(--muted-foreground))]">Unlimited</Badge>
          ) : (
            <span className="text-sm text-[hsl(var(--muted-foreground))]">-</span>
          )
        ),
      },
    ],
    []
  );

  return (
    <SettingsSection 
      title="Feature Entitlements" 
      description="Detailed view of platform features included in your current tier."
    >
      <div className="rounded-md border border-[hsl(var(--border))] overflow-hidden">
        <DataTable data={entitlements} columns={columns} keyField="id" />
      </div>
    </SettingsSection>
  );
}
