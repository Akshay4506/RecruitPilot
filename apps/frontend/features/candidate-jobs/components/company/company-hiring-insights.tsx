import * as React from "react";
import { Job } from "../../types";
import { Clock, Zap, Target, Users } from "lucide-react";

interface CompanyHiringInsightsProps {
  job: Job;
}

export function CompanyHiringInsights({ job }: CompanyHiringInsightsProps) {
  if (!job.company.hiringInsights) return null;
  const { averageResponseTimeDays, hiringVelocity, interviewDifficulty, candidatesApplied } = job.company.hiringInsights;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Hiring Insights</h2>
      
      <div className="grid grid-cols-2 gap-4">
        
        <div className="bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] rounded-lg p-4 text-center space-y-1">
          <div className="flex justify-center mb-2">
            <Clock className="h-5 w-5 text-[hsl(var(--info))]" />
          </div>
          <p className="text-xl font-bold text-[hsl(var(--foreground))]">{averageResponseTimeDays} days</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Avg. Response Time</p>
        </div>

        <div className="bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] rounded-lg p-4 text-center space-y-1">
          <div className="flex justify-center mb-2">
            <Zap className={`h-5 w-5 ${hiringVelocity === "FAST" ? "text-[hsl(var(--success))]" : hiringVelocity === "MEDIUM" ? "text-[hsl(var(--warning))]" : "text-[hsl(var(--danger))]"}`} />
          </div>
          <p className="text-xl font-bold text-[hsl(var(--foreground))] capitalize">{hiringVelocity.toLowerCase()}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Hiring Velocity</p>
        </div>

        <div className="bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] rounded-lg p-4 text-center space-y-1">
          <div className="flex justify-center mb-2">
            <Target className={`h-5 w-5 ${interviewDifficulty === "EASY" ? "text-[hsl(var(--success))]" : interviewDifficulty === "MEDIUM" ? "text-[hsl(var(--warning))]" : "text-[hsl(var(--danger))]"}`} />
          </div>
          <p className="text-xl font-bold text-[hsl(var(--foreground))] capitalize">{interviewDifficulty.toLowerCase()}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Interview Difficulty</p>
        </div>

        <div className="bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] rounded-lg p-4 text-center space-y-1">
          <div className="flex justify-center mb-2">
            <Users className="h-5 w-5 text-[hsl(var(--primary))]" />
          </div>
          <p className="text-xl font-bold text-[hsl(var(--foreground))]">{candidatesApplied}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Candidates Applied</p>
        </div>

      </div>
    </div>
  );
}
