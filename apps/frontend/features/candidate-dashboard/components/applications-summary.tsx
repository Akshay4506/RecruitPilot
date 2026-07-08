import * as React from "react";
import { MetricCard } from "@/components/cards/metric-card";
import { Skeleton } from "@/components/loaders/skeleton";
import { FileText, Clock, CalendarDays, CheckCircle2 } from "lucide-react";
import { mockApplications } from "../mock-data";

export function ApplicationsSummary() {
  const apps = mockApplications;
  
  // Calculate stats from mock data
  const totalActive = apps.filter(a => ["APPLIED", "SCREENING", "INTERVIEW", "TECHNICAL"].includes(a.status)).length;
  const underReview = apps.filter(a => ["APPLIED", "SCREENING"].includes(a.status)).length;
  const interviewing = apps.filter(a => ["INTERVIEW", "TECHNICAL"].includes(a.status)).length;
  const offers = apps.filter(a => a.status === "OFFER").length;
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Applications Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Active Applications"
          value={totalActive.toString()}
          icon={FileText}
          trend={2}
          trendLabel="this week"
        />
        <MetricCard
          title="Under Review"
          value={underReview.toString()}
          icon={Clock}
        />
        <MetricCard
          title="Interviews Scheduled"
          value={interviewing.toString()}
          icon={CalendarDays}
        />
        <MetricCard
          title="Offers Received"
          value={offers.toString()}
          icon={CheckCircle2}
        />
      </div>
    </div>
  );
}

export function ApplicationsSummarySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-40" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-5 rounded-md" />
            </div>
            <Skeleton className="h-7 w-12" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
