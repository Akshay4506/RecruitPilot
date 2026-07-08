import * as React from "react";
import { Interview, TimelineEventActor } from "../../types";
import { Timeline, TimelineItemStatus, TimelineItem } from "@/components/display/timeline";
import { User, Shield, Cpu, Activity } from "lucide-react";

interface InterviewTimelineViewProps {
  interview: Interview;
}

export function InterviewTimelineView({ interview }: InterviewTimelineViewProps) {
  
  const getActorConfig = (actor: TimelineEventActor) => {
    switch (actor) {
      case "CANDIDATE":
        return {
          icon: User,
          status: "info" as TimelineItemStatus,
        };
      case "RECRUITER":
        return {
          icon: Shield,
          status: "success" as TimelineItemStatus,
        };
      case "SYSTEM":
        return {
          icon: Activity,
          status: "neutral" as TimelineItemStatus,
        };
      case "AI":
        return {
          icon: Cpu,
          status: "pending" as TimelineItemStatus,
        };
      default:
        return {
          icon: Activity,
          status: "neutral" as TimelineItemStatus,
        };
    }
  };

  const timelineItems: TimelineItem[] = interview.timeline.map(event => {
    const config = getActorConfig(event.actor);
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      timestamp: event.timestamp,
      status: config.status,
      icon: config.icon
    };
  });

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Scheduling History</h2>
      
      <div className="pt-2">
        <Timeline items={timelineItems} timestampFormat="absolute" />
      </div>
    </div>
  );
}
