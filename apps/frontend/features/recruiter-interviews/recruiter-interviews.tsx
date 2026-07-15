"use client";

import * as React from "react";
import { mockDashboardMetrics, mockInterviews } from "./mock/interviews.mock";
import { InterviewHero } from "./components/overview/interview-hero";
import { InterviewMetrics } from "./components/overview/interview-metrics";
import { InterviewHealth } from "./components/overview/interview-health";
import { InterviewCalendar } from "./components/overview/interview-calendar";
import { InterviewSearch } from "./components/search/interview-search";
import { InterviewFilters } from "./components/search/interview-filters";
import { InterviewList } from "./components/schedule/interview-list";
import { ScheduleInterviewDialog } from "./components/schedule/schedule-interview-dialog";

export function RecruiterInterviews() {
  const [isScheduleOpen, setIsScheduleOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-24 min-w-0">
      <InterviewHero 
        todayCount={3} 
        upcomingCount={12} 
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6 min-w-0">
          <InterviewMetrics metrics={mockDashboardMetrics} />
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-4 shadow-sm">
            <InterviewSearch />
            <InterviewFilters />
          </div>

          <InterviewList interviews={mockInterviews} />
        </div>

        <div className="xl:col-span-1 space-y-6 min-w-0">
          <InterviewCalendar interviews={mockInterviews} />
          <InterviewHealth />
        </div>
      </div>

      <ScheduleInterviewDialog isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
    </div>
  );
}
