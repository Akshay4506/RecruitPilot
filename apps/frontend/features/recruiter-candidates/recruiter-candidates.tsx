"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/lib/animations";
import { mockCandidates } from "./mock/candidates.mock";
import { RecruiterCandidate } from "./types";

import { RecruiterCandidatesHero } from "./components/overview/recruiter-candidates-hero";
import { RecruiterCandidateSearch } from "./components/search/recruiter-candidate-search";
import { RecruiterCandidateFilters } from "./components/search/recruiter-candidate-filters";
import { CandidateTable } from "./components/directory/candidate-table";
import { CandidateCard } from "./components/directory/candidate-card";
import { CandidatePreviewDrawer } from "./components/directory/candidate-preview-drawer";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecruiterCandidates() {
  const [candidates] = React.useState<RecruiterCandidate[]>(mockCandidates);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [previewCand, setPreviewCand] = React.useState<RecruiterCandidate | null>(null);

  return (
    <motion.div 
      className="w-full max-w-[1600px] mx-auto space-y-8 pb-12"
      variants={stagger()}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp}>
        <RecruiterCandidatesHero candidates={candidates} />
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-4 shadow-sm">
        <div className="flex-1 w-full max-w-2xl flex flex-col sm:flex-row gap-4">
          <RecruiterCandidateSearch />
          <RecruiterCandidateFilters />
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
          <CandidateTable candidates={candidates} onPreview={setPreviewCand} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {candidates.map(cand => (
              <CandidateCard key={cand.id} candidate={cand} onPreview={setPreviewCand} />
            ))}
          </div>
        )}
      </motion.div>

      <CandidatePreviewDrawer 
        candidate={previewCand} 
        isOpen={!!previewCand} 
        onClose={() => setPreviewCand(null)} 
      />
    </motion.div>
  );
}
