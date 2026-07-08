import * as React from "react";
import { AssignedJob } from "../../types";
import { StatusChip } from "@/components/display/status-chip";
import { Progress } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface AssignedJobsTableProps {
  jobs: AssignedJob[];
}

export function AssignedJobsTable({ jobs }: AssignedJobsTableProps) {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Assigned Jobs</h2>
        <Link href={ROUTES.recruiter.jobs} className="text-sm font-medium text-[hsl(var(--primary))] hover:underline">
          View All &rarr;
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted)/0.3)] uppercase border-b border-[hsl(var(--border))]">
            <tr>
              <th className="px-4 py-3 font-medium rounded-tl-lg">Job Title</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Applications</th>
              <th className="px-4 py-3 font-medium hidden lg:table-cell">Days Open</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Progress</th>
              <th className="px-4 py-3 font-medium rounded-tr-lg text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--border))]">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-[hsl(var(--muted)/0.2)] transition-colors group">
                <td className="px-4 py-3">
                  <Link href={ROUTES.recruiter.job(job.id)} className="block">
                    <div className="font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                      {job.title}
                    </div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]">
                      {job.department} • HM: {job.hiringManager}
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 hidden md:table-cell font-medium">
                  {job.applicationsCount}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-[hsl(var(--muted-foreground))]">
                  {job.daysOpen}d
                </td>
                <td className="px-4 py-3">
                  <StatusChip 
                    variant={job.status === "PUBLISHED" ? "success" : job.status === "DRAFT" ? "warning" : "neutral"} 
                    label={job.status} 
                  />
                </td>
                <td className="px-4 py-3 hidden md:table-cell w-32">
                  <div className="flex items-center gap-2">
                    <Progress value={job.progressPercentage} className="h-1.5 flex-1" />
                    <span className="text-xs text-[hsl(var(--muted-foreground))] w-8">{job.progressPercentage}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-[hsl(var(--muted-foreground))]" asChild>
                    <Link href={ROUTES.recruiter.job(job.id)}>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
