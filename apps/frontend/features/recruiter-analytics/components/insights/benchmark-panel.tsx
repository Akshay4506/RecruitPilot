"use client";

import * as React from "react";
import { AnalyticsCard } from "../dashboard/analytics-card";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export function BenchmarkPanel() {
  const benchmarks = [
    { metric: "Time to Hire", current: "28 days", target: "30 days", diff: -2, status: "good" },
    { metric: "Offer Acceptance", current: "85%", target: "80%", diff: 5, status: "good" },
    { metric: "Diversity Mix", current: "45%", target: "50%", diff: -5, status: "bad" },
    { metric: "Cost per Hire", current: "$4.2k", target: "$4.5k", diff: -0.3, status: "good" }
  ];

  return (
    <AnalyticsCard title="Company Benchmarks" description="Compared to trailing 12 months average">
      <div className="space-y-4">
        {benchmarks.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-2 border-b border-[hsl(var(--border))] last:border-0">
            <div className="space-y-1">
              <div className="text-sm font-medium text-[hsl(var(--foreground))]">{item.metric}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Target: {item.target}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{item.current}</span>
              <div className={`flex items-center text-xs font-medium w-12 justify-end ${item.status === 'good' ? 'text-[hsl(var(--success))]' : 'text-[hsl(var(--destructive))]'}`}>
                {item.diff > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : item.diff < 0 ? <ArrowDownRight className="h-3 w-3 mr-1" /> : <Minus className="h-3 w-3 mr-1" />}
                {Math.abs(item.diff)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
