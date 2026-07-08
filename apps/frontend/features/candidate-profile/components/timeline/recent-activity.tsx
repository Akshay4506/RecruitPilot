import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Timeline, TimelineItem, TimelineSkeleton } from "@/components/display/timeline";

interface RecentActivityProps {
  activities: TimelineItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (!activities || activities.length === 0) return null;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline items={activities} timestampFormat="relative" highlightFirst />
      </CardContent>
    </Card>
  );
}

export function RecentActivitySkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="pb-4">
        <div className="h-5 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <TimelineSkeleton rows={3} />
      </CardContent>
    </Card>
  );
}
