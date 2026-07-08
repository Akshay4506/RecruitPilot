import * as React from "react";
import { DashboardMetrics } from "../../types";
import { MetricCard } from "@/components/cards/metric-card";
import { ROUTES } from "@/constants/routes";
import { Briefcase, Users, UserCheck, Calendar, Send, CheckCircle2, Zap, Clock } from "lucide-react";
import Link from "next/link";

interface KpiMetricsProps {
  metrics: DashboardMetrics;
}

export function KpiMetrics({ metrics }: KpiMetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Link href={ROUTES.recruiter.jobs} className="block transition-transform hover:-translate-y-1">
        <MetricCard 
          title="Open Jobs" 
          value={metrics.openJobs.toString()} 
          icon={Briefcase} 
          iconColor="text-[hsl(var(--primary))]"
          trend={2}
        />
      </Link>
      
      <Link href={ROUTES.recruiter.applications} className="block transition-transform hover:-translate-y-1">
        <MetricCard 
          title="Applications" 
          value={metrics.applicationsReceived.toString()} 
          icon={Users} 
          iconColor="text-[hsl(var(--info))]"
          trend={14}
        />
      </Link>

      <Link href={`${ROUTES.recruiter.applications}?status=REVIEWING`} className="block transition-transform hover:-translate-y-1">
        <MetricCard 
          title="Pending Reviews" 
          value={metrics.pendingReviews.toString()} 
          icon={UserCheck} 
          iconColor="text-[hsl(var(--warning))]"
        />
      </Link>

      <Link href={ROUTES.recruiter.interviews} className="block transition-transform hover:-translate-y-1">
        <MetricCard 
          title="Interviews Today" 
          value={metrics.interviewsToday.toString()} 
          icon={Calendar} 
          iconColor="text-[hsl(var(--primary))]"
        />
      </Link>

      <Link href={`${ROUTES.recruiter.applications}?status=OFFERED`} className="block transition-transform hover:-translate-y-1">
        <MetricCard 
          title="Offers Sent" 
          value={metrics.offersSent.toString()} 
          icon={Send} 
          iconColor="text-[hsl(var(--success))]"
        />
      </Link>

      <Link href={`${ROUTES.recruiter.candidates}?status=HIRED`} className="block transition-transform hover:-translate-y-1">
        <MetricCard 
          title="Total Hires" 
          value={metrics.hires.toString()} 
          icon={CheckCircle2} 
          iconColor="text-[hsl(var(--success))]"
        />
      </Link>

      <div className="block cursor-default">
        <MetricCard 
          title="Hiring Velocity" 
          value={`${metrics.hiringVelocityDays}d`} 
          icon={Zap} 
          iconColor="text-[hsl(var(--primary))]"
          trend={12}
        />
      </div>

      <div className="block cursor-default">
        <MetricCard 
          title="Time to Hire" 
          value={`${metrics.timeToHireDays}d`} 
          icon={Clock} 
          iconColor="text-[hsl(var(--muted-foreground))]"
          trend={-5}
        />
      </div>
    </div>
  );
}
