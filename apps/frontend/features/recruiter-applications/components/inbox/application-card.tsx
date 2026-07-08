import * as React from "react";
import { Application } from "../../types";
import { Card } from "@/components/cards/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { Briefcase, MoreVertical, Star, FileText } from "lucide-react";
import Link from "next/link";

export function ApplicationCard({ application, onPreview }: { application: Application, onPreview: (app: Application) => void }) {
  const { candidate, job, status, stage, matchScore, appliedAt } = application;
  
  let statusVariant: "default" | "neutral" | "success" | "warning" | "destructive" | "outline" = "outline";
  switch (status) {
    case "HIRED": case "OFFER": statusVariant = "success"; break;
    case "NEW": statusVariant = "neutral"; break;
    case "UNDER_REVIEW": case "SHORTLISTED": case "INTERVIEW_SCHEDULED": statusVariant = "info" as any; break;
    case "REJECTED": case "WITHDRAWN": statusVariant = "destructive"; break;
  }

  return (
    <Card className="flex flex-col hover:border-[hsl(var(--primary)/0.5)] transition-colors group h-full">
      <div className="p-5 flex-1 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <Avatar src={candidate.avatarUrl} name={candidate.name} size="lg" />
            <div>
              <Link href={`/recruiter/applications/${application.id}`} className="font-semibold text-base hover:text-[hsl(var(--primary))] hover:underline text-[hsl(var(--foreground))] transition-colors">
                {candidate.name}
              </Link>
              <div className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-1.5 mt-0.5">
                <Briefcase className="h-3.5 w-3.5" />
                {candidate.experienceYears}y exp
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[hsl(var(--muted-foreground))]">Job</span>
            <span className="font-medium text-[hsl(var(--foreground))] truncate max-w-[150px]">{job.title}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[hsl(var(--muted-foreground))]">Stage</span>
            <span className="font-medium text-[hsl(var(--foreground))]">{stage}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[hsl(var(--muted-foreground))]">Match</span>
            <div className="flex items-center gap-1 font-medium text-[hsl(var(--success))]">
              <Star className="h-3.5 w-3.5 fill-[hsl(var(--success))]" />
              {matchScore}%
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant={statusVariant}>{status.replace("_", " ")}</Badge>
          {candidate.resumeVersion && (
            <Badge variant="outline" className="gap-1">
              <FileText className="h-3 w-3" />
              {candidate.resumeVersion}
            </Badge>
          )}
        </div>
      </div>

      <div className="bg-[hsl(var(--muted)/0.2)] border-t border-[hsl(var(--border))] p-3 flex items-center justify-between gap-2">
        <span className="text-xs text-[hsl(var(--muted-foreground))] pl-2">
          Applied {formatRelativeTime(appliedAt)}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onPreview(application)}>
            Preview
          </Button>
          <Button size="sm" asChild>
            <Link href={`/recruiter/applications/${application.id}`}>Review</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
