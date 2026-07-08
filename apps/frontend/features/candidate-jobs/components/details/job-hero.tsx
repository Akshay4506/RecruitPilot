import * as React from "react";
import { Job } from "../../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, DollarSign, Clock, Users, Share2, Bookmark, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface JobHeroProps {
  job: Job;
  onApply?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

export function JobHero({ job, onApply, onSave, onShare }: JobHeroProps) {
  const formatSalary = (salary: Job["salary"]) => {
    if (salary.hideSalary) return "Salary hidden";
    const min = salary.min / 1000;
    const max = salary.max / 1000;
    return `$${min}k - $${max}k ${salary.interval === "YEARLY" ? "/yr" : ""}`;
  };

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 md:p-8 shadow-sm">
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-20 h-20 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0 shadow-sm">
            {job.company.logoUrl ? (
              <img src={job.company.logoUrl} alt={job.company.name} className="w-16 h-16 object-contain rounded-lg" />
            ) : (
              <Building2 className="h-10 w-10 text-[hsl(var(--muted-foreground))]" />
            )}
          </div>
          
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] tracking-tight">
              {job.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              <span className="font-semibold text-[hsl(var(--foreground))]">{job.company.name}</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location.city}, {job.location.state}
              </span>
              {job.publishedAt && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Posted {formatDistanceToNow(new Date(job.publishedAt), { addSuffix: true })}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {job.analytics.applicationsCount} applicants
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant="neutral" className="px-3 py-1 text-sm font-medium">{job.employmentType.replace("_", "-")}</Badge>
              <Badge variant="neutral" className="px-3 py-1 text-sm font-medium">{job.workMode}</Badge>
              <Badge variant="neutral" className="px-3 py-1 text-sm font-medium">{job.experienceLevel}</Badge>
              {!job.salary.hideSalary && (
                <Badge variant="neutral" className="px-3 py-1 text-sm font-medium bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success-foreground))] border-[hsl(var(--success)/0.2)]">
                  <DollarSign className="h-3.5 w-3.5 mr-1 inline-block" />
                  {formatSalary(job.salary)}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-stretch gap-3 shrink-0">
          <Button variant="primary" size="lg" className="flex-1 md:w-full gap-2" onClick={onApply} disabled={job.isApplied}>
            {job.isApplied ? (
              <><CheckCircle2 className="h-5 w-5"/> Applied</>
            ) : "Apply Now"}
          </Button>
          <div className="flex gap-2 w-full">
            <Button variant="outline" size="icon" onClick={onSave} className={`flex-1 md:w-auto h-11 ${job.isSaved ? 'text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)]' : ''}`}>
              <Bookmark className={`h-5 w-5 ${job.isSaved ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={onShare} className="flex-1 md:w-auto h-11">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
