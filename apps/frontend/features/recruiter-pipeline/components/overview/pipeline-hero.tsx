import * as React from "react";
import { Button } from "@/components/ui/button";
import { PipelineBoard } from "../../types";
import { Plus, Download, Users } from "lucide-react";
import { PipelineSelector } from "./pipeline-selector";

interface PipelineHeroProps {
  boards: PipelineBoard[];
  activeBoardId: string;
  onSelectBoard: (id: string) => void;
  activeCandidateCount: number;
}

export function PipelineHero({ boards, activeBoardId, onSelectBoard, activeCandidateCount }: PipelineHeroProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[hsl(var(--border))] pb-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">Pipeline Workspace</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">Manage hiring stages, drag-and-drop candidates, and analyze conversion.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 pt-2">
          <PipelineSelector boards={boards} activeBoardId={activeBoardId} onSelect={onSelectBoard} />
          
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] rounded-lg min-w-[140px]">
             <div className="p-1.5 bg-[hsl(var(--foreground)/0.1)] rounded-md text-[hsl(var(--foreground))] shrink-0">
               <Users className="h-4 w-4" />
             </div>
             <div>
               <div className="text-xl font-bold text-[hsl(var(--foreground))] leading-none">{activeCandidateCount}</div>
               <div className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-semibold mt-1">Total Active</div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
        <Button variant="outline" className="gap-2 bg-[hsl(var(--background))]">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Candidate
        </Button>
      </div>
    </div>
  );
}
