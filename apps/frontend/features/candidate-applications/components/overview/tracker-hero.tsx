import * as React from "react";
import { Application } from "../../types";
import { ROUTES } from "@/constants/routes";
import { MetricCard } from "@/components/cards/metric-card";
import { Button } from "@/components/ui/button";
import { Briefcase, Activity, CalendarCheck, Award, FileText, Search, UserCircle } from "lucide-react";
import Link from "next/link";

interface TrackerHeroProps {
  applications: Application[];
}

export function TrackerHero({ applications }: TrackerHeroProps) {
  
  const total = applications.length;
  const active = applications.filter(a => a.status === "ACTIVE").length;
  const interviewing = applications.filter(a => a.stage === "INTERVIEW").length;
  const offers = applications.filter(a => a.stage === "OFFER" || a.status === "HIRED").length;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            Application Tracker
          </h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            Manage your active applications and track your hiring progress.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild className="text-xs h-8">
            <Link href={ROUTES.candidate.jobs}><Search className="h-3.5 w-3.5 mr-1.5" /> Browse Jobs</Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="text-xs h-8">
            <Link href={ROUTES.candidate.profile}><UserCircle className="h-3.5 w-3.5 mr-1.5" /> Complete Profile</Link>
          </Button>
          <Button variant="primary" size="sm" asChild className="text-xs h-8">
            <Link href={ROUTES.candidate.documents}><FileText className="h-3.5 w-3.5 mr-1.5" /> Upload Resume</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Applications" 
          value={total.toString()} 
          icon={Briefcase} 
        />
        <MetricCard 
          title="Active Applications" 
          value={active.toString()} 
          icon={Activity} 
          iconColor="text-[hsl(var(--primary))]" 
        />
        <MetricCard 
          title="Interviews" 
          value={interviewing.toString()} 
          icon={CalendarCheck} 
          iconColor="text-[hsl(var(--warning))]" 
        />
        <MetricCard 
          title="Offers" 
          value={offers.toString()} 
          icon={Award} 
          iconColor="text-[hsl(var(--success))]" 
        />
      </div>

    </div>
  );
}
