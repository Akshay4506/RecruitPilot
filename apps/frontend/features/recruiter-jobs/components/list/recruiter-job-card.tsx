import * as React from "react";
import { Job } from "../../types";
import { Card } from "@/components/cards/card";
import { Avatar } from "@/components/ui/avatar";
import { JobStatusChip } from "../display/job-status-chip";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock, Users, MoreVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { JobSummaryWidget } from "@/components/analytics/job-summary-widget";

interface RecruiterJobCardProps {
  job: Job;
  onPreview: (job: Job) => void;
}

export function RecruiterJobCard({ job, onPreview }: RecruiterJobCardProps) {
  return (
    <Card className="flex flex-col border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] transition-colors overflow-hidden relative">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
              <Link href={ROUTES.recruiter.job(job.id)}>{job.title}</Link>
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2 mt-1">
              {job.department} <span className="opacity-50">&bull;</span> {job.location.city}, {job.location.country}
            </p>
          </div>
          <JobStatusChip status={job.status} />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[hsl(var(--muted-foreground))] mb-6">
          <span className="flex items-center"><Briefcase className="h-3.5 w-3.5 mr-1" /> {job.employmentType.replace("_", " ")}</span>
          <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1" /> {job.workMode.replace("_", " ")}</span>
          <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> {job.publishedAt ? formatDistanceToNow(new Date(job.publishedAt), { addSuffix: true }) : "Not published"}</span>
        </div>

        {/* Compact summary widget */}
        <JobSummaryWidget
          variant="compact"
          views={job.analytics.viewsCount}
          applications={job.analytics.applicationsCount}
          interviews={job.analytics.interviewsCount}
          offers={job.analytics.offersCount}
          hires={job.analytics.hiresCount}
          conversionRate={job.analytics.conversionRate}
          className="mb-6 p-3 bg-[hsl(var(--muted)/0.3)] rounded-lg"
        />

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 mr-2">
            {job.hiringTeam.slice(0, 3).map((member) => (
              <Avatar key={member.id} src={member.avatarUrl} alt={member.name} name={member.name} size="sm" className="border-2 border-[hsl(var(--card))]" />
            ))}
          </div>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            Hiring Team
          </span>
        </div>
      </div>

      <div className="bg-[hsl(var(--muted)/0.2)] border-t border-[hsl(var(--border))] p-3 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={ROUTES.recruiter.applications + "?job=" + job.id}>
              <Users className="h-3.5 w-3.5 mr-1.5" /> View Candidates
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onPreview(job)}>
            Preview
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
