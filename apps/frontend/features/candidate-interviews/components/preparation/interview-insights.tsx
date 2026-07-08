import * as React from "react";
import { Interview } from "../../types";
import { Progress } from "@/components/ui/primitives";
import { CheckCircle2, AlertCircle, FileCheck2 } from "lucide-react";

interface InterviewInsightsProps {
  interview: Interview;
}

export function InterviewInsights({ interview }: InterviewInsightsProps) {
  
  const { preparationScore, profileMatchScore, interviewReadiness, documentsReady, reminderStatus } = interview.insights;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-6">
      <h3 className="font-semibold text-[hsl(var(--foreground))]">Insights & Readiness</h3>
      
      <div className="space-y-5">
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-[hsl(var(--foreground))]">Preparation Score</span>
            <span className="font-bold text-[hsl(var(--primary))]">{preparationScore}%</span>
          </div>
          <Progress value={preparationScore} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-[hsl(var(--foreground))]">Profile Match</span>
            <span className="font-bold text-[hsl(var(--primary))]">{profileMatchScore}%</span>
          </div>
          <Progress value={profileMatchScore} className="h-2" />
        </div>

        <div className="space-y-3 pt-3 border-t border-[hsl(var(--border))]">
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
              <CheckCircle2 className={`h-4 w-4 ${interviewReadiness === 'HIGH' ? 'text-[hsl(var(--success))]' : 'text-[hsl(var(--warning))]'}`} />
              Readiness
            </span>
            <span className="text-sm font-medium text-[hsl(var(--foreground))] capitalize">{interviewReadiness.toLowerCase()}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
              <FileCheck2 className={`h-4 w-4 ${documentsReady ? 'text-[hsl(var(--success))]' : 'text-[hsl(var(--danger))]'}`} />
              Documents
            </span>
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">{documentsReady ? 'Ready' : 'Missing'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-[hsl(var(--primary))]" />
              Reminders
            </span>
            <span className="text-sm font-medium text-[hsl(var(--foreground))] truncate max-w-[120px]">{reminderStatus}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
