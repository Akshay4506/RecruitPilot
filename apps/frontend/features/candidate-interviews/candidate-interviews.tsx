"use client";

import * as React from "react";
import { Interview } from "./types";
import { mockInterviews } from "./mock/interviews.mock";

import { InterviewHero } from "./components/overview/interview-hero";
import { InterviewFilters, InterviewFilterState } from "./components/overview/interview-filters";
import { InterviewCalendarWidget } from "./components/overview/interview-calendar-widget";
import { InterviewWidgets } from "./components/overview/interview-widgets";
import { InterviewList } from "./components/schedule/interview-list";
import { ConfirmationDialog } from "./components/actions/confirmation-dialog";

export function CandidateInterviews() {
  const [filters, setFilters] = React.useState<InterviewFilterState>({
    status: new Set(),
    type: new Set(),
    search: "",
    sort: "upcoming"
  });

  const [confirmDialog, setConfirmDialog] = React.useState<{ isOpen: boolean; interview: Interview | null }>({
    isOpen: false,
    interview: null
  });

  const handleClearFilters = () => {
    setFilters({
      status: new Set(),
      type: new Set(),
      search: "",
      sort: "upcoming"
    });
  };

  const handleConfirm = (interview: Interview) => {
    setConfirmDialog({ isOpen: true, interview });
  };

  const confirmAttendance = () => {
    console.log("Confirmed attendance for", confirmDialog.interview?.id);
    setConfirmDialog({ isOpen: false, interview: null });
  };

  const filteredInterviews = mockInterviews.filter(interview => {
    if (filters.status.size > 0 && !filters.status.has(interview.status)) return false;
    if (filters.type.size > 0 && !filters.type.has(interview.type)) return false;
    if (filters.search && !interview.companyName.toLowerCase().includes(filters.search.toLowerCase()) && !interview.jobTitle.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    
    if (filters.sort === "upcoming") {
      // Sort upcoming first
      return timeA - timeB;
    } else if (filters.sort === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // completed (descending by date)
      return timeB - timeA;
    }
  });

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - Filters & Calendar */}
          <div className="lg:col-span-3 hidden lg:block space-y-6">
            <div className="sticky top-6 space-y-6">
              <InterviewCalendarWidget interviews={mockInterviews} />
              <InterviewFilters 
                filters={filters} 
                onFilterChange={setFilters} 
                onClear={handleClearFilters}
              />
            </div>
          </div>

          {/* Center Column - Overview & Schedule */}
          <div className="lg:col-span-6 space-y-6">
            <InterviewHero interviews={mockInterviews} />
            <InterviewList 
              interviews={filteredInterviews}
              onConfirm={handleConfirm}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Right Column - Widgets */}
          <div className="lg:col-span-3 space-y-6">
            <div className="sticky top-6">
              <InterviewWidgets interviews={mockInterviews} />
            </div>
          </div>

        </div>
      </div>

      <ConfirmationDialog 
        interview={confirmDialog.interview}
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, interview: null })}
        onConfirm={confirmAttendance}
        mode="confirm"
      />
    </div>
  );
}
