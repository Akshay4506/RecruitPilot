import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Card } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Info, User, Calendar, Target, Hash } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

export function CandidateSummary({ candidate }: { candidate: RecruiterCandidate }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-[hsl(var(--primary))]" /> Professional Summary
          </h3>
          <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
            {candidate.personalInfo.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[hsl(var(--border))]">
            <div>
              <span className="block text-sm text-[hsl(var(--muted-foreground))] mb-1">Availability</span>
              <span className="font-medium text-[hsl(var(--foreground))]">{candidate.personalInfo.availability}</span>
            </div>
            <div>
              <span className="block text-sm text-[hsl(var(--muted-foreground))] mb-1">Notice Period</span>
              <span className="font-medium text-[hsl(var(--foreground))]">{candidate.personalInfo.noticePeriod}</span>
            </div>
            <div>
              <span className="block text-sm text-[hsl(var(--muted-foreground))] mb-1">Current Salary</span>
              <span className="font-medium text-[hsl(var(--foreground))]">{candidate.personalInfo.currentSalary || "Not Disclosed"}</span>
            </div>
            <div>
              <span className="block text-sm text-[hsl(var(--muted-foreground))] mb-1">Expected Salary</span>
              <span className="font-medium text-[hsl(var(--foreground))]">{candidate.personalInfo.expectedSalary || "Negotiable"}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="p-6 bg-[hsl(var(--muted)/0.3)] border-[hsl(var(--border))]">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Info className="h-4 w-4" /> Internal Metadata
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[hsl(var(--border))]">
              <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                <Target className="h-3.5 w-3.5" /> Priority
              </span>
              <Badge variant={candidate.metadata.priority === "CRITICAL" ? "destructive" : candidate.metadata.priority === "HIGH" ? "warning" : "neutral"}>
                {candidate.metadata.priority}
              </Badge>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-[hsl(var(--border))]">
              <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                <Hash className="h-3.5 w-3.5" /> Source
              </span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">{candidate.metadata.source}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-[hsl(var(--border))]">
              <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                <User className="h-3.5 w-3.5" /> Created By
              </span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">{candidate.metadata.createdBy}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-[hsl(var(--border))]">
              <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" /> Added
              </span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">{new Date(candidate.metadata.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-[hsl(var(--border))]">
              <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> Last Contact
              </span>
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">{formatRelativeTime(candidate.metadata.lastContactAt)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
