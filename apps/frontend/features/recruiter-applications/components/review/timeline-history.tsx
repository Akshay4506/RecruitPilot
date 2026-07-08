import * as React from "react";
import { Application } from "../../types";
import { Timeline, TimelineItem, TimelineItemStatus } from "@/components/display/timeline";
import { Card } from "@/components/cards/card";
import { User, ShieldAlert, Sparkles, LogIn, Mail, CheckCircle2, RotateCcw } from "lucide-react";

export function TimelineHistory({ application }: { application: Application }) {
  const items: TimelineItem[] = application.timeline.map((event) => {
    let icon = User;
    let status: TimelineItemStatus = "neutral";
    let badgeStr: string | undefined;

    switch (event.type) {
      case "STATUS_CHANGE": icon = CheckCircle2; status = "success"; badgeStr = "Status"; break;
      case "STAGE_CHANGE": icon = RotateCcw; status = "info"; badgeStr = "Stage"; break;
      case "NOTE_ADDED": icon = Mail; status = "warning"; badgeStr = "Note"; break;
      case "INTERVIEW_SCHEDULED": icon = ShieldAlert; status = "warning"; badgeStr = "Interview"; break;
      case "SYSTEM_LOG": icon = LogIn; status = "neutral"; badgeStr = "System"; break;
      case "AI_INSIGHT": icon = Sparkles; status = "info"; badgeStr = "AI"; break;
      case "EMAIL_SENT": icon = Mail; status = "info"; badgeStr = "Email"; break;
    }

    // Set colors based on actor
    const actorColorMap = {
      CANDIDATE: "text-blue-500",
      RECRUITER: "text-green-500",
      SYSTEM: "text-slate-500",
      AI: "text-purple-500"
    };

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      timestamp: event.timestamp,
      status: status,
      icon: icon,
      badge: badgeStr,
      actor: event.actor ? {
        name: event.actor.name || event.actor.type,
        avatarSrc: event.actor.avatarUrl,
        role: event.actor.type
      } : undefined,
      metadata: event.metadata
    };
  });

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg text-[hsl(var(--foreground))] mb-6">Application History</h3>
      <Timeline items={items} timestampFormat="relative" highlightFirst={true} />
    </Card>
  );
}
