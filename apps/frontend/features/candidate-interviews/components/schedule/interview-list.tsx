import * as React from "react";
import { Interview } from "../../types";
import { InterviewCard } from "./interview-card";
import { EmptyState } from "@/components/display/empty-state";
import { CalendarX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InterviewListProps {
  interviews: Interview[];
  onConfirm?: (interview: Interview) => void;
  onClearFilters?: () => void;
}

export function InterviewList({ interviews, onConfirm, onClearFilters }: InterviewListProps) {
  
  if (interviews.length === 0) {
    return (
      <EmptyState
        icon={CalendarX}
        title="No interviews found"
        description="We couldn't find any interviews matching your current filters."
        action={onClearFilters ? { label: "Clear Filters", onClick: onClearFilters } : undefined}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
      <AnimatePresence mode="popLayout">
        {interviews.map((interview, index) => (
          <motion.div
            key={interview.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <InterviewCard 
              interview={interview} 
              onConfirm={onConfirm} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
