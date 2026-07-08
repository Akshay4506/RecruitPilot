import * as React from "react";
import { Job } from "../../types";
import { Card } from "@/components/cards/card";

export function JobPerformance({ job }: { job: Job }) {
  // Placeholder for a real chart
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Performance Trends</h3>
      <Card className="p-6 h-[300px] flex items-center justify-center border-dashed bg-[hsl(var(--muted)/0.1)]">
        <div className="text-center">
          <p className="text-[hsl(var(--muted-foreground))]">Performance Chart</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]/70 mt-1">
            Applications and views over the last 30 days.
          </p>
        </div>
      </Card>
    </div>
  );
}
