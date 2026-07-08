import * as React from "react";
import { format } from "date-fns";
import { Interview } from "../../types";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Video, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface InterviewCardProps {
  interview: Interview;
}

export function InterviewCard({ interview }: InterviewCardProps) {
  const isPending = interview.status === "PENDING_FEEDBACK";
  const isScheduled = interview.status === "SCHEDULED";
  
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:border-[hsl(var(--primary)/0.5)] transition-colors">
      <div className="flex-1 space-y-3 w-full">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar src={interview.candidate.avatarUrl} name={interview.candidate.name} size="md" />
            <div>
              <div className="font-bold text-[hsl(var(--foreground))]">{interview.candidate.name}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">{interview.candidate.jobTitle} • {interview.type.replace('_', ' ')} (Round {interview.round})</div>
            </div>
          </div>
          
          <Badge 
            variant="outline" 
            className={`
              ${isPending ? 'border-[hsl(var(--warning)/0.3)] bg-[hsl(var(--warning)/0.05)] text-[hsl(var(--warning))]' : ''}
              ${isScheduled ? 'border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.05)] text-[hsl(var(--success))]' : ''}
            `}
          >
            {interview.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
          <div className="flex items-center gap-1.5 bg-[hsl(var(--muted)/0.3)] px-2 py-1 rounded">
            <Clock className="h-3.5 w-3.5" />
            <span>{format(new Date(interview.scheduledAt), "MMM d, h:mm a")} ({interview.durationMinutes}m)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Video className="h-3.5 w-3.5" />
            <span>{interview.meetingDetails?.platform.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            <span>{interview.panel.length} Interviewers</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
        <Button variant="outline" className="flex-1 sm:flex-none">
          {isScheduled ? "Join Meeting" : "View Details"}
        </Button>
        <Button className="flex-1 sm:flex-none gap-2" asChild>
          <Link href={`/recruiter/interviews/${interview.id}`}>
            Workspace <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
