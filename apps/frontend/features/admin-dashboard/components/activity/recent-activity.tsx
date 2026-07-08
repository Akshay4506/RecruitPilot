import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Timeline, TimelineItemStatus, TimelineItem } from "@/components/display/timeline";
import { ActivityTimelineItem } from "../../types";
import { ActivitySquare, User, Briefcase, Settings, CreditCard, Box } from "lucide-react";

interface RecentActivityProps {
  activities: ActivityTimelineItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "USER": return User;
      case "JOB": return Briefcase;
      case "SYSTEM": return Settings;
      case "BILLING": return CreditCard;
      case "WORKSPACE": return Box;
      default: return undefined;
    }
  };

  const getVariant = (type: string): TimelineItemStatus => {
    switch (type) {
      case "USER": return "info";
      case "JOB": return "success";
      case "SYSTEM": return "neutral";
      case "BILLING": return "warning";
      case "WORKSPACE": return "info";
      default: return "neutral";
    }
  };

  const mappedItems: TimelineItem[] = activities.map(item => ({
    id: item.id,
    title: item.title,
    timestamp: item.timestamp,
    description: `Actor: ${item.actor}`,
    icon: getIcon(item.type),
    status: getVariant(item.type)
  }));

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <ActivitySquare className="h-4 w-4 text-[hsl(var(--primary))]" /> Global Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex-1">
        <Timeline items={mappedItems} timestampFormat="absolute" />
      </CardContent>
    </Card>
  );
}
