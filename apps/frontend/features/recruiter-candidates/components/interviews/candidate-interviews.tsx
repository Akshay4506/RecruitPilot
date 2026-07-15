import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Card } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video, User, CheckCircle2 } from "lucide-react";
import { EmptyState } from "@/components/display/empty-state";

export function CandidateInterviews({ candidate }: { candidate: RecruiterCandidate }) {
  if (candidate.interviews.length === 0) {
    return (
      <EmptyState
        type="interviews"
        title="No Interviews"
        description="No interviews scheduled or completed yet."
        className="bg-[hsl(var(--card))] border border-[hsl(var(--border))]"
      />
    );
  }

  return (
    <div className="space-y-4">
      {candidate.interviews.map(interview => (
        <Card key={interview.id} className="p-5 border-l-4 border-l-[hsl(var(--primary))]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">{interview.title}</h3>
                <Badge variant={interview.status === "SCHEDULED" ? "warning" : interview.status === "COMPLETED" ? "success" : "destructive"} className="text-[10px]">
                  {interview.status}
                </Badge>
              </div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                {interview.jobTitle}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-[hsl(var(--foreground))]">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                {new Date(interview.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                {interview.interviewer}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Video className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <a href="#" className="text-[hsl(var(--primary))] hover:underline">Join Link</a>
            </div>
            
            {interview.status === "COMPLETED" && interview.feedbackSubmitted ? (
              <div className="flex items-center gap-1.5 text-sm text-[hsl(var(--success))] font-medium">
                <CheckCircle2 className="h-4 w-4" /> Feedback Submitted
              </div>
            ) : interview.status === "COMPLETED" && !interview.feedbackSubmitted ? (
              <div className="flex items-center gap-1.5 text-sm text-[hsl(var(--warning))] font-medium">
                Pending Feedback
              </div>
            ) : null}
          </div>
        </Card>
      ))}
    </div>
  );
}
