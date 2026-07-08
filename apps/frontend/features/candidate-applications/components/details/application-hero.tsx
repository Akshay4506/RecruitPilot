import * as React from "react";
import { Application } from "../../types";
import { Building2, Calendar, MapPin } from "lucide-react";
import { StatusChip } from "@/components/display/status-chip";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ApplicationHeroProps {
  application: Application;
}

export function ApplicationHero({ application }: ApplicationHeroProps) {
  
  const getStatusType = (status: Application["status"]) => {
    switch (status) {
      case "ACTIVE": return "info";
      case "WITHDRAWN": return "neutral";
      case "REJECTED": return "danger";
      case "HIRED": return "success";
      default: return "neutral";
    }
  };

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-20 h-20 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0 shadow-sm">
            {application.companyLogoUrl ? (
              <img src={application.companyLogoUrl} alt={application.companyName} className="w-16 h-16 object-contain rounded-lg" />
            ) : (
              <Building2 className="h-10 w-10 text-[hsl(var(--muted-foreground))]" />
            )}
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs font-mono text-[hsl(var(--muted-foreground))] mb-1">{application.applicationNumber}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] tracking-tight">
                {application.jobTitle}
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              <span className="font-semibold text-[hsl(var(--foreground))]">{application.companyName}</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {application.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Applied {format(new Date(application.appliedAt), "MMM d, yyyy")}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 items-center">
              <StatusChip variant={getStatusType(application.status) as any} label={application.status} />
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] ml-1">Current Stage: <span className="text-[hsl(var(--primary))] capitalize">{application.stage.replace("_", " ").toLowerCase()}</span></span>
            </div>
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-stretch gap-3 shrink-0">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/jobs/${application.jobId}`}>View Original Job</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
