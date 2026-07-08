import * as React from "react";
import { Card } from "@/components/cards/card";
import { Users, Eye, Filter, CalendarClock, UserCheck, Briefcase, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobSummaryWidgetProps {
  views: number;
  applications: number;
  interviews: number;
  offers: number;
  hires: number;
  timeOpenDays?: number;
  conversionRate: number; // overall conversion rate
  className?: string;
  variant?: "default" | "compact";
}

export function JobSummaryWidget({
  views,
  applications,
  interviews,
  offers,
  hires,
  timeOpenDays,
  conversionRate,
  className,
  variant = "default",
}: JobSummaryWidgetProps) {
  // Calculate percentages
  const qualifiedPct = applications > 0 ? Math.round(((applications - (applications * 0.3)) / applications) * 100) : 0; // Mock calculation for "qualified"
  const interviewPct = applications > 0 ? Math.round((interviews / applications) * 100) : 0;
  const offerPct = interviews > 0 ? Math.round((offers / interviews) * 100) : 0;
  const hirePct = offers > 0 ? Math.round((hires / offers) * 100) : 0;

  const metrics = [
    { label: "Views", value: views.toLocaleString(), icon: Eye, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Applications", value: applications.toLocaleString(), icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Qualified", value: `${qualifiedPct}%`, icon: Filter, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Interviewed", value: `${interviewPct}%`, icon: CalendarClock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Offered", value: `${offerPct}%`, icon: Briefcase, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Hired", value: `${hirePct}%`, icon: UserCheck, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  if (timeOpenDays !== undefined) {
    metrics.push({ label: "Time Open", value: `${timeOpenDays}d`, icon: Clock, color: "text-slate-500", bg: "bg-slate-500/10" });
  }

  metrics.push({ label: "Conversion", value: `${conversionRate}%`, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" });

  if (variant === "compact") {
    return (
      <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-4", className)}>
        {metrics.map((m, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1.5 mb-1">
              <m.icon className={cn("h-3.5 w-3.5", m.color)} />
              {m.label}
            </span>
            <span className="font-semibold text-[hsl(var(--foreground))]">{m.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card className={cn("p-6", className)}>
      <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-4">Performance Summary</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="flex flex-col space-y-2 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", m.bg)}>
              <m.icon className={cn("h-4 w-4", m.color)} />
            </div>
            <div>
              <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{m.label}</p>
              <p className="text-lg font-bold text-[hsl(var(--foreground))]">{m.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
