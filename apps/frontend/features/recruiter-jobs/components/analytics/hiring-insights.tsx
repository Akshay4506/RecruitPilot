import * as React from "react";
import { Job } from "../../types";
import { Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

export function HiringInsights({ job }: { job: Job }) {
  if (job.health.reasons.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Smart Insights
      </h3>
      
      <div className="space-y-3">
        {job.health.reasons.map((reason, index) => {
          const isPositive = job.health.status === "HEALTHY";
          const Icon = isPositive ? CheckCircle2 : AlertTriangle;
          const colorClass = isPositive 
            ? "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800" 
            : "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800";
            
          return (
            <div key={index} className={`flex items-start gap-3 p-4 rounded-lg border ${colorClass}`}>
              <Icon className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{reason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
