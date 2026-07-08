import * as React from "react";
import { Application } from "../../types";
import { HeartPulse, Target } from "lucide-react";
import { Progress } from "@/components/ui/primitives";

interface ApplicationHealthWidgetProps {
  application: Application;
}

export function ApplicationHealthWidget({ application }: ApplicationHealthWidgetProps) {
  const { insights } = application;
  const matchScore = insights.matchScore || 0;
  
  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-[hsl(var(--success))]";
    if (score >= 60) return "text-[hsl(var(--warning))]";
    return "text-[hsl(var(--danger))]";
  };

  const getHealthBg = (score: number) => {
    if (score >= 80) return "bg-[hsl(var(--success))]";
    if (score >= 60) return "bg-[hsl(var(--warning))]";
    return "bg-[hsl(var(--danger))]";
  };

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-5">
      <h3 className="font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
        <HeartPulse className="h-4 w-4 text-[hsl(var(--primary))]" />
        Application Health
      </h3>
      
      <div>
        <div className="flex justify-between items-end mb-2">
          <span className={`text-2xl font-bold ${getHealthColor(matchScore)}`}>{matchScore}%</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium">Overall Match</span>
        </div>
        <Progress value={matchScore} className={`h-2 [&>div]:${getHealthBg(matchScore)}`} />
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Resume Match</span>
          <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{insights.resumeMatchScore}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Profile Completion</span>
          <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{insights.profileCompletionScore}%</span>
        </div>
        
        {insights.missingSkills && insights.missingSkills.length > 0 && (
          <div className="pt-2">
            <span className="text-xs text-[hsl(var(--muted-foreground))] block mb-2">Missing Skills</span>
            <div className="flex flex-wrap gap-1">
              {insights.missingSkills.map(skill => (
                <span key={skill} className="text-[10px] font-medium text-[hsl(var(--danger))] bg-[hsl(var(--danger)/0.1)] px-1.5 py-0.5 rounded">{skill}</span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-[hsl(var(--border))]">
          <span className="text-xs text-[hsl(var(--muted-foreground))] block mb-1">Next Expected Stage</span>
          <p className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
            {insights.nextExpectedStage}
          </p>
        </div>
      </div>
    </div>
  );
}
