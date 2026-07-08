import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Timeline, TimelineItem, TimelineItemStatus } from "@/components/display/timeline";
import { Card } from "@/components/cards/card";
import { User, Sparkles, LogIn, Mail, CheckCircle2, RotateCcw, FileText, CalendarDays } from "lucide-react";

export function CandidateTimeline({ candidate }: { candidate: RecruiterCandidate }) {
  const items: TimelineItem[] = candidate.timeline.map((event) => {
    let icon = User;
    let status: TimelineItemStatus = "neutral";
    let badgeStr: string | undefined;

    switch (event.type) {
      case "APPLICATION_SUBMITTED": icon = FileText; status = "success"; badgeStr = "Application"; break;
      case "RESUME_UPDATED": icon = FileText; status = "info"; badgeStr = "Resume"; break;
      case "DOCUMENT_UPLOADED": icon = FileText; status = "info"; badgeStr = "Document"; break;
      case "INTERVIEW_SCHEDULED": icon = CalendarDays; status = "warning"; badgeStr = "Interview"; break;
      case "INTERVIEW_RESCHEDULED": icon = CalendarDays; status = "warning"; badgeStr = "Interview"; break;
      case "NOTE_ADDED": icon = Mail; status = "warning"; badgeStr = "Note"; break;
      case "OFFER_SENT": icon = CheckCircle2; status = "success"; badgeStr = "Offer"; break;
      case "OFFER_ACCEPTED": icon = CheckCircle2; status = "success"; badgeStr = "Hired"; break;
      case "STAGE_CHANGE": icon = RotateCcw; status = "info"; badgeStr = "Stage"; break;
      case "STATUS_CHANGE": icon = CheckCircle2; status = "info"; badgeStr = "Status"; break;
      case "EMAIL_SENT": icon = Mail; status = "neutral"; badgeStr = "Email"; break;
      case "AI_INSIGHT": icon = Sparkles; status = "info"; badgeStr = "AI"; break;
      default: icon = LogIn; status = "neutral"; badgeStr = "System"; break;
    }

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
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg text-[hsl(var(--foreground))]">Unified 360° Activity Feed</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">All history across jobs</p>
      </div>
      <Timeline items={items} timestampFormat="relative" highlightFirst={true} />
    </Card>
  );
}
