import * as React from "react";
import { Interview } from "../../types";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, ExternalLink, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";
import { isPast } from "date-fns";

interface InterviewActionsCardProps {
  interview: Interview;
  onConfirm?: () => void;
  onReschedule?: () => void;
  onDecline?: () => void;
}

export function InterviewActionsCard({ interview, onConfirm, onReschedule, onDecline }: InterviewActionsCardProps) {
  
  const isTerminated = interview.status === "COMPLETED" || interview.status === "CANCELLED" || interview.status === "NO_SHOW";
  const past = isPast(new Date(interview.date));

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4 sticky top-6">
      <h3 className="font-semibold text-[hsl(var(--foreground))]">Actions</h3>
      
      <div className="space-y-2 pt-1">
        
        {!isTerminated && !past && (
          <>
            {interview.confirmationStatus === "PENDING" && (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-[hsl(var(--success))] hover:text-[hsl(var(--success))] hover:bg-[hsl(var(--success)/0.1)] border-[hsl(var(--success)/0.3)]"
                  onClick={onConfirm}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Confirm Attendance
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-[hsl(var(--danger))] hover:text-[hsl(var(--danger))] hover:bg-[hsl(var(--danger)/0.1)] border-[hsl(var(--danger)/0.3)]"
                  onClick={onDecline}
                >
                  <XCircle className="h-4 w-4 mr-2" /> Decline
                </Button>
              </>
            )}

            <Button variant="outline" className="w-full justify-start" onClick={onReschedule}>
              <RefreshCw className="h-4 w-4 mr-2" /> Request Reschedule
            </Button>
            
            {interview.status === "CONFIRMED" && (
              <Button variant="primary" className="w-full justify-start mt-2" asChild>
                <a href={interview.meeting.joinUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" /> Open Meeting
                </a>
              </Button>
            )}
          </>
        )}

        <Button variant="outline" className="w-full justify-start">
          <Download className="h-4 w-4 mr-2" /> Download .ICS
        </Button>

      </div>

      <div className="pt-3 border-t border-[hsl(var(--border))] space-y-2 mt-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href={`/applications/${interview.applicationId}`}>
            <ExternalLink className="h-4 w-4 mr-2" /> Open Application
          </Link>
        </Button>
      </div>

    </div>
  );
}
