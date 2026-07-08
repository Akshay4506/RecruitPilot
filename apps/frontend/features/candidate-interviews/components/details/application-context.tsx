import * as React from "react";
import { Interview } from "../../types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, FileText } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface ApplicationContextProps {
  interview: Interview;
}

export function ApplicationContext({ interview }: ApplicationContextProps) {
  
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Application Context</h2>
      
      <div className="space-y-4">
        
        <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-4">
          <div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Applied On</p>
            <p className="font-medium text-[hsl(var(--foreground))]">{format(new Date(interview.appliedAt), "MMMM d, yyyy")}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Current Stage</p>
            <p className="font-medium text-[hsl(var(--foreground))] capitalize">{interview.applicationStage.replace("_", " ").toLowerCase()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center text-[hsl(var(--primary))] shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{interview.resumeUsed.name}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Resume used for this application</p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="w-full sm:w-auto flex-1" asChild>
            <Link href={`/applications/${interview.applicationId}`}>
              View Application <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto flex-1 text-[hsl(var(--muted-foreground))]" asChild>
            <Link href={`/jobs/${interview.jobId}`}>
              View Job <Briefcase className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
