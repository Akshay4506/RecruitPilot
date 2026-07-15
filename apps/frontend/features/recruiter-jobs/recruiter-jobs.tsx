"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/lib/animations";
import { mockJobs } from "./mock/jobs.mock";
import { Job } from "./types";

import { RecruiterJobsHero } from "./components/overview/recruiter-jobs-hero";
import { RecruiterJobMetrics } from "./components/overview/recruiter-job-metrics";
import { RecruiterJobSearch } from "./components/search/recruiter-job-search";
import { RecruiterJobFilters } from "./components/search/recruiter-job-filters";
import { RecruiterJobTable } from "./components/list/recruiter-job-table";
import { RecruiterJobCard } from "./components/list/recruiter-job-card";
import { RecruiterJobPreviewDrawer } from "./components/list/recruiter-job-preview-drawer";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecruiterJobs() {
  const [jobs] = React.useState<Job[]>(mockJobs);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [previewJob, setPreviewJob] = React.useState<Job | null>(null);

  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto space-y-8 pb-12"
      variants={stagger()}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp}>
        <RecruiterJobsHero jobs={jobs} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <RecruiterJobMetrics jobs={jobs} />
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-4 shadow-sm">
        <div className="flex-1 w-full flex flex-col xl:flex-row gap-4">
          <RecruiterJobSearch />
          <RecruiterJobFilters />
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto bg-[hsl(var(--muted)/0.5)] p-1 rounded-lg">
          <Button 
            variant={viewMode === "list" ? "secondary" : "ghost"} 
            size="sm" 
            className="h-8 px-2"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "grid" ? "secondary" : "ghost"} 
            size="sm" 
            className="h-8 px-2"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        {viewMode === "list" ? (
          <RecruiterJobTable jobs={jobs} onPreview={setPreviewJob} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <RecruiterJobCard key={job.id} job={job} onPreview={setPreviewJob} />
            ))}
          </div>
        )}
      </motion.div>

      <RecruiterJobPreviewDrawer 
        job={previewJob} 
        isOpen={!!previewJob} 
        onClose={() => setPreviewJob(null)} 
      />
    </motion.div>
  );
}
