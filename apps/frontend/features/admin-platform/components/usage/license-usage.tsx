import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Progress } from "@/components/ui/primitives";
import { mockUsageQuota } from "../../mock/billing.mock";

export function LicenseUsage() {
  const pct = (mockUsageQuota.recruiterSeatsUsed / mockUsageQuota.recruiterSeatsLimit) * 100;
  
  return (
    <SettingsSection 
      title="Recruiter Seats" 
      description="Allocated seats for full-access recruiter accounts."
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">Assigned: {mockUsageQuota.recruiterSeatsUsed}</span>
          <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Limit: {mockUsageQuota.recruiterSeatsLimit}</span>
        </div>
        <Progress value={pct} className="h-3" variant={pct > 90 ? "danger" : pct > 75 ? "warning" : "default"} />
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
          Hiring Managers and Interviewers are free and unlimited. Only users with the Recruiter or Administrator role consume a licensed seat.
        </p>
      </div>
    </SettingsSection>
  );
}
