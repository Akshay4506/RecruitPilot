import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { StorageDistribution } from "../../types";
import { HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";

interface StorageOverviewProps {
  distribution: StorageDistribution[];
  usedGb: number;
  limitGb: number;
}

export function StorageOverview({ distribution, usedGb, limitGb }: StorageOverviewProps) {
  const percentage = Math.round((usedGb / limitGb) * 100);
  const getProgressColor = (percent: number) => {
    if (percent > 90) return "bg-[hsl(var(--destructive))]";
    if (percent > 75) return "bg-[hsl(var(--warning))]";
    return "bg-[hsl(var(--primary))]";
  };

  const getBarColor = (index: number) => {
    const colors = ["bg-[hsl(var(--primary))]", "bg-[hsl(var(--info))]", "bg-[hsl(var(--success))]"];
    return colors[index % colors.length];
  };

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <HardDrive className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> Storage Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">Total Usage</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{usedGb}GB / {limitGb}GB</span>
          </div>
          <div className="h-2.5 w-full bg-[hsl(var(--secondary))] rounded-full overflow-hidden">
            <div 
              className={cn("h-full rounded-full", getProgressColor(percentage))} 
              style={{ width: `${Math.min(percentage, 100)}%` }} 
            />
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">{percentage}% of capacity used</p>
        </div>

        <div className="space-y-3">
          {distribution.map((item, idx) => {
            const itemPercent = Math.round((item.sizeGb / usedGb) * 100);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[hsl(var(--foreground))]">{item.name}</span>
                  <span className="text-[hsl(var(--muted-foreground))]">{item.sizeGb}GB ({itemPercent}%)</span>
                </div>
                <div className="h-1.5 w-full bg-[hsl(var(--secondary))] rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full", getBarColor(idx))} 
                    style={{ width: `${itemPercent}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
