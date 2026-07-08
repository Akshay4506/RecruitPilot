import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { StatusChip } from "@/components/display/status-chip";
import { mockUsageQuota } from "../../mock/billing.mock";

export function BillingHealth() {
  const getUsagePercent = (used: number, limit: number) => (used / limit) * 100;
  
  const storagePct = getUsagePercent(mockUsageQuota.storageGbUsed, mockUsageQuota.storageGbLimit);
  const apiPct = getUsagePercent(mockUsageQuota.apiRequestsUsed, mockUsageQuota.apiRequestsLimit);

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Platform Health</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">Plan Status</span>
          <StatusChip variant="success" label="Active" showIcon={true} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">Last Payment</span>
          <StatusChip variant="success" label="Successful" showIcon={true} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">Outstanding Balance</span>
          <StatusChip variant="success" label="None" showIcon={true} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">API Usage</span>
          <StatusChip variant={apiPct > 90 ? "error" : apiPct > 75 ? "warning" : "success"} label={apiPct > 90 ? "Critical" : apiPct > 75 ? "Warning" : "Healthy"} showIcon={true} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">Storage</span>
          <StatusChip variant={storagePct > 90 ? "error" : storagePct > 75 ? "warning" : "success"} label={storagePct > 90 ? "Critical" : storagePct > 75 ? "Warning" : "Healthy"} showIcon={true} />
        </div>
      </CardContent>
    </Card>
  );
}
