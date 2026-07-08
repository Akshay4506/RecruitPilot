import * as React from "react";
import { DashboardMetrics } from "../../types";
import { Activity, Briefcase, FileText, Calendar, CheckSquare } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface WorkloadWidgetProps {
  metrics: DashboardMetrics;
}

export function WorkloadWidget({ metrics }: WorkloadWidgetProps) {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-[hsl(var(--info)/0.1)] flex items-center justify-center text-[hsl(var(--info))] shrink-0">
          <Activity className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-[hsl(var(--foreground))]">Your Workload</h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Current active tasks</p>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Link href={ROUTES.recruiter.jobs} className="flex items-center justify-between group">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
            <Briefcase className="h-4 w-4" /> Assigned Jobs
          </div>
          <span className="font-medium text-[hsl(var(--foreground))] bg-[hsl(var(--muted)/0.5)] px-2 py-0.5 rounded-full text-xs">
            {metrics.openJobs}
          </span>
        </Link>
        
        <Link href={`${ROUTES.recruiter.applications}?status=REVIEWING`} className="flex items-center justify-between group">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
            <FileText className="h-4 w-4" /> Pending Reviews
          </div>
          <span className="font-medium text-[hsl(var(--foreground))] bg-[hsl(var(--muted)/0.5)] px-2 py-0.5 rounded-full text-xs">
            {metrics.pendingReviews}
          </span>
        </Link>
        
        <Link href={`${ROUTES.recruiter.interviews}?filter=today`} className="flex items-center justify-between group">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
            <Calendar className="h-4 w-4" /> Today&apos;s Interviews
          </div>
          <span className="font-medium text-[hsl(var(--foreground))] bg-[hsl(var(--muted)/0.5)] px-2 py-0.5 rounded-full text-xs">
            {metrics.interviewsToday}
          </span>
        </Link>
        
        <Link href={ROUTES.recruiter.dashboard} className="flex items-center justify-between group">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
            <CheckSquare className="h-4 w-4" /> Open Tasks
          </div>
          <span className="font-medium text-[hsl(var(--foreground))] bg-[hsl(var(--muted)/0.5)] px-2 py-0.5 rounded-full text-xs">
            12
          </span>
        </Link>
      </div>
    </div>
  );
}
