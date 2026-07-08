import * as React from "react";
import { Job } from "../../types";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, Briefcase, Activity } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface RecruiterJobsHeroProps {
  jobs: Job[];
}

export function RecruiterJobsHero({ jobs }: RecruiterJobsHeroProps) {
  const published = jobs.filter((j) => j.status === "PUBLISHED").length;
  const draft = jobs.filter((j) => j.status === "DRAFT").length;
  const archived = jobs.filter((j) => j.status === "ARCHIVED").length;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Job Management</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[hsl(var(--muted-foreground))]">
          <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {jobs.length} Total Jobs</span>
          <span>&bull;</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{published} Published</span>
          <span>&bull;</span>
          <span>{draft} Drafts</span>
          <span>&bull;</span>
          <span>{archived} Archived</span>
          <span>&bull;</span>
          <span className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
            <Activity className="w-4 h-4 mr-1" /> Hiring Velocity: High
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Upload className="w-4 h-4 mr-2" /> Import
        </Button>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
        <Button variant="primary" size="sm" asChild>
          <Link href={ROUTES.recruiter.jobNew}>
            <Plus className="w-4 h-4 mr-2" /> Create Job
          </Link>
        </Button>
      </div>
    </div>
  );
}
