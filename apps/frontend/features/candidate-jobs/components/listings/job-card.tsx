import * as React from "react";
import { Job } from "../../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, MapPin, Building2, Clock, Users, ArrowRight, Target, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Tooltip } from "@/components/ui/primitives";
import Link from "next/link";

interface JobCardProps {
  job: Job;
  onQuickView?: (job: Job) => void;
  onApply?: (job: Job) => void;
  onSave?: (job: Job) => void;
}

export function JobCard({ job, onQuickView, onApply, onSave }: JobCardProps) {
  
  const formatSalary = (salary: Job["salary"]) => {
    if (salary.hideSalary) return "Salary hidden";
    const min = salary.min / 1000;
    const max = salary.max / 1000;
    return `$${min}k - $${max}k ${salary.interval === "YEARLY" ? "/yr" : ""}`;
  };

  const isNew = job.publishedAt ? new Date(job.publishedAt) > new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) : false;

  return (
    <div className="group bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col h-full">
      {job.isApplied && (
        <div className="absolute top-0 right-0 bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> APPLIED
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0">
            {job.company.logoUrl ? (
              <img src={job.company.logoUrl} alt={job.company.name} className="w-10 h-10 object-contain rounded" />
            ) : (
              <Building2 className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                <Link href={`/jobs/${job.id}`}>{job.title}</Link>
              </h3>
              {isNew && <Badge className="bg-[hsl(var(--info))] text-[hsl(var(--info-foreground))] border-transparent">NEW</Badge>}
            </div>
            <div className="text-sm text-[hsl(var(--muted-foreground))] flex items-center flex-wrap gap-x-3 gap-y-1">
              <span className="font-medium">{job.company.name}</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.location.city}, {job.location.state}
              </span>
              {job.location.isRemote && (
                <Badge variant="outline" className="text-[10px] py-0 h-5">Remote</Badge>
              )}
            </div>
          </div>
        </div>
        
        <Tooltip content={job.isSaved ? "Unsave Job" : "Save Job"}>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 w-8 p-0 shrink-0 ${job.isSaved ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"}`}
            onClick={() => onSave?.(job)}
          >
            <Bookmark className={`h-4 w-4 ${job.isSaved ? "fill-current" : ""}`} />
          </Button>
        </Tooltip>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="neutral" className="font-normal">{job.employmentType.replace("_", "-")}</Badge>
        <Badge variant="neutral" className="font-normal">{job.experienceLevel}</Badge>
        {!job.salary.hideSalary && (
          <Badge variant="neutral" className="font-normal bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success-foreground))] hover:bg-[hsl(var(--success)/0.2)]">
            {formatSalary(job.salary)}
          </Badge>
        )}
      </div>

      <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2 mb-4 flex-grow">
        {job.summary}
      </p>

      {job.searchMetadata && job.searchMetadata.matchScore && (
        <div className="mb-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-2 py-1 rounded-md">
            <Target className="h-3.5 w-3.5" />
            {job.searchMetadata.matchScore}% Match
          </div>
          {job.searchMetadata.matchedSkills?.slice(0, 2).map(skill => (
            <span key={skill} className="text-xs text-[hsl(var(--muted-foreground))]">• {skill}</span>
          ))}
          {job.searchMetadata.matchedSkills && job.searchMetadata.matchedSkills.length > 2 && (
            <span className="text-xs text-[hsl(var(--muted-foreground))]">+{job.searchMetadata.matchedSkills.length - 2} more</span>
          )}
        </div>
      )}

      <div className="pt-4 border-t border-[hsl(var(--border))] flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
          {job.publishedAt && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDistanceToNow(new Date(job.publishedAt), { addSuffix: true })}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {job.analytics.applicationsCount} applicants
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {onQuickView && (
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => onQuickView(job)}>
              Preview
            </Button>
          )}
          <Button variant="primary" size="sm" className="h-8 text-xs gap-1" onClick={() => onApply?.(job)} disabled={job.isApplied}>
            {job.isApplied ? "Applied" : "Apply"}
            {!job.isApplied && <ArrowRight className="h-3 w-3" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm h-[280px] flex flex-col">
      <div className="flex gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-[hsl(var(--muted))] animate-pulse shrink-0" />
        <div className="space-y-2 w-full">
          <div className="h-5 w-3/4 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-4 w-1/2 bg-[hsl(var(--muted))] animate-pulse rounded" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-20 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
        <div className="h-6 w-24 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
        <div className="h-6 w-24 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-4 w-5/6 bg-[hsl(var(--muted))] animate-pulse rounded" />
      </div>
      <div className="mt-auto pt-4 border-t border-[hsl(var(--border))] flex justify-between">
        <div className="h-4 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-8 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
      </div>
    </div>
  );
}
