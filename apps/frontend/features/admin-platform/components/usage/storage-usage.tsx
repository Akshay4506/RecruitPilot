import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Progress } from "@/components/ui/primitives";
import { mockUsageQuota } from "../../mock/billing.mock";

export function StorageUsage() {
  const pct = (mockUsageQuota.storageGbUsed / mockUsageQuota.storageGbLimit) * 100;
  
  return (
    <SettingsSection 
      title="Storage Quota" 
      description="Document and resume storage utilization across your workspaces."
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">Used: {mockUsageQuota.storageGbUsed} GB</span>
          <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Limit: {mockUsageQuota.storageGbLimit} GB</span>
        </div>
        <Progress value={pct} className="h-3" variant={pct > 90 ? "danger" : pct > 75 ? "warning" : "default"} />
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
          Storage includes candidate resumes, parsed documents, and company assets. If you exceed this limit, older parsed documents will remain accessible but new uploads will be blocked.
        </p>
      </div>
    </SettingsSection>
  );
}
