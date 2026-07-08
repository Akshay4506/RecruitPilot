import * as React from "react";
import { Job } from "../../types";
import { Briefcase, CheckCircle2, Gift } from "lucide-react";

interface JobOverviewProps {
  job: Job;
}

export function JobOverview({ job }: JobOverviewProps) {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-8">
      
      {/* Summary */}
      <section>
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-[hsl(var(--primary))]" />
          About the Role
        </h2>
        <div className="text-[hsl(var(--muted-foreground))] leading-relaxed whitespace-pre-wrap">
          {job.summary}
        </div>
      </section>

      {/* Responsibilities */}
      {job.responsibilities.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">What You'll Do</h2>
          <ul className="space-y-3">
            {job.responsibilities.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]">
                <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))]" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Requirements */}
      {job.requirements.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[hsl(var(--primary))]" />
            What We're Looking For
          </h2>
          <ul className="space-y-3">
            {job.requirements.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]">
                <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))]" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Benefits */}
      {job.benefits.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
            <Gift className="h-5 w-5 text-[hsl(var(--primary))]" />
            Perks & Benefits
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {job.benefits.map((item, i) => (
              <li key={i} className="flex items-start gap-3 bg-[hsl(var(--muted)/0.5)] p-3 rounded-lg border border-[hsl(var(--border))]">
                <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))] shrink-0" />
                <span className="text-sm text-[hsl(var(--foreground))]">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
}
