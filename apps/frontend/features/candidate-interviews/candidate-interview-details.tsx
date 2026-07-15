"use client";

import * as React from "react";
import { mockInterviews } from "./mock/interviews.mock";

import { InterviewDetailHero } from "./components/details/interview-detail-hero";
import { InterviewPipeline } from "./components/details/interview-pipeline";
import { MeetingInfo } from "./components/meeting/meeting-info";
import { CalendarSection } from "./components/schedule/calendar-section";
import { PreparationSection } from "./components/preparation/preparation-section";
import { PanelSection } from "./components/details/panel-section";
import { InterviewTimelineView } from "./components/timeline/interview-timeline-view";
import { ApplicationContext } from "./components/details/application-context";
import { InterviewInsights } from "./components/preparation/interview-insights";
import { InterviewActionsCard } from "./components/actions/interview-actions-card";
import { RescheduleDialog } from "./components/actions/reschedule-dialog";
import { ConfirmationDialog } from "./components/actions/confirmation-dialog";

import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CandidateInterviewDetailsProps {
  interviewId: string;
}

export function CandidateInterviewDetails({ interviewId }: CandidateInterviewDetailsProps) {
  const interview = mockInterviews.find(i => i.id === interviewId) || mockInterviews[0];

  const [rescheduleOpen, setRescheduleOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [declineOpen, setDeclineOpen] = React.useState(false);

  const handleReschedule = (date: string, reason: string) => {
    void 0;
  };

  const handleConfirm = () => {
    void 0;
    setConfirmOpen(false);
  };

  const handleDecline = () => {
    void 0;
    setDeclineOpen(false);
  };

  if (!interview) return <div>Interview not found</div>;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        <div>
          <Button variant="ghost" size="sm" asChild className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] pl-0 -ml-2 mb-2">
            <Link href={ROUTES.candidate.interviews}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Interviews
            </Link>
          </Button>
          
          <InterviewDetailHero interview={interview} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Content Column (8) */}
          <div className="lg:col-span-8 space-y-6">
            <InterviewPipeline interview={interview} />
            <MeetingInfo interview={interview} />
            <CalendarSection interview={interview} />
            <PreparationSection interview={interview} />
            <PanelSection interview={interview} />
            <InterviewTimelineView interview={interview} />
            <ApplicationContext interview={interview} />
          </div>

          {/* Right Sidebar Column (4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-6 space-y-6">
              <InterviewActionsCard 
                interview={interview} 
                onConfirm={() => setConfirmOpen(true)}
                onDecline={() => setDeclineOpen(true)}
                onReschedule={() => setRescheduleOpen(true)}
              />
              <InterviewInsights interview={interview} />
            </div>
          </div>

        </div>
      </div>

      <RescheduleDialog 
        interview={interview}
        isOpen={rescheduleOpen}
        onClose={() => setRescheduleOpen(false)}
        onSubmit={handleReschedule}
      />

      <ConfirmationDialog 
        interview={interview}
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        mode="confirm"
      />

      <ConfirmationDialog 
        interview={interview}
        isOpen={declineOpen}
        onClose={() => setDeclineOpen(false)}
        onConfirm={handleDecline}
        mode="decline"
      />
    </div>
  );
}
