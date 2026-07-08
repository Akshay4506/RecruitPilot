import * as React from "react";
import { Job } from "../../types";

export function PipelineSummary({ job }: { job: Job }) {
  const p = job.pipeline;
  const stages = [
    { label: "Applied", value: p.applied, color: "bg-slate-200 dark:bg-slate-700" },
    { label: "Screening", value: p.screening, color: "bg-blue-200 dark:bg-blue-900/50" },
    { label: "Technical", value: p.technical, color: "bg-indigo-200 dark:bg-indigo-900/50" },
    { label: "Manager", value: p.manager, color: "bg-purple-200 dark:bg-purple-900/50" },
    { label: "HR", value: p.hr, color: "bg-pink-200 dark:bg-pink-900/50" },
    { label: "Offer", value: p.offer, color: "bg-amber-200 dark:bg-amber-900/50" },
    { label: "Hired", value: p.hired, color: "bg-emerald-200 dark:bg-emerald-900/50" },
  ];

  const maxVal = Math.max(...stages.map(s => s.value), 1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">Candidate Pipeline</h3>
        <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">{p.totalActive} Total Active</span>
      </div>
      
      <div className="space-y-3">
        {stages.map((stage) => {
          const width = Math.max((stage.value / maxVal) * 100, 2); // At least 2% to show the bar
          return (
            <div key={stage.label} className="relative h-10 w-full bg-[hsl(var(--muted)/0.3)] rounded-md overflow-hidden flex items-center group">
              <div 
                className={`absolute left-0 top-0 bottom-0 ${stage.color} transition-all duration-1000 ease-out`}
                style={{ width: `${width}%` }}
              />
              <div className="absolute inset-0 px-4 flex items-center justify-between">
                <span className="text-sm font-medium z-10">{stage.label}</span>
                <span className="text-sm font-bold z-10">{stage.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
