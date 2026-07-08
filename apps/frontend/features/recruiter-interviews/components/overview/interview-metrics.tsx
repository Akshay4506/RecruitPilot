import * as React from "react";
import { MetricCard } from "@/components/cards/metric-card";
import { DashboardMetrics } from "../../types";
import { Clock, CheckSquare, Users, Timer } from "lucide-react";

interface InterviewMetricsProps {
  metrics: DashboardMetrics;
}

export function InterviewMetrics({ metrics }: InterviewMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Avg Duration"
        value={`${metrics.averageDurationMins}m`}
        description="across all technical rounds"
        icon={Clock}
        trend={-5}
      />
      <MetricCard
        title="Feedback Completion"
        value={`${metrics.feedbackCompletionPercent}%`}
        description="submitted within 24 hours"
        icon={CheckSquare}
        trend={12}
      />
      <MetricCard
        title="Panel Utilization"
        value={`${metrics.panelUtilizationPercent}%`}
        description="team interview load"
        icon={Users}
        trend={2}
      />
      <MetricCard
        title="Time to Decision"
        value={`${metrics.timeToDecisionDays}d`}
        description="from final round"
        icon={Timer}
        trend={-1.5}
      />
    </div>
  );
}
