"use client";

import * as React from "react";
import { AIInsight } from "../../types";
import { AlertTriangle, CheckCircle2, TrendingDown, Lightbulb } from "lucide-react";

interface AIInsightsProps {
  insights: AIInsight[];
}

export function AIInsights({ insights }: AIInsightsProps) {
  const getIcon = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return <AlertTriangle className="h-4 w-4 text-[hsl(var(--destructive))]" />;
      case "WARNING": return <TrendingDown className="h-4 w-4 text-[hsl(var(--warning))]" />;
      case "SUCCESS": return <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />;
      default: return <Lightbulb className="h-4 w-4 text-[hsl(var(--info))]" />;
    }
  };

  const getStyle = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "border-[hsl(var(--destructive)/0.2)] bg-[hsl(var(--destructive)/0.05)]";
      case "WARNING": return "border-[hsl(var(--warning)/0.2)] bg-[hsl(var(--warning)/0.05)]";
      case "SUCCESS": return "border-[hsl(var(--success)/0.2)] bg-[hsl(var(--success)/0.05)]";
      default: return "border-[hsl(var(--info)/0.2)] bg-[hsl(var(--info)/0.05)]";
    }
  };

  return (
    <div className="space-y-4">
      {insights.map(insight => (
        <div key={insight.id} className={`p-4 rounded-xl border ${getStyle(insight.severity)}`}>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">{getIcon(insight.severity)}</div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">{insight.title}</h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{insight.description}</p>
              {insight.suggestedAction && (
                <div className="mt-2 text-xs font-medium text-[hsl(var(--foreground))] bg-[hsl(var(--background))] inline-block px-2 py-1 rounded border border-[hsl(var(--border))]">
                  Action: {insight.suggestedAction}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
