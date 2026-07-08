import * as React from "react";
import { User, UserActivity } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Timeline, TimelineItemStatus, TimelineItem } from "@/components/display/timeline";
import { Activity, LogIn, Lock, UserCog, Mail } from "lucide-react";

interface ActivityTimelineProps {
  user: User;
}

// Mocked activities for the detailed user view
const mockUserActivities: UserActivity[] = [
  { id: "ua1", action: "LOGIN", description: "Logged in successfully from new IP", timestamp: "2026-07-08T08:30:00Z" },
  { id: "ua2", action: "PROFILE_UPDATE", description: "Updated location to San Francisco, CA", timestamp: "2026-07-07T10:15:00Z" },
  { id: "ua3", action: "ROLE_CHANGE", description: "Role changed to ADMIN by john.smith@acme.corp", timestamp: "2026-06-20T14:00:00Z" },
  { id: "ua4", action: "PASSWORD_CHANGE", description: "Password was updated", timestamp: "2026-06-15T10:00:00Z" },
  { id: "ua5", action: "INVITE", description: "Invitation sent by System", timestamp: "2024-01-10T09:00:00Z" },
];

export function ActivityTimeline({ user }: ActivityTimelineProps) {
  const getIcon = (action: string) => {
    switch(action) {
      case "LOGIN": return LogIn;
      case "PASSWORD_CHANGE": return Lock;
      case "PROFILE_UPDATE":
      case "ROLE_CHANGE": return UserCog;
      case "INVITE": return Mail;
      default: return Activity;
    }
  };

  const getVariant = (action: string): TimelineItemStatus => {
    switch(action) {
      case "LOGIN": return "info";
      case "PASSWORD_CHANGE": return "warning";
      case "PROFILE_UPDATE": return "neutral";
      case "ROLE_CHANGE": return "success";
      case "INVITE": return "info";
      default: return "neutral";
    }
  };

  const mappedItems: TimelineItem[] = mockUserActivities.map(act => ({
    id: act.id,
    title: act.action.replace("_", " "),
    description: act.description,
    timestamp: act.timestamp,
    icon: getIcon(act.action),
    status: getVariant(act.action)
  }));

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Timeline items={mappedItems} timestampFormat="absolute" />
      </CardContent>
    </Card>
  );
}
