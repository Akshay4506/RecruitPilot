import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/loaders/skeleton";
import { EmptyState } from "@/components/display/empty-state";
import { InterviewStatusChip } from "@/components/display/status-chip";
import { CalendarDays, Clock, Video, ArrowRight } from "lucide-react";
import { mockInterviews, mockApplications } from "../mock-data";

export function UpcomingInterviews() {
  const interviews = mockInterviews.filter(i => i.status === "SCHEDULED" || i.status === "CONFIRMED");
  
  if (interviews.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={CalendarDays}
            title="No upcoming interviews"
            description="You don't have any interviews scheduled at the moment."
            action={{
              label: "Browse Jobs",
              onClick: () => {}
            }}
            className="py-8"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 flex-none flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Upcoming Interviews</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs h-8 text-[hsl(var(--primary))] font-medium -mr-2">
          View all <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="space-y-4">
          {interviews.map(interview => {
            const application = mockApplications.find(a => a.id === interview.applicationId);
            const date = new Date(interview.scheduledAt);
            const dateStr = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
            const timeStr = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
            
            return (
              <div key={interview.id} className="rounded-lg border border-[hsl(var(--border))] p-4 transition-colors hover:bg-[hsl(var(--muted)/0.3)]">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-sm text-[hsl(var(--foreground))]">{interview.title}</h4>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                      {application?.job?.companyId} • {application?.job?.title}
                    </p>
                  </div>
                  <InterviewStatusChip status={interview.status} />
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[hsl(var(--muted-foreground))] mb-4">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{dateStr}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{timeStr} ({interview.durationMinutes}m)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Video className="h-3.5 w-3.5" />
                    <span className="capitalize">{interview.type.toLowerCase()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {interview.participants.map(p => (
                      <div key={p.userId} className="h-6 w-6 rounded-full border-2 border-[hsl(var(--card))] overflow-hidden bg-[hsl(var(--muted))]">
                        {p.avatarUrl ? (
                          <img src={p.avatarUrl} alt={p.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[8px] font-medium bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
                            {p.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <Button size="sm" className="h-8 text-xs font-medium" disabled={!interview.meetingLink}>
                    Join Meeting
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function UpcomingInterviewsSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-16" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-[hsl(var(--border))] p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <div className="flex gap-4 mb-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
