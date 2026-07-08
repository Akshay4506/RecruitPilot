import * as React from "react";
import { RecruitmentInsight } from "../../types";
import { AlertCircle, AlertTriangle, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RecruitmentInsightsProps {
  insights: RecruitmentInsight[];
}

export function RecruitmentInsights({ insights }: RecruitmentInsightsProps) {
  if (insights.length === 0) return null;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[hsl(var(--foreground))]">Actionable Insights</h3>
        <span className="bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] text-xs px-2 py-0.5 rounded-full font-medium">
          {insights.length} Alerts
        </span>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => {
          
          let icon = <Info className="h-4 w-4 text-[hsl(var(--info))]" />;
          let containerClass = "bg-[hsl(var(--info)/0.05)] border border-[hsl(var(--info)/0.2)]";
          
          if (insight.severity === "WARNING") {
            icon = <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning))]" />;
            containerClass = "bg-[hsl(var(--warning)/0.05)] border border-[hsl(var(--warning)/0.2)]";
          } else if (insight.severity === "CRITICAL") {
            icon = <AlertCircle className="h-4 w-4 text-[hsl(var(--danger))]" />;
            containerClass = "bg-[hsl(var(--danger)/0.05)] border border-[hsl(var(--danger)/0.2)]";
          }

          return (
            <div key={insight.id} className={cn("p-4 rounded-lg space-y-3", containerClass)}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{icon}</div>
                <div className="space-y-1 flex-1 min-w-0">
                  <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm leading-tight">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] leading-snug">
                    {insight.description}
                  </p>
                </div>
              </div>
              
              {insight.actionLabel && (
                <div className="pl-7">
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-[hsl(var(--background))]" asChild>
                    <Link href={insight.actionUrl || "#"}>
                      {insight.actionLabel} <ArrowRight className="h-3 w-3 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
