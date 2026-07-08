import * as React from "react";
import { Job } from "../../types";
import { Timeline } from "@/components/display/timeline";

export function PublishingHistorySection({ job }: { job: Job }) {
  if (job.publishingHistory.length === 0) return null;

  // Transform PublishingHistory to Timeline events
  const timelineEvents = job.publishingHistory.map((history) => ({
    id: history.id,
    title: `Status changed to ${history.status.replace("_", " ")}`,
    description: history.notes,
    timestamp: history.timestamp,
    status: (history.status === "PUBLISHED" ? "success" 
          : history.status === "ARCHIVED" || history.status === "CLOSED" ? "error"
          : history.status === "PAUSED" ? "warning"
          : "neutral") as "success" | "error" | "warning" | "neutral"
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">Publishing History</h3>
      <div className="p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <Timeline items={timelineEvents} />
      </div>
    </div>
  );
}
