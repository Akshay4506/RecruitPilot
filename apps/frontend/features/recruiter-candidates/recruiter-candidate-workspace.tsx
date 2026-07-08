"use client";

import * as React from "react";
import { RecruiterCandidate } from "./types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

import { CandidateWorkspaceHero } from "./components/overview/candidate-workspace-hero";
import { CandidateSummary } from "./components/overview/candidate-summary";
import { CandidateProfileTab } from "./components/profile/candidate-profile-tab";
import { CandidateApplications } from "./components/applications/candidate-applications";
import { CandidateInterviews } from "./components/interviews/candidate-interviews";
import { CandidateDocuments } from "./components/documents/candidate-documents";
import { CandidateTimeline } from "./components/timeline/candidate-timeline";
import { RecruiterNotes } from "./components/notes/recruiter-notes";
import { CandidateAiInsights } from "./components/ai/candidate-ai-insights";

import { CandidateHealth } from "./components/rail/candidate-health";
import { CandidateAssignments } from "./components/rail/assignments";
import { TagsPanel } from "./components/rail/tags-panel";
import { QuickActions } from "./components/rail/quick-actions";
import { CandidateActionDialogs } from "./components/dialogs/candidate-action-dialogs";

export function RecruiterCandidateWorkspace({ candidate }: { candidate: RecruiterCandidate }) {
  const [activeDialog, setActiveDialog] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "profile", label: "Profile" },
    { id: "applications", label: "Applications" },
    { id: "interviews", label: "Interviews" },
    { id: "documents", label: "Documents" },
    { id: "timeline", label: "Timeline" },
    { id: "notes", label: "Notes" },
    { id: "insights", label: "AI Insights" },
  ];

  return (
    <motion.div 
      className="w-full pb-12 flex flex-col"
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      {/* Top Hero */}
      <CandidateWorkspaceHero candidate={candidate} />

      <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
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
                {activeTab === "overview" && <CandidateSummary candidate={candidate} />}
                {activeTab === "profile" && <CandidateProfileTab candidate={candidate} />}
                {activeTab === "applications" && <CandidateApplications candidate={candidate} />}
                {activeTab === "interviews" && <CandidateInterviews candidate={candidate} />}
                {activeTab === "documents" && <CandidateDocuments candidate={candidate} />}
                {activeTab === "timeline" && <CandidateTimeline candidate={candidate} />}
                {activeTab === "notes" && <RecruiterNotes candidate={candidate} />}
                {activeTab === "insights" && <CandidateAiInsights candidate={candidate} />}
              </div>
            </div>
          </div>

          {/* Sticky Right Rail */}
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
            <div className="sticky top-6 space-y-6">
              <QuickActions candidate={candidate} onActionClick={setActiveDialog} />
              <CandidateHealth candidate={candidate} />
              <CandidateAssignments candidate={candidate} />
              <TagsPanel candidate={candidate} />
            </div>
          </div>
        </div>
      </div>

      <CandidateActionDialogs 
        activeDialog={activeDialog} 
        onClose={() => setActiveDialog(null)} 
        candidateName={candidate.personalInfo.name} 
      />
    </motion.div>
  );
}
