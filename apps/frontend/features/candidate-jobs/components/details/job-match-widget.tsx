import * as React from "react";
import { Job } from "../../types";
import { Target, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/primitives";

interface JobMatchWidgetProps {
  job: Job;
}

export function JobMatchWidget({ job }: JobMatchWidgetProps) {
  if (!job.searchMetadata) return null;
  const { matchScore, matchedSkills, missingSkills, experienceMatch, educationMatch } = job.searchMetadata;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
          <Target className="h-5 w-5 text-[hsl(var(--primary))]" />
        </div>
        <div>
          <h3 className="font-semibold text-[hsl(var(--foreground))]">Profile Match</h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Based on your skills & experience</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-2">
          <span className="text-2xl font-bold text-[hsl(var(--foreground))]">{matchScore}%</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium">Overall Match</span>
        </div>
        <Progress value={matchScore ?? 0} className="h-2" />
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Experience</span>
          {experienceMatch ? (
            <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
          ) : (
            <XCircle className="h-4 w-4 text-[hsl(var(--danger))]" />
          )}
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Education</span>
          {educationMatch ? (
            <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
          ) : (
            <XCircle className="h-4 w-4 text-[hsl(var(--danger))]" />
          )}
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm text-[hsl(var(--muted-foreground))] flex-shrink-0">Matched Skills</span>
          <div className="text-right flex flex-wrap justify-end gap-1">
            {matchedSkills?.map(s => (
              <span key={s} className="text-xs font-medium text-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)] px-1.5 py-0.5 rounded">{s}</span>
            ))}
          </div>
        </div>
        {missingSkills && missingSkills.length > 0 && (
          <div className="flex items-start justify-between gap-4">
            <span className="text-sm text-[hsl(var(--muted-foreground))] flex-shrink-0">Missing Skills</span>
            <div className="text-right flex flex-wrap justify-end gap-1">
              {missingSkills.map(s => (
                <span key={s} className="text-xs font-medium text-[hsl(var(--danger))] bg-[hsl(var(--danger)/0.1)] px-1.5 py-0.5 rounded">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
