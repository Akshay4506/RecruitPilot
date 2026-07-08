import * as React from "react";
import { MetricCard } from "@/components/cards/metric-card";
import { AdminMetrics as IAdminMetrics } from "../../types";
import { Users, Briefcase, FileText, MonitorSmartphone } from "lucide-react";

interface AdminMetricsProps {
  metrics: IAdminMetrics;
}

export function AdminMetrics({ metrics }: AdminMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <MetricCard
        title="Total Users"
        value={metrics.totalUsers.toString()}
        description="Across all roles"
        icon={Users}
        trend={5.2}
      />
      <MetricCard
        title="Active Jobs"
        value={metrics.jobs.toString()}
        description="Published & Internal"
        icon={Briefcase}
        trend={2.4}
      />
      <MetricCard
        title="Applications"
        value={metrics.applications.toString()}
        description="All time"
        icon={FileText}
        trend={12.5}
      />
      <MetricCard
        title="Active Sessions"
        value={metrics.activeSessions.toString()}
        description="Currently online"
        icon={MonitorSmartphone}
      />
    </div>
  );
}
