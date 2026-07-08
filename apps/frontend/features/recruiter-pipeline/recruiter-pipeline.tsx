"use client";

import * as React from "react";
import { usePipelineStore } from "./store/pipeline.store";
import { mockPipelines } from "./mock/pipeline.mock";
import { PipelineHero } from "./components/overview/pipeline-hero";
import { PipelineMetrics } from "./components/overview/pipeline-metrics";
import { PipelineHealth } from "./components/overview/pipeline-health";
import { PipelineSearch } from "./components/search/pipeline-search";
import { PipelineFilters } from "./components/search/pipeline-filters";
import { PipelineBoard } from "./components/board/pipeline-board";
import { PipelineSidebar } from "./components/rail/pipeline-sidebar";
import { PipelineFunnel } from "./components/analytics/pipeline-funnel";
import { StagePerformance } from "./components/analytics/stage-performance";
import { PipelineInsights } from "./components/analytics/pipeline-insights";
import { BulkToolbar } from "./components/bulk/bulk-toolbar";
import { CandidatePreviewDrawer } from "./components/drawer/candidate-preview-drawer";

export function RecruiterPipeline() {
  const setBoard = usePipelineStore(state => state.setBoard);
  const board = usePipelineStore(state => state.board);
  
  const [activeBoardId, setActiveBoardId] = React.useState(mockPipelines[0].id);

  React.useEffect(() => {
    const selectedBoard = mockPipelines.find(b => b.id === activeBoardId);
    if (selectedBoard) {
      setBoard(selectedBoard);
    }
  }, [activeBoardId, setBoard]);

  if (!board) return null;

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-24">
      {/* Overview Header */}
      <PipelineHero 
        boards={mockPipelines} 
        activeBoardId={activeBoardId} 
        onSelectBoard={setActiveBoardId} 
        activeCandidateCount={board.candidates.length}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6 flex flex-col h-full">
          {/* Top Analytics */}
          <PipelineMetrics metrics={board.metrics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PipelineHealth />
            <PipelineInsights />
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-4 shadow-sm">
            <PipelineSearch />
            <PipelineFilters />
          </div>

          {/* Kanban Board Container */}
          <div className="flex-1 relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm overflow-hidden">
             <div className="absolute inset-0 overflow-hidden">
               <PipelineBoard />
             </div>
          </div>
        </div>

        {/* Right Rail */}
        <div className="xl:col-span-1 space-y-6">
          <PipelineSidebar />
          <PipelineFunnel />
          <StagePerformance />
        </div>
      </div>

      <BulkToolbar />
      {/* We will leave preview drawer empty state managed by a separate hook/store later if needed, but it's available */}
      <CandidatePreviewDrawer candidate={null} isOpen={false} onClose={() => {}} />
    </div>
  );
}
