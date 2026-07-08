import * as React from "react";
import { Application } from "../../types";
import { ApplicationCard, ApplicationCardSkeleton } from "./application-card";
import { motion, Variants } from "framer-motion";
import { EmptyState } from "@/components/display/empty-state";

interface ApplicationListProps {
  applications: Application[];
  isLoading?: boolean;
  onQuickView?: (application: Application) => void;
  onWithdraw?: (application: Application) => void;
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

export function ApplicationList({ applications, isLoading, onQuickView, onWithdraw, onClearFilters }: ApplicationListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <ApplicationCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <EmptyState
        type="search"
        title="No Applications Found"
        description="We couldn't find any applications matching your current filters."
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
      className="grid grid-cols-1 xl:grid-cols-2 gap-4"
    >
      {applications.map((application) => (
        <motion.div key={application.id} variants={fadeUpItem}>
          <ApplicationCard 
            application={application}
            onQuickView={onQuickView}
            onWithdraw={onWithdraw}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
