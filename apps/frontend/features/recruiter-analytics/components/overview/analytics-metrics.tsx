import * as React from "react";
import { MetricCard } from "@/components/cards/metric-card";
import { DashboardMetrics } from "../../types";
import { Briefcase, Users, Percent, Gift, CheckSquare } from "lucide-react";

interface AnalyticsMetricsProps {
  metrics: DashboardMetrics;
}

export function AnalyticsMetrics({ metrics }: AnalyticsMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <MetricCard
        title="Open Jobs"
        value={metrics.openJobs.toString()}
        description="Active reqs"
        icon={Briefcase}
        trend={15}
      />
      <MetricCard
        title="Applications"
        value={metrics.totalApplications.toString()}
        description="Last 30 days"
        icon={Users}
        trend={22}
      />
      <MetricCard
        title="Conversion Rate"
        value={`${metrics.conversionRate}%`}
        description="App to Screen"
        icon={Percent}
        trend={-2.5}
      />
      <MetricCard
        title="Offers Extended"
        value={metrics.offersExtended.toString()}
        description="Last 30 days"
        icon={Gift}
        trend={8}
      />
      <MetricCard
        title="Acceptance Rate"
        value={`${metrics.offerAcceptanceRate}%`}
        description="Rolling 90 days"
        icon={CheckSquare}
        trend={4}
      />
    </div>
  );
}
