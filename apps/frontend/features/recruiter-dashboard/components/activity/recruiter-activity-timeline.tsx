import * as React from "react";
import { RecruiterActivityEvent, TimelineEventActor } from "../../types";
import { Timeline, TimelineItem, TimelineItemStatus } from "@/components/display/timeline";
import { ROUTES } from "@/constants/routes";
import { User, Shield, Cpu, Activity } from "lucide-react";
import Link from "next/link";

interface RecruiterActivityTimelineProps {
  events: RecruiterActivityEvent[];
}

export function RecruiterActivityTimeline({ events }: RecruiterActivityTimelineProps) {
  
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

  const timelineItems: TimelineItem[] = events.map(event => {
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
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Recent Activity</h2>
        <Link href={ROUTES.recruiter.dashboard} className="text-sm font-medium text-[hsl(var(--primary))] hover:underline">
          View All &rarr;
        </Link>
      </div>
      
      <div className="pt-2">
        <Timeline items={timelineItems} timestampFormat="relative" />
      </div>
    </div>
  );
}
