"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { CandidateDocument } from "./types";
import {
  mockStorageOverview,
  mockDefaultResume,
  mockResumeHistory,
  mockOtherDocuments,
  mockDocumentTimeline,
} from "./mock/documents.mock";

// Components
import { HeroHeader, HeroHeaderSkeleton } from "./components/overview/hero-header";
import { StorageOverview, StorageOverviewSkeleton } from "./components/overview/storage-overview";
import { DefaultResume, DefaultResumeSkeleton } from "./components/resume/default-resume";
import { VersionHistory, VersionHistorySkeleton } from "./components/resume/version-history";
import { DocumentLibrary, DocumentLibrarySkeleton } from "./components/library/document-library";
import { UploadCenter } from "./components/upload/upload-center";
import { DocumentDrawer } from "./components/preview/document-drawer";
import { RecentActivity, RecentActivitySkeleton } from "./components/timeline/recent-activity";
import { EmptyState } from "@/components/display/empty-state";
import { UploadCloud } from "lucide-react";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function CandidateDocuments() {
  const [selectedDoc, setSelectedDoc] = React.useState<CandidateDocument | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // In real app, these would come from useCandidateDocuments() hook
  const storageOverview = mockStorageOverview;
  const defaultResume = mockDefaultResume;
  const resumeHistory = mockResumeHistory;
  const otherDocuments = mockOtherDocuments;
  const timelineEvents = mockDocumentTimeline;
  const hasAnyDocuments = storageOverview.totalDocuments > 0;

  const handlePreview = (doc: CandidateDocument) => {
    setSelectedDoc(doc);
    setIsDrawerOpen(true);
  };

  const handleDownload = (doc: CandidateDocument) => {
    // Implement download logic
    void 0;
  };

  const handleDelete = (doc: CandidateDocument) => {
    // Implement delete logic
    void 0;
  };

  const handleRename = (doc: CandidateDocument) => {
    // Implement rename logic
    void 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] p-4 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <HeroHeaderSkeleton />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DefaultResumeSkeleton />
                <VersionHistorySkeleton />
              </div>
              <DocumentLibrarySkeleton />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="h-[300px] bg-[hsl(var(--muted))] animate-pulse rounded-xl" />
              <StorageOverviewSkeleton />
              <RecentActivitySkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        <HeroHeader 
          overview={storageOverview} 
          onUploadResume={() => void 0}
          onUploadCertificate={() => void 0}
          onUploadPortfolio={() => void 0}
          onBrowseJobs={() => void 0}
        />

        {!hasAnyDocuments ? (
          <EmptyState
            title="No Documents Found"
            description="Upload your resume, portfolio, or certificates to get started."
            icon={UploadCloud}
            action={{ label: "Upload Resume", onClick: () => void 0 }}
            secondaryAction={{ label: "Complete Profile", onClick: () => void 0 }}
          />
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Column (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-6">
              
              <motion.div variants={fadeUpItem} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <DefaultResume 
                    resume={defaultResume}
                    onPreview={handlePreview}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
                    onReplace={() => void 0}
                  />
                </div>
                <div>
                  <VersionHistory 
                    history={resumeHistory}
                    onPreview={handlePreview}
                    onDownload={handleDownload}
                    onRestore={(doc) => void 0}
                    onDelete={handleDelete}
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeUpItem}>
                <DocumentLibrary 
                  documents={otherDocuments}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                  onRename={handleRename}
                  onDelete={handleDelete}
                />
              </motion.div>

              <motion.div variants={fadeUpItem} className="hidden lg:block">
                <RecentActivity activities={timelineEvents} />
              </motion.div>
            </div>

            {/* Right Column (4 cols on desktop) */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div variants={fadeUpItem}>
                <UploadCenter />
              </motion.div>
              
              <motion.div variants={fadeUpItem}>
                <StorageOverview overview={storageOverview} />
              </motion.div>
              
              <motion.div variants={fadeUpItem} className="lg:hidden block">
                <RecentActivity activities={timelineEvents} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      <DocumentDrawer 
        document={selectedDoc}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onDownload={handleDownload}
      />
    </div>
  );
}
