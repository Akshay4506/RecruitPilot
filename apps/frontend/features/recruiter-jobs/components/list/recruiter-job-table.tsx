import * as React from "react";
import { Job } from "../../types";
import { JobStatusChip } from "../display/job-status-chip";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { MoreHorizontal, ArrowUpDown, Circle, Users, Edit } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { formatDistanceToNow } from "date-fns";

interface RecruiterJobTableProps {
  jobs: Job[];
  onPreview: (job: Job) => void;
}

export function RecruiterJobTable({ jobs, onPreview }: RecruiterJobTableProps) {
  return (
    <div className="w-full overflow-x-auto bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted)/0.5)] border-b border-[hsl(var(--border))] uppercase">
          <tr>
            <th className="px-6 py-4 font-medium"><div className="flex items-center gap-1">Job Title <ArrowUpDown className="h-3 w-3" /></div></th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Health</th>
            <th className="px-6 py-4 font-medium">Hiring Team</th>
            <th className="px-6 py-4 font-medium"><div className="flex items-center gap-1">Apps <ArrowUpDown className="h-3 w-3" /></div></th>
            <th className="px-6 py-4 font-medium"><div className="flex items-center gap-1">Ints <ArrowUpDown className="h-3 w-3" /></div></th>
            <th className="px-6 py-4 font-medium">Published</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[hsl(var(--border))]">
          {jobs.map((job) => {
            const isHealthy = job.health.status === "HEALTHY";
            const isAging = job.health.status === "AGING";
            
            return (
              <tr key={job.id} className="hover:bg-[hsl(var(--muted)/0.2)] transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                    <Link href={ROUTES.recruiter.job(job.id)}>{job.title}</Link>
                  </div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">{job.department} &bull; {job.location.city}</div>
                </td>
                <td className="px-6 py-4">
                  <JobStatusChip status={job.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5" title={job.health.reasons.join(", ")}>
                    <Circle className={`h-2.5 w-2.5 fill-current ${isHealthy ? "text-emerald-500" : isAging ? "text-amber-500" : "text-red-500"}`} />
                    <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
                      {isHealthy ? "Healthy" : isAging ? "Aging" : "Needs Attention"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {job.hiringTeam.slice(0, 3).map((member) => (
                      <Avatar key={member.id} src={member.avatarUrl} alt={member.name} name={member.name} size="sm" className="border-2 border-[hsl(var(--card))]" />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-[hsl(var(--foreground))]">
                  {job.analytics.applicationsCount}
                </td>
                <td className="px-6 py-4 font-medium text-[hsl(var(--foreground))]">
                  {job.analytics.interviewsCount}
                </td>
                <td className="px-6 py-4 text-[hsl(var(--muted-foreground))]">
                  {job.publishedAt ? formatDistanceToNow(new Date(job.publishedAt), { addSuffix: true }) : "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onPreview(job)}>
                      Preview
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={ROUTES.recruiter.applications + "?job=" + job.id} className="cursor-pointer">
                            <Users className="h-4 w-4 mr-2" />
                            View Candidates
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={ROUTES.recruiter.jobEdit(job.id)} className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Job
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
