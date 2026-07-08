import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Users, AlertTriangle } from "lucide-react";
import { EvaluationSummary as EvaluationSummaryType } from "../../types";

interface ConsensusPanelProps {
  summary: EvaluationSummaryType;
}

export function ConsensusPanel({ summary }: ConsensusPanelProps) {
  // Mocking score distribution
  const distribution = [
    { label: "Strong Hire", count: 1, color: "bg-[hsl(var(--success))]" },
    { label: "Hire", count: 2, color: "bg-[hsl(var(--success)/0.7)]" },
    { label: "Lean Hire", count: 1, color: "bg-[hsl(var(--success)/0.4)]" },
    { label: "Neutral", count: 0, color: "bg-[hsl(var(--muted-foreground))]" },
    { label: "No Hire", count: 0, color: "bg-[hsl(var(--destructive)/0.5)]" },
  ];
  const maxCount = Math.max(...distribution.map(d => d.count));

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))] flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Users className="h-4 w-4" /> Committee Consensus
        </CardTitle>
        <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">4/4 Scorecards Submitted</span>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Score Distribution</h4>
          <div className="flex items-end h-32 gap-2 border-b border-l border-[hsl(var(--border))] p-2">
            {distribution.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end group">
                <div 
                  className={`w-full rounded-t-sm transition-all group-hover:opacity-80 ${d.color}`} 
                  style={{ height: d.count > 0 ? `${(d.count / maxCount) * 100}%` : '4px', minHeight: '4px' }} 
                />
                <div className="text-[10px] text-center mt-2 text-[hsl(var(--muted-foreground))] truncate w-full group-hover:text-[hsl(var(--foreground))] transition-colors">
                  {d.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {summary.variance > 0.4 && (
          <div className="flex gap-3 p-3 rounded-lg border border-[hsl(var(--warning)/0.3)] bg-[hsl(var(--warning)/0.05)] text-[hsl(var(--warning))]">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <div className="text-sm space-y-1">
              <span className="font-semibold block">High Score Variance Detected</span>
              <span className="text-[hsl(var(--foreground))]">There is a significant difference between panel member scores. We recommend a sync meeting before final decision.</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
