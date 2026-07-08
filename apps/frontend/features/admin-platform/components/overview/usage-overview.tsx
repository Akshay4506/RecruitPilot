import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Progress } from "@/components/ui/primitives";
import { mockUsageQuota } from "../../mock/billing.mock";

export function UsageOverview() {
  const getUsagePercent = (used: number, limit: number) => Math.min(100, (used / limit) * 100);
  
  const storagePct = getUsagePercent(mockUsageQuota.storageGbUsed, mockUsageQuota.storageGbLimit);
  const apiPct = getUsagePercent(mockUsageQuota.apiRequestsUsed, mockUsageQuota.apiRequestsLimit);
  const seatsPct = getUsagePercent(mockUsageQuota.recruiterSeatsUsed, mockUsageQuota.recruiterSeatsLimit);

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Current Usage Overview</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">Recruiter Seats</span>
            <span className="text-sm font-bold text-[hsl(var(--foreground))]">{Math.round(seatsPct)}%</span>
          </div>
          <Progress value={seatsPct} className="h-2" variant={seatsPct > 90 ? "danger" : seatsPct > 75 ? "warning" : "default"} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">Storage (GB)</span>
            <span className="text-sm font-bold text-[hsl(var(--foreground))]">{Math.round(storagePct)}%</span>
          </div>
          <Progress value={storagePct} className="h-2" variant={storagePct > 90 ? "danger" : storagePct > 75 ? "warning" : "default"} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">API Requests</span>
            <span className="text-sm font-bold text-[hsl(var(--foreground))]">{Math.round(apiPct)}%</span>
          </div>
          <Progress value={apiPct} className="h-2" variant={apiPct > 90 ? "danger" : apiPct > 75 ? "warning" : "default"} />
        </div>

      </CardContent>
    </Card>
  );
}
