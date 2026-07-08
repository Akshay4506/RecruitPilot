import * as React from "react";
import { Application } from "../../types";
import { Video, Clock, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ApplicationInterviewsProps {
  application: Application;
}

export function ApplicationInterviews({ application }: ApplicationInterviewsProps) {
  if (!application.interviews || application.interviews.length === 0) return null;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
        <Video className="h-5 w-5 text-[hsl(var(--primary))]" />
        Interviews
      </h2>
      
      <div className="space-y-4">
        {application.interviews.map(interview => {
          const isUpcoming = interview.status === "UPCOMING";
          const date = new Date(interview.date);
          
          return (
            <div key={interview.id} className="flex flex-col sm:flex-row justify-between p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)] gap-4">
              
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 border ${isUpcoming ? 'bg-[hsl(var(--card))] border-[hsl(var(--primary)/0.3)] shadow-sm' : 'bg-[hsl(var(--muted))] border-transparent'}`}>
                  <span className={`text-[10px] font-bold uppercase ${isUpcoming ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`}>{format(date, "MMM")}</span>
                  <span className={`text-lg font-bold leading-none ${isUpcoming ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))]'}`}>{format(date, "dd")}</span>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[hsl(var(--foreground))]">{interview.title}</h3>
                    <Badge variant={isUpcoming ? "default" : "neutral"} className="text-[10px] py-0">{interview.status}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[hsl(var(--muted-foreground))]">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {format(date, "h:mm a")} ({interview.durationMinutes} min)</span>
                    <span className="flex items-center gap-1.5"><Video className="h-3.5 w-3.5" /> {interview.type}</span>
                  </div>
                </div>
              </div>

              {isUpcoming && interview.meetingLink && (
                <div className="sm:self-center shrink-0 mt-2 sm:mt-0">
                  <Button variant="primary" size="sm" asChild className="w-full sm:w-auto h-9">
                    <a href={interview.meetingLink} target="_blank" rel="noreferrer">
                      Join Meeting <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                    </a>
                  </Button>
                </div>
              )}
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
