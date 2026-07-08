import * as React from "react";
import { Job } from "../../types";
import { JobStatusChip } from "../display/job-status-chip";
import { Button } from "@/components/ui/button";
import { Edit, Play, Pause, MapPin, Briefcase, DollarSign, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface RecruiterJobHeroProps {
  job: Job;
}

export function RecruiterJobHero({ job }: RecruiterJobHeroProps) {
  const isDraft = job.status === "DRAFT";
  const isPublished = job.status === "PUBLISHED";
  const isPaused = job.status === "PAUSED";

  const salaryString = job.salary.hideSalary 
    ? "Salary hidden" 
    : `${job.salary.currency} ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} / ${job.salary.interval.toLowerCase()}`;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--foreground))]">{job.title}</h1>
            <JobStatusChip status={job.status} />
          </div>

          <p className="text-base text-[hsl(var(--muted-foreground))] max-w-3xl">
            {job.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-[hsl(var(--foreground))]">
            <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1.5 text-[hsl(var(--muted-foreground))]" /> {job.department} &bull; {job.employmentType.replace("_", " ")}</span>
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5 text-[hsl(var(--muted-foreground))]" /> {job.location.city}, {job.location.country} ({job.workMode.replace("_", " ")})</span>
            <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1.5 text-[hsl(var(--muted-foreground))]" /> {salaryString}</span>
            <span className="flex items-center"><Globe className="w-4 h-4 mr-1.5 text-[hsl(var(--muted-foreground))]" /> Visibility: {job.visibility}</span>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-col lg:flex-row items-center gap-2 w-full md:w-auto shrink-0">
          <Button variant="outline" asChild>
            <Link href={ROUTES.recruiter.jobEdit(job.id)}>
              <Edit className="w-4 h-4 mr-2" /> Edit Job
            </Link>
          </Button>
          {isDraft || isPaused ? (
            <Button variant="primary">
              <Play className="w-4 h-4 mr-2" /> Publish
            </Button>
          ) : isPublished ? (
            <Button variant="secondary">
              <Pause className="w-4 h-4 mr-2" /> Pause
            </Button>
          ) : null}
          <Button variant="outline">
             View Live <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
