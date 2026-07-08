import * as React from "react";
import { Alert } from "@/components/feedback/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/loaders/skeleton";
import { Sparkles, ArrowRight } from "lucide-react";

export function TalentInsights() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Talent Insights</h3>
      
      <Alert 
        variant="info" 
        className="bg-gradient-to-r from-[hsl(var(--info-bg))] to-[hsl(var(--background))] border-l-4 border-l-[hsl(var(--info))] py-4"
      >
        <div className="flex gap-4">
          <div className="mt-0.5 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--info))/0.2]">
              <Sparkles className="h-4 w-4 text-[hsl(var(--info))]" aria-hidden="true" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1">
              High match potential for TechNova
            </h4>
            <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed mb-3">
              Your profile matches 95% of the requirements for the Staff Product Engineer position. Candidates with your skill overlap are 3x more likely to secure an interview.
            </p>
            <Button variant="secondary" size="sm" className="h-8 text-xs font-medium">
              Review Match Details <ArrowRight className="h-3 w-3 ml-1.5" />
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  );
}

export function TalentInsightsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-28" />
      <div className="rounded-xl border border-[hsl(var(--border))] p-4 flex gap-4">
        <Skeleton className="h-8 w-8 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[80%]" />
          <Skeleton className="h-8 w-36 mt-2" />
        </div>
      </div>
    </div>
  );
}
