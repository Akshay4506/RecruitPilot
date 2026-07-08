import * as React from "react";
import { Interview } from "../../types";
import { InterviewCard } from "./interview-card";

interface InterviewListProps {
  interviews: Interview[];
}

export function InterviewList({ interviews }: InterviewListProps) {
  return (
    <div className="space-y-4">
      {interviews.map(inv => (
        <InterviewCard key={inv.id} interview={inv} />
      ))}
      
      {interviews.length === 0 && (
        <div className="text-center py-12 border border-[hsl(var(--border))] border-dashed rounded-lg text-[hsl(var(--muted-foreground))]">
          No interviews match your filters.
        </div>
      )}
    </div>
  );
}
