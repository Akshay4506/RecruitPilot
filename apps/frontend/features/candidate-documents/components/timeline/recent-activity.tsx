import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Timeline, TimelineItem } from "@/components/display/timeline";
import { Bot, User, Settings } from "lucide-react";

interface RecentActivityProps {
  activities: TimelineItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (!activities || activities.length === 0) return null;

  // Enhance the timeline items with custom icons based on actor type/name
  const enhancedActivities = activities.map(activity => {
    let Icon = activity.icon;
    
    if (!Icon && activity.actor) {
      if (activity.actor.name === "AI Engine" || activity.actor.name === "AI") {
        Icon = Bot;
      } else if (activity.actor.role === "System") {
        Icon = Settings;
      } else {
        Icon = User;
      }
    }
    
    return {
      ...activity,
      icon: Icon,
    };
  });

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline items={enhancedActivities} timestampFormat="relative" highlightFirst />
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
        <div className="space-y-6 relative pl-4">
          <div className="absolute left-6 top-6 bottom-0 w-px bg-[hsl(var(--border))]" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4 relative z-10">
              <div className="h-8 w-8 rounded-full bg-[hsl(var(--muted))] animate-pulse shrink-0" />
              <div className="space-y-2 flex-1 pt-1">
                <div className="h-4 w-3/4 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-3 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-3 w-1/2 bg-[hsl(var(--muted))] animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
