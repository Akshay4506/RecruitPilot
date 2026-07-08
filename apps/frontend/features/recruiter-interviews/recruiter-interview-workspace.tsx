"use client";

import * as React from "react";
import { mockInterviews } from "./mock/interviews.mock";
import { InterviewDetailsHero } from "./components/details/interview-hero";
import { CandidateSummary } from "./components/details/candidate-summary";
import { PanelManagement } from "./components/details/panel-management";
import { MeetingInformation } from "./components/details/meeting-information";
import { InterviewAgenda } from "./components/details/interview-agenda";
import { QuestionBank } from "./components/details/question-bank";
import { InterviewAttachments } from "./components/details/attachments";
import { InterviewTimeline } from "./components/details/interview-timeline";
import { LiveInterviewMode } from "./components/details/live-interview-mode";

interface RecruiterInterviewWorkspaceProps {
  interviewId: string;
}

export function RecruiterInterviewWorkspace({ interviewId }: RecruiterInterviewWorkspaceProps) {
  const interview = mockInterviews.find(i => i.id === interviewId) || mockInterviews[0];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-24">
      <InterviewDetailsHero interview={interview} />

      {/* Execution View (Optional, usually expanded during the actual interview) */}
      {interview.status === 'SCHEDULED' && (
        <div className="w-full">
          <LiveInterviewMode />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MeetingInformation details={interview.meetingDetails} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InterviewAgenda />
            <QuestionBank />
          </div>
          <PanelManagement panel={interview.panel} />
          <InterviewTimeline />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <CandidateSummary />
          <InterviewAttachments />
        </div>
      </div>
    </div>
  );
}
