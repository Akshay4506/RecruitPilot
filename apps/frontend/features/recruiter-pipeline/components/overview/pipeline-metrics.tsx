import * as React from "react";
import { MetricCard } from "@/components/cards/metric-card";
import { PipelineMetrics as MetricsType } from "../../types";
import { Timer, TrendingUp, UserCheck, CalendarDays, CheckCircle2 } from "lucide-react";

interface PipelineMetricsProps {
  metrics: MetricsType;
}

export function PipelineMetrics({ metrics }: PipelineMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard
        title="Velocity"
        value={metrics.velocity.toString()}
        description="candidates moved this week"
        icon={TrendingUp}
        trend={12}
      />
      <MetricCard
        title="Conversion"
        value={`${metrics.conversionPercent}%`}
        description="overall pipeline conversion"
        icon={UserCheck}
        trend={3}
      />
      <MetricCard
        title="Time to Hire"
        value={`${metrics.timeToHireDays}d`}
        description="average across all stages"
        icon={Timer}
        trend={-5}
      />
      <MetricCard
        title="Interview Rate"
        value={`${metrics.interviewRatePercent}%`}
        description="applications reaching interview"
        icon={CalendarDays}
      />
      <MetricCard
        title="Offer Rate"
        value={`${metrics.offerRatePercent}%`}
        description="interviews resulting in offer"
        icon={CheckCircle2}
      />
    </div>
  );
}
