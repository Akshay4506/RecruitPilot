import * as React from "react";
import { Application } from "../../types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/primitives";
import { Building2, Calendar, FileText, UserCircle, Target, Video, MapPin } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { StatusChip } from "@/components/display/status-chip";

interface ApplicationCardProps {
  application: Application;
  onQuickView?: (application: Application) => void;
  onWithdraw?: (application: Application) => void;
}

export function ApplicationCard({ application, onQuickView, onWithdraw }: ApplicationCardProps) {
  
  const getStatusType = (status: Application["status"]) => {
    switch (status) {
      case "ACTIVE": return "info";
      case "WITHDRAWN": return "neutral";
      case "REJECTED": return "danger";
      case "HIRED": return "success";
      default: return "neutral";
    }
  };

  const stageLabel = application.stage.replace("_", " ");
  
  return (
    <div className="group bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative flex flex-col h-full overflow-hidden">
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4 items-start w-full">
          <div className="w-12 h-12 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0">
            {application.companyLogoUrl ? (
              <img src={application.companyLogoUrl} alt={application.companyName} className="w-10 h-10 object-contain rounded" />
            ) : (
              <Building2 className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-mono text-[hsl(var(--muted-foreground))] mb-0.5">{application.applicationNumber}</p>
                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors truncate">
                  <Link href={`/applications/${application.id}`}>{application.jobTitle}</Link>
                </h3>
              </div>
              <StatusChip variant={getStatusType(application.status) as any} label={application.status} className="shrink-0 ml-2" />
            </div>
            
            <div className="text-sm text-[hsl(var(--muted-foreground))] flex items-center flex-wrap gap-x-3 gap-y-1 mt-1">
              <span className="font-medium">{application.companyName}</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {application.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Applied {format(new Date(application.appliedAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5 bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] rounded-lg p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-[hsl(var(--foreground))]">Current Stage: <span className="text-[hsl(var(--primary))] capitalize">{stageLabel.toLowerCase()}</span></span>
          <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{application.progressPercentage}%</span>
        </div>
        <Progress value={application.progressPercentage} className="h-1.5" />
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-[hsl(var(--muted-foreground))] mb-5 flex-grow">
        
        {application.assignedRecruiter && (
          <div className="flex items-center gap-1.5 truncate">
            <UserCircle className="h-4 w-4 shrink-0" />
            <span className="truncate">Recruiter: {application.assignedRecruiter.name}</span>
          </div>
        )}
        
        <div className="flex items-center gap-1.5 truncate">
          <FileText className="h-4 w-4 shrink-0" />
          <span className="truncate">Resume: {application.resume.name}</span>
        </div>

        {application.interviews.length > 0 && (
          <div className="flex items-center gap-1.5 truncate text-[hsl(var(--foreground))] font-medium">
            <Video className="h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
            <span className="truncate">{application.interviews.length} Interview(s)</span>
          </div>
        )}

        {application.insights.matchScore && (
          <div className="flex items-center gap-1.5 truncate text-[hsl(var(--success))] font-medium">
            <Target className="h-4 w-4 shrink-0" />
            <span className="truncate">{application.insights.matchScore}% Match</span>
          </div>
        )}

      </div>

      <div className="pt-4 border-t border-[hsl(var(--border))] flex items-center justify-between mt-auto">
        <Button variant="ghost" size="sm" className="h-8 text-xs text-[hsl(var(--muted-foreground))]" onClick={() => onWithdraw?.(application)}>
          Withdraw
        </Button>
        <div className="flex items-center gap-2">
          {onQuickView && (
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => onQuickView(application)}>
              Quick View
            </Button>
          )}
          <Button variant="primary" size="sm" className="h-8 text-xs" asChild>
            <Link href={`/applications/${application.id}`}>Full Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ApplicationCardSkeleton() {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm h-[280px] flex flex-col">
      <div className="flex gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-[hsl(var(--muted))] animate-pulse shrink-0" />
        <div className="space-y-2 w-full">
          <div className="flex justify-between">
            <div className="h-5 w-1/2 bg-[hsl(var(--muted))] animate-pulse rounded" />
            <div className="h-5 w-20 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
          </div>
          <div className="h-4 w-3/4 bg-[hsl(var(--muted))] animate-pulse rounded" />
        </div>
      </div>
      
      <div className="mb-5 bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] rounded-lg p-3">
        <div className="h-3 w-1/3 bg-[hsl(var(--muted))] animate-pulse rounded mb-2" />
        <div className="h-1.5 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="h-3 w-3/4 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-3 w-5/6 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-3 w-2/3 bg-[hsl(var(--muted))] animate-pulse rounded" />
      </div>

      <div className="mt-auto pt-4 border-t border-[hsl(var(--border))] flex justify-between">
        <div className="h-8 w-20 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-8 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
