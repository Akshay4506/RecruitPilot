import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Timeline, TimelineSkeleton } from "@/components/display/timeline";
import { mockTimelineEvents } from "../mock-data";

export function ActivityTimeline() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline items={mockTimelineEvents} className="mt-2" />
      </CardContent>
    </Card>
  );
}

export function ActivityTimelineSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="h-5 w-32 bg-[hsl(var(--muted))] rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <TimelineSkeleton rows={3} />
      </CardContent>
    </Card>
  );
}
