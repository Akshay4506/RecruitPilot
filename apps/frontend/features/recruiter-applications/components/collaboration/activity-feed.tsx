import * as React from "react";
import { Application } from "../../types";
import { Card } from "@/components/cards/card";
import { Activity } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

export function ActivityFeed({ application }: { application: Application }) {
  const recruiterEvents = application.timeline.filter(e => e.actor && e.actor.type === "RECRUITER");

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Recent Activity
        </h3>
      </div>
      
      {recruiterEvents.length > 0 ? (
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[hsl(var(--border))] before:to-transparent">
          {recruiterEvents.slice(0, 3).map((event) => (
            <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-[hsl(var(--background))] bg-[hsl(var(--muted-foreground))] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-2 rounded border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs text-[hsl(var(--foreground))]">{event.title}</span>
                </div>
                <div className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1">
                  {formatRelativeTime(event.timestamp)} by {event.actor?.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[hsl(var(--muted-foreground))] italic">No recent recruiter activity.</p>
      )}
    </Card>
  );
}
