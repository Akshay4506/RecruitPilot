import * as React from "react";
import { Application } from "../../types";
import { Button } from "@/components/ui/button";
import { Copy, Download, ExternalLink, MessageSquare, Search, XCircle } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface ApplicationActionsCardProps {
  application: Application;
  onWithdraw?: () => void;
}

export function ApplicationActionsCard({ application, onWithdraw }: ApplicationActionsCardProps) {
  
  const isTerminated = application.status === "REJECTED" || application.status === "WITHDRAWN" || application.status === "HIRED";

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4 sticky top-6">
      <h3 className="font-semibold text-[hsl(var(--foreground))]">Application Actions</h3>
      
      <div className="space-y-2 pt-1">
        
        {!isTerminated && (
          <Button 
            variant="outline" 
            className="w-full justify-start text-[hsl(var(--danger))] hover:text-[hsl(var(--danger))] hover:bg-[hsl(var(--danger)/0.1)] border-[hsl(var(--danger)/0.3)]"
            onClick={onWithdraw}
          >
            <XCircle className="h-4 w-4 mr-2" /> Withdraw Application
          </Button>
        )}

        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href={`/jobs/${application.jobId}`}>
            <ExternalLink className="h-4 w-4 mr-2" /> View Original Job
          </Link>
        </Button>

        <Button variant="outline" className="w-full justify-start">
          <Download className="h-4 w-4 mr-2" /> Download Resume Used
        </Button>

        <Button variant="outline" className="w-full justify-start text-[hsl(var(--muted-foreground))]" disabled>
          <Copy className="h-4 w-4 mr-2" /> Duplicate Application
        </Button>

      </div>

      <div className="pt-3 border-t border-[hsl(var(--border))] space-y-2 mt-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href={ROUTES.candidate.jobs}>
            <Search className="h-4 w-4 mr-2" /> Browse Similar Jobs
          </Link>
        </Button>
        {application.assignedRecruiter && (
          <Button variant="outline" className="w-full justify-start text-[hsl(var(--muted-foreground))]" disabled>
            <MessageSquare className="h-4 w-4 mr-2" /> Contact Recruiter
          </Button>
        )}
      </div>

    </div>
  );
}
