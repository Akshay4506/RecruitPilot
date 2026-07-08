import * as React from "react";
import { Card, CardContent } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/loaders/skeleton";
import { EmptyState } from "@/components/display/empty-state";
import { MapPin, Briefcase, Bookmark, ChevronRight, Zap } from "lucide-react";
import { mockRecommendedJobs } from "../mock-data";

export function RecommendedJobs() {
  const jobs = mockRecommendedJobs;

  if (jobs.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Recommended Jobs</h3>
        </div>
        <EmptyState
          icon={Briefcase}
          title="No recommendations yet"
          description="Complete your profile to get personalized job recommendations."
          action={{
            label: "Complete Profile",
            onClick: () => {}
          }}
          className="py-12 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl"
        />
      </div>
    );
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumSignificantDigits: 3 }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Recommended Jobs</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Based on your skills and experience</p>
        </div>
        <Button variant="ghost" size="sm" className="text-xs h-8 font-medium">
          View all recommendations <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {jobs.map(job => (
          <Card key={job.id} className="flex flex-col transition-shadow hover:shadow-md">
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center text-xs font-bold text-[hsl(var(--muted-foreground))] overflow-hidden border border-[hsl(var(--border))]">
                    {/* Placeholder for company logo */}
                    {job.companyId.substring(5).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[hsl(var(--foreground))] leading-tight">{job.title}</h4>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{job.companyId}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[hsl(var(--muted-foreground))] mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span className="capitalize">{job.type.replace("_", "-").toLowerCase()}</span>
                </div>
                {job.salaryRange && (
                  <div className="flex items-center gap-1.5 font-medium text-[hsl(var(--foreground))]">
                    <span>{formatCurrency(job.salaryRange.min, job.salaryRange.currency)} - {formatCurrency(job.salaryRange.max, job.salaryRange.currency)}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                {job.isRemote && <Badge variant="outline" className="bg-[hsl(var(--info-bg))] text-[hsl(var(--info))] border-none font-medium">Remote</Badge>}
                {job.skills.slice(0, 3).map(skill => (
                  <Badge key={skill} variant="outline" className="text-[hsl(var(--muted-foreground))] font-normal">{skill}</Badge>
                ))}
              </div>

              <Button size="sm" className="w-full mt-auto">
                <Zap className="h-3.5 w-3.5 mr-1.5" /> Quick Apply
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function RecommendedJobsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-5 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-5 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8 rounded-md shrink-0" />
              </div>
              <div className="flex gap-4 mb-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex gap-1.5 mb-5">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-9 w-full rounded-md mt-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
