import * as React from "react";
import { Interview } from "../../types";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Video, Users, Download, UserPlus } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface InterviewDetailsHeroProps {
  interview: Interview;
}

export function InterviewDetailsHero({ interview }: InterviewDetailsHeroProps) {
  return (
    <div className="flex flex-col gap-6 border-b border-[hsl(var(--border))] pb-6">
      <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
        <Link href="/recruiter/interviews" className="hover:text-[hsl(var(--foreground))] transition-colors flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Interviews
        </Link>
        <span>/</span>
        <span>{interview.candidate.name}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex items-start gap-4">
          <Avatar src={interview.candidate.avatarUrl} name={interview.candidate.name} size="xl" />
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">{interview.candidate.name}</h1>
              <Badge variant="outline" className="border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)] text-[hsl(var(--primary))]">
                {interview.status.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] font-medium">{interview.candidate.jobTitle}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[hsl(var(--muted-foreground))] pt-2">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{format(new Date(interview.scheduledAt), "MMM d, h:mm a")} ({interview.durationMinutes}m)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Video className="h-3.5 w-3.5" />
                <span>{interview.meetingDetails?.platform.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span>Round {interview.round} of {interview.totalRounds}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="gap-2">
             <Download className="h-4 w-4" /> Resume
          </Button>
          <Button variant="outline" className="gap-2">
             <UserPlus className="h-4 w-4" /> Add Interviewer
          </Button>
          <Button className="gap-2" asChild>
             <Link href={`/recruiter/interviews/${interview.id}/evaluation`}>
               Evaluate Candidate
             </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
