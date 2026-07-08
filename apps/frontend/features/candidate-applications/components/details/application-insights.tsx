import * as React from "react";
import { Application } from "../../types";
import { Lightbulb, Clock, Users, Activity } from "lucide-react";

interface ApplicationInsightsProps {
  application: Application;
}

export function ApplicationInsights({ application }: ApplicationInsightsProps) {
  const { insights } = application;
  
  if (!insights.probabilityScore) return null;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4">
      <h3 className="font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-[hsl(var(--warning))]" />
        Application Insights
      </h3>
      
      <div className="space-y-4 pt-1">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Activity className="h-4 w-4" /> Probability
          </div>
          <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{insights.probabilityScore}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Clock className="h-4 w-4" /> Next Update
          </div>
          <span className="text-sm font-semibold text-[hsl(var(--foreground))]">~{insights.estimatedNextUpdateDays} Days</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Users className="h-4 w-4" /> Competition
          </div>
          <span className={`text-sm font-semibold capitalize ${
            insights.competitionLevel === "HIGH" ? "text-[hsl(var(--danger))]" :
            insights.competitionLevel === "MEDIUM" ? "text-[hsl(var(--warning))]" :
            "text-[hsl(var(--success))]"
          }`}>{insights.competitionLevel?.toLowerCase()}</span>
        </div>

      </div>
    </div>
  );
}
