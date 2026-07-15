import * as React from "react";
import { Interview } from "../../types";
import { ROUTES } from "@/constants/routes";
import { MetricCard } from "@/components/cards/metric-card";
import { Button } from "@/components/ui/button";
import { CalendarRange, CalendarCheck, CalendarX, CalendarClock, Briefcase, Download, ActivitySquare } from "lucide-react";
import Link from "next/link";

interface InterviewHeroProps {
  interviews: Interview[];
}

export function InterviewHero({ interviews }: InterviewHeroProps) {
  
  const upcoming = interviews.filter(i => i.status === "SCHEDULED" || i.status === "CONFIRMED").length;
  const completed = interviews.filter(i => i.status === "COMPLETED").length;
  const rescheduled = interviews.filter(i => i.confirmationStatus === "RESCHEDULE_REQUESTED").length;
  const cancelled = interviews.filter(i => i.status === "CANCELLED" || i.status === "NO_SHOW").length;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] flex items-center gap-2">
            Interview Center
          </h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            Manage your upcoming interviews and meeting schedules.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild className="text-xs h-8">
            <Link href={ROUTES.candidate.jobs}><Briefcase className="h-3.5 w-3.5 mr-1.5" /> Browse Jobs</Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="text-xs h-8">
            <Link href={ROUTES.candidate.applications}><ActivitySquare className="h-3.5 w-3.5 mr-1.5" /> App Tracker</Link>
          </Button>
          <Button variant="primary" size="sm" className="text-xs h-8">
            <Download className="h-3.5 w-3.5 mr-1.5" /> Download Calendar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4">
        <MetricCard 
          title="Upcoming" 
          value={upcoming.toString()} 
          icon={CalendarRange} 
          iconColor="text-[hsl(var(--primary))]"
        />
        <MetricCard 
          title="Completed" 
          value={completed.toString()} 
          icon={CalendarCheck} 
          iconColor="text-[hsl(var(--success))]"
        />
        <MetricCard 
          title="Rescheduling" 
          value={rescheduled.toString()} 
          icon={CalendarClock} 
          iconColor="text-[hsl(var(--warning))]"
        />
        <MetricCard 
          title="Cancelled" 
          value={cancelled.toString()} 
          icon={CalendarX} 
          iconColor="text-[hsl(var(--danger))]"
        />
      </div>

    </div>
  );
}
