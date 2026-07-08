import * as React from "react";
import { PipelineMetric } from "../../types";
import { ROUTES } from "@/constants/routes";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface RecruitmentFunnelProps {
  pipeline: PipelineMetric[];
}

export function RecruitmentFunnel({ pipeline }: RecruitmentFunnelProps) {
  // Find the maximum count to scale the bars relative to the largest stage
  const maxCount = Math.max(...pipeline.map(p => p.count));

  const formatStage = (stage: string) => stage.replace("_", " ");

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Recruitment Funnel</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Pipeline health and conversion rates</p>
        </div>
        <Link href={ROUTES.recruiter.analytics} className="text-sm font-medium text-[hsl(var(--primary))] hover:underline">
          Full Report &rarr;
        </Link>
      </div>

      <div className="space-y-4 relative">
        {pipeline.map((stage, index) => {
          const percentageOfMax = (stage.count / maxCount) * 100;
          
          return (
            <div key={stage.stage} className="relative">
              <Link href={`/candidates?stage=${stage.stage}`} className="block group">
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-32 shrink-0 text-sm font-medium text-[hsl(var(--foreground))] capitalize truncate group-hover:text-[hsl(var(--primary))] transition-colors">
                    {formatStage(stage.stage).toLowerCase()}
                  </div>
                  
                  <div className="flex-1 h-8 bg-[hsl(var(--muted)/0.3)] rounded-r-md rounded-l-sm overflow-hidden flex items-center relative border border-[hsl(var(--border))] group-hover:border-[hsl(var(--primary)/0.5)] transition-colors">
                    <div 
                      className="h-full bg-[hsl(var(--primary)/0.15)] group-hover:bg-[hsl(var(--primary)/0.25)] transition-all"
                      style={{ width: `${Math.max(percentageOfMax, 2)}%` }} // Give at least a 2% width so it's visible
                    />
                    <span className="absolute left-3 text-sm font-semibold text-[hsl(var(--foreground))]">
                      {stage.count.toLocaleString()}
                    </span>
                  </div>

                  {index > 0 && (
                    <div className="w-20 shrink-0 text-right">
                      <div className="inline-flex items-center text-xs font-medium text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted)/0.5)] px-2 py-0.5 rounded-full">
                        {stage.conversionRateFromPrevious.toFixed(1)}% <ChevronRight className="h-3 w-3 ml-0.5" />
                      </div>
                    </div>
                  )}
                  {index === 0 && (
                    <div className="w-20 shrink-0 text-right">
                      <span className="text-xs text-[hsl(var(--muted-foreground))] px-2 py-0.5">Top of Funnel</span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
