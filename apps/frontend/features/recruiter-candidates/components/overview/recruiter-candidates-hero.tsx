import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Users, UserCheck, CalendarDays, Award } from "lucide-react";
import { RecruiterCandidate } from "../../types";

interface HeroProps {
  candidates: RecruiterCandidate[];
}

export function RecruiterCandidatesHero({ candidates }: HeroProps) {
  const activeCount = candidates.filter(c => c.status === "ACTIVE" || c.status === "PASSIVE").length;
  const interviewingCount = candidates.filter(c => c.status === "INTERVIEWING").length;
  const offeredCount = candidates.filter(c => c.status === "OFFERED").length;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[hsl(var(--border))] pb-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">Candidate Directory</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">Manage and evaluate your entire talent pool.</p>
        </div>
        
        <div className="flex flex-wrap gap-6 pt-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[hsl(var(--primary)/0.1)] rounded-md text-[hsl(var(--primary))]">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-[hsl(var(--foreground))]">{candidates.length}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Total Candidates</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[hsl(var(--success)/0.1)] rounded-md text-[hsl(var(--success))]">
              <UserCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-[hsl(var(--foreground))]">{activeCount}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Active Pipeline</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[hsl(var(--warning)/0.1)] rounded-md text-[hsl(var(--warning))]">
              <CalendarDays className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-[hsl(var(--foreground))]">{interviewingCount}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Interviewing</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[hsl(var(--info)/0.1)] rounded-md text-[hsl(var(--info))]">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-[hsl(var(--foreground))]">{offeredCount}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Offers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" /> Import Resume
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Candidate
        </Button>
      </div>
    </div>
  );
}
