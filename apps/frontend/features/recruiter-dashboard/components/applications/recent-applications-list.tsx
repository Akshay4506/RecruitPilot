import * as React from "react";
import { RecentApplication } from "../../types";
import { Avatar } from "@/components/ui/avatar";
import { ApplicationStatusChip } from "@/components/display/status-chip";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

interface RecentApplicationsListProps {
  applications: RecentApplication[];
}

export function RecentApplicationsList({ applications }: RecentApplicationsListProps) {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Recent Applications</h2>
        <Link href={ROUTES.recruiter.applications} className="text-sm font-medium text-[hsl(var(--primary))] hover:underline">
          View All &rarr;
        </Link>
      </div>

      <div className="space-y-3">
        {applications.map(app => (
          <Link key={app.id} href={ROUTES.recruiter.application(app.id)} className="block group">
            <div className="flex items-center justify-between gap-3 p-4 rounded-lg border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] hover:bg-[hsl(var(--muted)/0.2)] transition-all">
              
              <div className="flex items-center gap-3 min-w-0">
                <Avatar 
                  src={app.candidateAvatarUrl} 
                  name={app.candidateName} 
                  className="h-10 w-10 shrink-0 border border-[hsl(var(--border))]"
                />
                <div className="min-w-0 flex flex-col">
                  <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm truncate group-hover:text-[hsl(var(--primary))] transition-colors">
                    {app.candidateName}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] mt-0.5 truncate">
                    <span className={`font-semibold ${app.matchScore >= 90 ? 'text-[hsl(var(--success))]' : 'text-[hsl(var(--primary))]'}`}>
                      {app.matchScore}% Match
                    </span>
                    <span>•</span>
                    <span className="truncate">{app.jobTitle}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:block">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <ApplicationStatusChip status={app.status as any} />
                </div>
                <ChevronRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] shrink-0" />
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
