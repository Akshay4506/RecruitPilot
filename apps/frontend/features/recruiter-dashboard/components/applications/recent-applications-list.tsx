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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] hover:bg-[hsl(var(--muted)/0.2)] transition-all">
              
              <div className="flex items-center gap-4 min-w-0">
                <Avatar 
                  src={app.candidateAvatarUrl} 
                  name={app.candidateName} 
                  className="h-10 w-10 border border-[hsl(var(--border))]"
                />
                <div className="min-w-0">
                  <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm truncate group-hover:text-[hsl(var(--primary))] transition-colors">
                    {app.candidateName}
                  </h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                    Applied for <span className="font-medium text-[hsl(var(--foreground))]">{app.jobTitle}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto">
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-0.5">Match</p>
                    <p className={`text-sm font-bold ${app.matchScore >= 90 ? 'text-[hsl(var(--success))]' : 'text-[hsl(var(--primary))]'}`}>
                      {app.matchScore}%
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-0.5">Applied</p>
                    <p className="text-xs font-medium text-[hsl(var(--foreground))]">
                      {formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}
                    </p>
                  </div>
                  <div>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <ApplicationStatusChip status={app.status as any} />
                  </div>
                </div>
                
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[hsl(var(--muted-foreground))]" asChild>
                  <div><ChevronRight className="h-4 w-4" /></div>
                </Button>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
