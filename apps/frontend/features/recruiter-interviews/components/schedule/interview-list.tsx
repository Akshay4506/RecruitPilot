import * as React from "react";
import { Interview } from "../../types";
import { InterviewCard } from "./interview-card";
import { EmptyState } from "@/components/display/empty-state";

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
        <EmptyState
          type="interviews"
          title="No Interviews Found"
          description="No interviews match your current filters."
          className="border border-[hsl(var(--border))] border-dashed bg-[hsl(var(--card))]/50"
        />
      )}
    </div>
  );
}
