import * as React from "react";
import { MetricCard } from "@/components/cards/metric-card";
import { UserMetrics as IUserMetrics } from "../../types";
import { Users, UserCheck, UserCog, Mail } from "lucide-react";

interface UserMetricsProps {
  metrics: IUserMetrics;
}

export function UserMetrics({ metrics }: UserMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <MetricCard
        title="Total Users"
        value={metrics.totalUsers.toString()}
        description="Across all roles"
        icon={Users}
        trend={2.4}
      />
      <MetricCard
        title="Active Sessions"
        value={metrics.activeSessions.toString()}
        description="Currently online"
        icon={UserCheck}
      />
      <MetricCard
        title="Recruiters & Managers"
        value={(metrics.recruiters + metrics.hiringManagers).toString()}
        description="Internal team members"
        icon={UserCog}
      />
      <MetricCard
        title="Pending Invitations"
        value={metrics.pendingInvitations.toString()}
        description="Awaiting acceptance"
        icon={Mail}
      />
    </div>
  );
}
