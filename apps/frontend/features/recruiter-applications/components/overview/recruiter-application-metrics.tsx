import * as React from "react";
import { Application } from "../../types";
import { MetricCard } from "@/components/cards/metric-card";
import { Timer, MessageSquare, Target, UserCheck, Briefcase, TrendingUp } from "lucide-react";

export function RecruiterApplicationMetrics({ applications }: { applications: Application[] }) {
  // Mock calculations
  const total = applications.length || 1;
  const shortlisted = applications.filter(a => a.status === "SHORTLISTED" || a.status === "INTERVIEW_SCHEDULED" || a.status === "OFFER" || a.status === "HIRED").length;
  const interviews = applications.filter(a => a.status === "INTERVIEW_SCHEDULED" || a.status === "OFFER" || a.status === "HIRED").length;
  const offers = applications.filter(a => a.status === "OFFER" || a.status === "HIRED").length;
  const hires = applications.filter(a => a.status === "HIRED").length;

  const shortlistingRate = Math.round((shortlisted / total) * 100);
  const interviewRate = Math.round((interviews / shortlisted) * 100) || 0;
  const offerRate = Math.round((offers / interviews) * 100) || 0;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <MetricCard
        title="Avg Review Time"
        value="1.2 days"
        icon={Timer}
        trend={-5}
        trendFormat="percent"
      />
      <MetricCard
        title="Response Rate"
        value="92%"
        icon={MessageSquare}
        trend={2}
      />
      <MetricCard
        title="Shortlisting %"
        value={`${shortlistingRate}%`}
        icon={Target}
      />
      <MetricCard
        title="Interview %"
        value={`${interviewRate}%`}
        icon={UserCheck}
      />
      <MetricCard
        title="Offer %"
        value={`${offerRate}%`}
        icon={Briefcase}
      />
      <MetricCard
        title="Hire %"
        value={`${hires}%`}
        icon={TrendingUp}
      />
    </div>
  );
}
