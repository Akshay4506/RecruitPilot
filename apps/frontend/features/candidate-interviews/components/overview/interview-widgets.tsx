import * as React from "react";
import { Interview } from "../../types";
import { format, differenceInDays, isPast } from "date-fns";
import { Video, MapPin, Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface InterviewWidgetsProps {
  interviews: Interview[];
}

export function InterviewWidgets({ interviews }: InterviewWidgetsProps) {
  
  const upcoming = interviews
    .filter(i => (i.status === "SCHEDULED" || i.status === "CONFIRMED") && !isPast(new Date(i.date)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const nextInterview = upcoming[0];

  const completed = interviews
    .filter(i => i.status === "COMPLETED" || i.status === "CANCELLED" || i.status === "NO_SHOW")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      
      {/* Next Interview Widget */}
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--primary)/0.05)] rounded-full -translate-y-10 translate-x-10 blur-xl pointer-events-none" />
        
        <h3 className="font-semibold text-[hsl(var(--foreground))]">Up Next</h3>
        
        {nextInterview ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--primary))]">
                In {differenceInDays(new Date(nextInterview.date), new Date())} days
              </p>
              <h4 className="font-semibold text-[hsl(var(--foreground))] text-lg leading-tight">
                {nextInterview.jobTitle}
              </h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{nextInterview.companyName}</p>
            </div>

            <div className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>{format(new Date(nextInterview.date), "MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{format(new Date(nextInterview.date), "h:mm a")} ({nextInterview.durationMinutes}m)</span>
              </div>
              <div className="flex items-center gap-2">
                {nextInterview.meeting.platform === "IN_PERSON" ? (
                  <MapPin className="h-4 w-4 shrink-0" />
                ) : (
                  <Video className="h-4 w-4 shrink-0" />
                )}
                <span className="capitalize">{nextInterview.meeting.platform.replace("_", " ").toLowerCase()}</span>
              </div>
            </div>

            <Button className="w-full" asChild>
              <Link href={`/interviews/${nextInterview.id}`}>View Details</Link>
            </Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">No upcoming interviews</p>
          </div>
        )}
      </div>

      {/* Interview History Widget */}
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-semibold text-[hsl(var(--foreground))]">Recent History</h3>
        
        {completed.length > 0 ? (
          <div className="space-y-4">
            {completed.map(interview => (
              <div key={interview.id} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {interview.status === "COMPLETED" ? (
                    <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
                  ) : (
                    <XCircle className="h-4 w-4 text-[hsl(var(--danger))]" />
                  )}
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                    {interview.jobTitle}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                    <span>{format(new Date(interview.date), "MMM d")}</span>
                    <span>•</span>
                    <span className="truncate">{interview.companyName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[hsl(var(--muted-foreground))] text-center py-4">
            No past interviews found.
          </p>
        )}
      </div>

    </div>
  );
}
