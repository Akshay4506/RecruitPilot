import * as React from "react";
import { Application } from "../../types";
import { Camera, UserCircle, Briefcase, FileText, BadgeCheck, Code } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ApplicationSnapshotsProps {
  application: Application;
}

export function ApplicationSnapshots({ application }: ApplicationSnapshotsProps) {
  
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm overflow-hidden">
      
      <div className="bg-[hsl(var(--muted)/0.5)] border-b border-[hsl(var(--border))] px-6 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Camera className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          Historical Snapshots
        </h2>
        <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
          Captured on {format(new Date(application.appliedAt), "MMM d, yyyy")}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[hsl(var(--border))]">
        
        {/* Candidate Snapshot */}
        <div className="p-6 space-y-5">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2 mb-4">
            <UserCircle className="h-4 w-4 text-[hsl(var(--primary))]" />
            Your Profile at Application
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Current Role</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{application.candidateSnapshot.currentRole}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Experience</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{application.candidateSnapshot.yearsOfExperience} Years</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2 flex items-center gap-1.5">
                <Code className="h-3.5 w-3.5" /> Top Skills Snapshot
              </p>
              <div className="flex flex-wrap gap-1.5">
                {application.candidateSnapshot.topSkills.map(skill => (
                  <Badge key={skill} variant="neutral" className="text-[10px] py-0">{skill}</Badge>
                ))}
              </div>
            </div>
            
            <div className="pt-2 border-t border-[hsl(var(--border))]">
              <p className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                <FileText className="h-3.5 w-3.5" />
                Resume Used: <span className="font-medium text-[hsl(var(--foreground))]">{application.resume.name} (v{application.resume.version})</span>
              </p>
            </div>
          </div>
        </div>

        {/* Job Snapshot */}
        <div className="p-6 space-y-5">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2 mb-4">
            <Briefcase className="h-4 w-4 text-[hsl(var(--primary))]" />
            Job Details at Application
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Title Snapshot</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{application.jobSnapshot.jobTitle}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Department</p>
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{application.jobSnapshot.department}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2 flex items-center gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5" /> Key Requirements
              </p>
              <ul className="space-y-1">
                {application.jobSnapshot.requirements.map((req, i) => (
                  <li key={i} className="text-xs text-[hsl(var(--foreground))] flex items-start gap-1.5">
                    <span className="text-[hsl(var(--primary))] shrink-0">•</span> {req}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2 border-t border-[hsl(var(--border))] flex justify-between items-center">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Salary: <span className="font-medium text-[hsl(var(--foreground))]">{application.jobSnapshot.salaryRange}</span>
              </p>
              <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                Job v{application.jobSnapshot.version}
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
