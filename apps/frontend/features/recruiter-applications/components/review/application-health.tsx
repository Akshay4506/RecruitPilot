import * as React from "react";
import { Application } from "../../types";
import { Card } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, ArrowRightCircle } from "lucide-react";

export function ApplicationHealth({ application }: { application: Application }) {
  const { health } = application;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider flex items-center gap-2">
        <Activity className="h-4 w-4" />
        Health Indicators
      </h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-[hsl(var(--border))]">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Risk Level</span>
          <Badge variant={health.riskLevel === "HIGH" ? "destructive" : health.riskLevel === "MEDIUM" ? "warning" : "success"}>
            {health.riskLevel}
          </Badge>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-[hsl(var(--border))]">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Days in Stage</span>
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">{health.daysInStage} days</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-[hsl(var(--border))]">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Total Age</span>
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">{health.totalAgeDays} days</span>
        </div>
        {health.responseTimeHours !== undefined && (
          <div className="flex justify-between items-center pb-2 border-b border-[hsl(var(--border))]">
            <span className="text-sm text-[hsl(var(--muted-foreground))]">Response Time</span>
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">{health.responseTimeHours}h avg</span>
          </div>
        )}
      </div>

      {health.riskFactors.length > 0 && (
        <div className="pt-2">
          <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase">Risk Factors</span>
          <div className="mt-2 space-y-2">
            {health.riskFactors.map((factor, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-[hsl(var(--danger))]">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                {factor}
              </div>
            ))}
          </div>
        </div>
      )}

      {health.expectedNextStage && (
        <div className="pt-4 mt-4 border-t border-[hsl(var(--border))]">
          <div className="flex items-center gap-2 text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] p-3 rounded-lg border border-[hsl(var(--primary)/0.2)]">
            <ArrowRightCircle className="h-5 w-5 shrink-0" />
            <div>
              <span className="text-xs font-semibold block uppercase">Expected Next Stage</span>
              <span className="text-sm font-medium">{health.expectedNextStage}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
