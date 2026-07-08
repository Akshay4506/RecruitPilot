import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Activity, ShieldAlert, CheckCircle2 } from "lucide-react";
import { EvaluationSummary as EvaluationSummaryType } from "../../types";
import { Badge } from "@/components/ui/badge";

interface EvaluationSummaryProps {
  summary: EvaluationSummaryType;
}

export function EvaluationSummary({ summary }: EvaluationSummaryProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Activity className="h-4 w-4" /> Evaluation Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[hsl(var(--muted)/0.3)] p-3 rounded-lg border border-[hsl(var(--border))]">
            <div className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-semibold mb-1">Avg Score</div>
            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{summary.averageScore.toFixed(1)} <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">/ 5.0</span></div>
          </div>
          <div className="bg-[hsl(var(--muted)/0.3)] p-3 rounded-lg border border-[hsl(var(--border))]">
            <div className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-semibold mb-1">Variance</div>
            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{summary.variance.toFixed(2)}</div>
          </div>
          <div className="bg-[hsl(var(--muted)/0.3)] p-3 rounded-lg border border-[hsl(var(--border))]">
            <div className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-semibold mb-1">Highest</div>
            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{summary.highestScore.toFixed(1)}</div>
          </div>
          <div className="bg-[hsl(var(--muted)/0.3)] p-3 rounded-lg border border-[hsl(var(--border))]">
            <div className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-semibold mb-1">Lowest</div>
            <div className="text-2xl font-bold text-[hsl(var(--foreground))]">{summary.lowestScore.toFixed(1)}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-4 rounded-lg flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm font-semibold text-[hsl(var(--foreground))]">Consensus Recommendation</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Calculated from all submitted scorecards</div>
            </div>
            <Badge variant="outline" className={`text-xs px-2 py-1 border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.05)] text-[hsl(var(--success))]`}>
              {summary.consensusRecommendation.replace('_', ' ')}
            </Badge>
          </div>
          
          <div className="flex-1 space-y-2">
            {summary.vetoTriggered && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg border border-[hsl(var(--destructive)/0.3)] bg-[hsl(var(--destructive)/0.05)] text-sm text-[hsl(var(--destructive))]">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span className="font-semibold">Veto Triggered</span>
                <span className="text-[hsl(var(--foreground))]">by Lead Interviewer</span>
              </div>
            )}
            {summary.consensusAchieved && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg border border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.05)] text-sm text-[hsl(var(--success))]">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="font-semibold">Strong Consensus</span>
                <span className="text-[hsl(var(--foreground))]">Low score variance</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
