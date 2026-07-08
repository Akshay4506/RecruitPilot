import * as React from "react";
import { Job } from "../../types";
import { Building2, Clock } from "lucide-react";
import Link from "next/link";

interface RecentlyViewedWidgetProps {
  jobs: Job[];
}

export function RecentlyViewedWidget({ jobs }: RecentlyViewedWidgetProps) {
  if (jobs.length === 0) return null;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4">
      <h3 className="font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
        <Clock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        Recently Viewed
      </h3>
      
      <div className="space-y-4">
        {jobs.slice(0, 3).map(job => (
          <div key={job.id} className="flex gap-3 group">
            <div className="w-10 h-10 rounded bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0">
              {job.company.logoUrl ? (
                <img src={job.company.logoUrl} alt={job.company.name} className="w-8 h-8 object-contain rounded-sm" />
              ) : (
                <Building2 className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/jobs/${job.id}`} className="block truncate text-sm font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                {job.title}
              </Link>
              <div className="text-xs text-[hsl(var(--muted-foreground))] truncate mt-0.5">
                {job.company.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
