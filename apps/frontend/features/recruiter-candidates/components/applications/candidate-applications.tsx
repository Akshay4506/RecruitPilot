import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Card } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ExternalLink } from "lucide-react";
import Link from "next/link";

export function CandidateApplications({ candidate }: { candidate: RecruiterCandidate }) {
  if (candidate.applications.length === 0) {
    return (
      <Card className="p-8 text-center text-[hsl(var(--muted-foreground))]">
        No active or past applications found.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {candidate.applications.map(app => (
        <Card key={app.id} className="p-5 border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] transition-colors group">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">{app.jobTitle}</h3>
              <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))] mt-1">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" /> Applied {new Date(app.appliedAt).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>Job ID: {app.jobId}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)] text-[hsl(var(--primary))]">
                {app.matchScore}% Match
              </Badge>
              <Badge variant={app.status === "REJECTED" ? "destructive" : app.status === "HIRED" ? "success" : "warning"}>
                {app.stage}
              </Badge>
              <Link href={`/recruiter/applications/${app.id}`} className="ml-2 p-2 bg-[hsl(var(--muted)/0.5)] rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
