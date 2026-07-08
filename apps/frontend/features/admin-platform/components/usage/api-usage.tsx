import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Progress } from "@/components/ui/primitives";
import { mockUsageQuota } from "../../mock/billing.mock";

export function ApiUsage() {
  const pct = (mockUsageQuota.apiRequestsUsed / mockUsageQuota.apiRequestsLimit) * 100;
  
  return (
    <SettingsSection 
      title="API Request Limits" 
      description="Total API requests made by custom integrations and Webhooks this billing cycle."
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">Used: {mockUsageQuota.apiRequestsUsed.toLocaleString()} reqs</span>
          <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Limit: {mockUsageQuota.apiRequestsLimit.toLocaleString()} reqs</span>
        </div>
        <Progress value={pct} className="h-3" variant={pct > 90 ? "danger" : pct > 75 ? "warning" : "default"} />
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
          API rate limits reset on the 1st of every month. Internal platform usage (RecruitPilot UI) does not count against this quota.
        </p>
      </div>
    </SettingsSection>
  );
}
