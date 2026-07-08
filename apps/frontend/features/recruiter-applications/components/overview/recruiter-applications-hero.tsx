import * as React from "react";
import { Application } from "../../types";
import { Button } from "@/components/ui/button";
import { Download, Users, PlayCircle } from "lucide-react";

export function RecruiterApplicationsHero({ applications }: { applications: Application[] }) {
  const newApps = applications.filter(a => a.status === "NEW").length;
  const underReview = applications.filter(a => a.status === "UNDER_REVIEW").length;
  const shortlisted = applications.filter(a => a.status === "SHORTLISTED").length;

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">Application Inbox</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">Review candidates, manage statuses, and build your pipeline.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-[hsl(var(--foreground))]">
            <Users className="h-4 w-4 text-[hsl(var(--primary))]" />
            <span className="font-medium">{applications.length} Total</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[hsl(var(--border))]" />
          <div className="flex items-center gap-1.5 text-[hsl(var(--success))]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--success))] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--success))]"></span>
            </span>
            <span className="font-medium">{newApps} New</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[hsl(var(--border))]" />
          <div className="flex items-center gap-1.5 text-[hsl(var(--warning))]">
            <span className="font-medium">{underReview} Pending Review</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[hsl(var(--border))]" />
          <div className="flex items-center gap-1.5 text-[hsl(var(--info))]">
            <span className="font-medium">{shortlisted} Shortlisted</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button variant="secondary" className="gap-2">
          <Users className="h-4 w-4" />
          Assign
        </Button>
        <Button className="gap-2">
          <PlayCircle className="h-4 w-4" />
          Bulk Review
        </Button>
      </div>
    </div>
  );
}
