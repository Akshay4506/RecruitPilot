import * as React from "react";
import { Job } from "../../types";
import { Building2, Sparkles } from "lucide-react";
import Link from "next/link";

interface RecommendedJobsProps {
  jobs: Job[];
}

export function RecommendedJobs({ jobs }: RecommendedJobsProps) {
  if (jobs.length === 0) return null;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4">
      <h3 className="font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" />
        Recommended for You
      </h3>
      
      <div className="space-y-4">
        {jobs.map(job => (
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
                {job.company.name} • {job.location.city}
              </div>
              <div className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1">
                {job.searchMetadata?.matchScore}% Match
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
