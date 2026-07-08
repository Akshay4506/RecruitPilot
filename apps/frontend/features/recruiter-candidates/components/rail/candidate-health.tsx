import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Card } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

export function CandidateHealth({ candidate }: { candidate: RecruiterCandidate }) {
  const { health } = candidate;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider flex items-center gap-2">
        <Activity className="h-4 w-4" />
        Candidate Health
      </h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-[hsl(var(--border))]">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Overall Health</span>
          <Badge variant={health.overallHealth === "POOR" ? "destructive" : health.overallHealth === "FAIR" ? "warning" : "success"}>
            {health.overallHealth}
          </Badge>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-[hsl(var(--border))]">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Profile Completeness</span>
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">{health.profileCompleteness}%</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-[hsl(var(--border))]">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Response Rate</span>
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">{health.responseRate}%</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-[hsl(var(--border))]">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Resume Quality</span>
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">{health.resumeQualityScore}/100</span>
        </div>
      </div>
    </Card>
  );
}
