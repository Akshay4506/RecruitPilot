import * as React from "react";
import { GripVertical } from "lucide-react";

export function HiringStages() {
  const stages = [
    { id: "s1", name: "Applied", color: "bg-slate-100 dark:bg-slate-800" },
    { id: "s2", name: "Screening", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
    { id: "s3", name: "Technical", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" },
    { id: "s4", name: "Manager", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
    { id: "s5", name: "HR", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300" },
    { id: "s6", name: "Offer", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
    { id: "s7", name: "Hired", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-1">Hiring Pipeline Stages</h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Customize the interview stages for this role.</p>
        </div>
      </div>
      
      <div className="space-y-2">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center gap-3 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] group">
            <button className="cursor-grab active:cursor-grabbing text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <GripVertical className="h-4 w-4" />
            </button>
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[hsl(var(--muted))] text-xs font-medium">
              {index + 1}
            </div>
            <div className={`px-3 py-1 rounded-md text-sm font-medium ${stage.color}`}>
              {stage.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
