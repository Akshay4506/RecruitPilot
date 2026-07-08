import * as React from "react";
import { Application } from "../../types";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import { Star, Clock, Calendar, FileText, Briefcase, ExternalLink, Flag } from "lucide-react";
import Link from "next/link";

export function CandidateReviewHero({ application }: { application: Application }) {
  const { candidate, job, status, stage, matchScore, priority, appliedAt, assignment, interviews } = application;
  const upcomingInterview = interviews.find(i => i.status === "SCHEDULED");

  return (
    <div className="bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] px-6 py-6 sm:px-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex items-start gap-5">
          <Avatar src={candidate.avatarUrl} name={candidate.name} size="2xl" className="border-4 border-[hsl(var(--background))]" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">{candidate.name}</h1>
              {/* Prepare navigation to Candidate Workspace (Future Sprint) */}
              <Link href={`/recruiter/candidates/${candidate.id}`} className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))/80] flex items-center gap-1 text-sm font-medium transition-colors">
                View Profile <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
              <div className="flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))]">
                <Briefcase className="h-4 w-4 text-[hsl(var(--primary))]" />
                <Link href={`/recruiter/jobs/${job.id}`} className="hover:text-[hsl(var(--primary))] hover:underline font-medium text-[hsl(var(--foreground))]">
                  {job.title}
                </Link>
              </div>
              
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <Star className={`h-4 w-4 ${matchScore >= 90 ? "fill-[hsl(var(--success))] text-[hsl(var(--success))]" : "fill-[hsl(var(--warning))] text-[hsl(var(--warning))]"}`} />
                <span className={matchScore >= 90 ? "text-[hsl(var(--success))]" : "text-[hsl(var(--warning))]"}>{matchScore}% Match</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-sm">
                <Clock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                <span className="text-[hsl(var(--muted-foreground))]">Applied {formatRelativeTime(appliedAt)}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Badge variant={status === "REJECTED" ? "destructive" : status === "HIRED" ? "success" : "default"}>
                {status.replace("_", " ")}
              </Badge>
              <Badge variant="outline" className="bg-[hsl(var(--muted)/0.5)]">
                Stage: {stage}
              </Badge>
              {priority === "CRITICAL" || priority === "HIGH" ? (
                <Badge variant={priority === "CRITICAL" ? "destructive" : "warning"} className="gap-1">
                  <Flag className="h-3 w-3" /> Priority: {priority}
                </Badge>
              ) : null}
              {candidate.resumeVersion && (
                <Badge variant="outline" className="gap-1">
                  <FileText className="h-3 w-3" /> Resume: {candidate.resumeVersion}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end shrink-0">
          {assignment.recruiter && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[hsl(var(--muted-foreground))]">Assigned to:</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Avatar src={assignment.recruiter.avatarUrl} name={assignment.recruiter.name} size="xs" />
                {assignment.recruiter.name}
              </div>
            </div>
          )}
          {upcomingInterview && (
            <div className="flex items-center gap-2 text-sm bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] px-3 py-1.5 rounded-md border border-[hsl(var(--primary)/0.2)]">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Interview: {new Date(upcomingInterview.date).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
