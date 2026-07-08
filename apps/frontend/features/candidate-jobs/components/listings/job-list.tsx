import * as React from "react";
import { Job } from "../../types";
import { JobCard, JobCardSkeleton } from "./job-card";
import { motion, Variants } from "framer-motion";
import { EmptyState } from "@/components/display/empty-state";

interface JobListProps {
  jobs: Job[];
  isLoading?: boolean;
  onQuickView?: (job: Job) => void;
  onApply?: (job: Job) => void;
  onSave?: (job: Job) => void;
  onClearFilters?: () => void;
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function JobList({ jobs, isLoading, onQuickView, onApply, onSave, onClearFilters }: JobListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        type="search"
        title="No Jobs Found"
        description="We couldn't find any jobs matching your current filters. Try adjusting your search criteria."
        action={{
          label: "Reset Filters",
          onClick: () => onClearFilters?.()
        }}
        className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm h-full min-h-[400px]"
      />
    );
  }

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {jobs.map((job) => (
        <motion.div key={job.id} variants={fadeUpItem}>
          <JobCard 
            job={job}
            onQuickView={onQuickView}
            onApply={onApply}
            onSave={onSave}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
