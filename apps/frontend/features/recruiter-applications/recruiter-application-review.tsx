"use client";

import * as React from "react";
import { Application } from "./types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

import { CandidateReviewHero } from "./components/review/candidate-review-hero";
import { CandidateSnapshot } from "./components/review/candidate-snapshot";
import { ResumePreview } from "./components/review/resume-preview";
import { ScreeningAnswers } from "./components/review/screening-answers";
import { TimelineHistory } from "./components/review/timeline-history";
import { RecruiterNotes } from "./components/review/recruiter-notes";
import { AiRecommendation } from "./components/review/ai-recommendation";
import { ApplicationHealth } from "./components/review/application-health";

import { QuickActions } from "./components/actions/quick-actions";
import { AssignmentCard } from "./components/collaboration/assignment-card";
import { TagsPanel } from "./components/collaboration/tags-panel";
import { ActivityFeed } from "./components/collaboration/activity-feed";
import { ApplicationActionDialogs } from "./components/dialogs/application-action-dialogs";

export function RecruiterApplicationReview({ application }: { application: Application }) {
  const [activeDialog, setActiveDialog] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "resume", label: "Resume" },
    { id: "screening", label: "Screening" },
    { id: "timeline", label: "Timeline" },
    { id: "notes", label: "Notes" },
    { id: "insights", label: "AI Insights" },
  ];

  return (
    <motion.div 
      className="w-full max-w-[1600px] mx-auto pb-12 flex flex-col"
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      {/* Top Hero */}
      <CandidateReviewHero application={application} />

      <div className="flex flex-col lg:flex-row gap-8 mt-8 px-6 sm:px-8">
        {/* Main Content Area (Tabs) */}
        <div className="flex-1 min-w-0">
          <div className="w-full">
            <div className="flex items-center border-b border-[hsl(var(--border))] mb-8 overflow-x-auto custom-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors",
                    activeTab === tab.id 
                      ? "border-[hsl(var(--primary))] text-[hsl(var(--foreground))]"
                      : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-0 outline-none space-y-8">
              {activeTab === "overview" && <CandidateSnapshot application={application} />}
              {activeTab === "resume" && <ResumePreview application={application} />}
              {activeTab === "screening" && <ScreeningAnswers application={application} />}
              {activeTab === "timeline" && <TimelineHistory application={application} />}
              {activeTab === "notes" && <RecruiterNotes application={application} />}
              {activeTab === "insights" && <AiRecommendation application={application} />}
            </div>
          </div>
        </div>

        {/* Sticky Right Rail */}
        <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
          <div className="sticky top-6 space-y-6">
            <QuickActions application={application} onActionClick={setActiveDialog} />
            <ApplicationHealth application={application} />
            <AssignmentCard application={application} />
            <TagsPanel application={application} />
            <ActivityFeed application={application} />
          </div>
        </div>
      </div>

      <ApplicationActionDialogs 
        activeDialog={activeDialog} 
        onClose={() => setActiveDialog(null)} 
        candidateName={application.candidate.name} 
      />
    </motion.div>
  );
}
