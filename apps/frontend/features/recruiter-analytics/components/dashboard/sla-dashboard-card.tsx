"use client";

import * as React from "react";
import { AnalyticsCard } from "./analytics-card";
import { Badge } from "@/components/ui/badge";

interface SLAData {
  metric: string;
  value: number;
  target: number;
  status: string;
}

interface SLADashboardCardProps {
  data: SLAData[];
  isLoading?: boolean;
}

export function SLADashboardCard({ data, isLoading }: SLADashboardCardProps) {
  return (
    <AnalyticsCard 
      title="SLA Compliance" 
      description="Service Level Agreement tracking"
      isLoading={isLoading}
      isEmpty={!isLoading && data.length === 0}
      className="col-span-full xl:col-span-1"
    >
      <div className="space-y-4">
        {data.map((item, idx) => {
          const isFailed = item.value > item.target;
          return (
            <div key={idx} className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{item.metric}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Target: {item.target}h | Actual: {item.value}h
                </p>
              </div>
              <Badge variant={isFailed ? "destructive" : "success"}>
                {isFailed ? "BREACHED" : "ON TRACK"}
              </Badge>
            </div>
          );
        })}
      </div>
    </AnalyticsCard>
  );
}
