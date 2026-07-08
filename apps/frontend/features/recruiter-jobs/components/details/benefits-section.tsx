import * as React from "react";
import { Job } from "../../types";
import { CheckCircle2 } from "lucide-react";

export function BenefitsSection({ job }: { job: Job }) {
  if (job.benefits.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Benefits & Perks</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {job.benefits.map((benefit) => (
          <div key={benefit.id} className="flex items-start gap-3 p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[hsl(var(--foreground))]">{benefit.title}</p>
              {benefit.description && (
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">
                  {benefit.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
