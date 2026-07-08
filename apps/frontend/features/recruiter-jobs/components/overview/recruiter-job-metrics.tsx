import * as React from "react";
import { Job } from "../../types";
import { MetricCard } from "@/components/cards/metric-card";
import { Users, CalendarClock, Clock, Timer, Briefcase, TrendingUp } from "lucide-react";

interface RecruiterJobMetricsProps {
  jobs: Job[];
}

export function RecruiterJobMetrics({ jobs }: RecruiterJobMetricsProps) {
  // Compute aggregate metrics from jobs
  let totalApps = 0;
  let activeInterviews = 0;
  let totalOffers = 0;
  let totalHires = 0;

  jobs.forEach(j => {
    totalApps += j.analytics.applicationsCount;
    activeInterviews += j.analytics.interviewsCount; // Mock active
    totalOffers += j.analytics.offersCount;
    totalHires += j.analytics.hiresCount;
  });

  const conversionRate = totalApps > 0 ? ((totalHires / totalApps) * 100).toFixed(1) : "0.0";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <MetricCard
        title="Applications"
        value={totalApps.toLocaleString()}
        icon={Users}
        trend={12}
      />
      <MetricCard
        title="Active Interviews"
        value={activeInterviews.toString()}
        icon={CalendarClock}
        trend={5}
      />
      <MetricCard
        title="Offers Extended"
        value={totalOffers.toString()}
        icon={Briefcase}
        trend={2}
      />
      <MetricCard
        title="Avg Time to Hire"
        value="24 days"
        icon={Timer}
        trend={-3}
      />
      <MetricCard
        title="Avg Time to Fill"
        value="30 days"
        icon={Clock}
      />
      <MetricCard
        title="Conversion Rate"
        value={`${conversionRate}%`}
        icon={TrendingUp}
      />
    </div>
  );
}
