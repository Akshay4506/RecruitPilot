import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { AdminMetrics } from "../../types";
import { LayoutDashboard } from "lucide-react";

interface PlatformSummaryProps {
  metrics: AdminMetrics;
}

export function PlatformSummary({ metrics }: PlatformSummaryProps) {
  const summaryItems = [
    { label: "Total Users", value: metrics.totalUsers },
    { label: "Recruiters", value: metrics.recruiters },
    { label: "Hiring Managers", value: metrics.hiringManagers },
    { label: "Candidates", value: metrics.candidates },
    { label: "Open Jobs", value: metrics.jobs },
    { label: "Applications", value: metrics.applications },
    { label: "Interviews", value: metrics.interviews },
    { label: "Storage Used", value: `${metrics.storageUsedGb} GB` },
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4 text-[hsl(var(--primary))]" /> Platform Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-0">
        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          {summaryItems.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider">{item.label}</span>
              <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
