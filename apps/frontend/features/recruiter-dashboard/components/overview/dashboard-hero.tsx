import * as React from "react";
import { RecruiterDashboard } from "../../types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface DashboardHeroProps {
  dashboard: RecruiterDashboard;
}

export function DashboardHero({ dashboard }: DashboardHeroProps) {
  const currentHour = new Date().getHours();
  let greeting = "Good evening";
  if (currentHour < 12) greeting = "Good morning";
  else if (currentHour < 18) greeting = "Good afternoon";

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--primary)/0.05)] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <p className="text-sm font-medium text-[hsl(var(--primary))] mb-1">
          {format(new Date(), "EEEE, MMMM do, yyyy")}
        </p>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] mb-2">
          {greeting}, {dashboard.recruiterName.split(" ")[0]}!
        </h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          Here is what&apos;s happening at <span className="font-medium text-[hsl(var(--foreground))]">{dashboard.companyName}</span> today.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 relative z-10">
        <Button variant="primary" asChild>
          <Link href={ROUTES.recruiter.jobNew}>
            <Plus className="h-4 w-4 mr-2" /> Create Job
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={ROUTES.recruiter.applications}>
            <Users className="h-4 w-4 mr-2" /> Applications
          </Link>
        </Button>
      </div>
    </div>
  );
}
