import * as React from "react";
import { usePipelineStore } from "../../store/pipeline.store";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, UserPlus, XCircle, Tag, Calendar, X } from "lucide-react";

export function BulkToolbar() {
  const selectedCandidates = usePipelineStore(state => state.selectedCandidates);
  const clearSelection = usePipelineStore(state => state.clearSelection);
  
  if (selectedCandidates.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-200">
      <div className="bg-[hsl(var(--foreground))] text-[hsl(var(--background))] px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 border border-[hsl(var(--border))]">
        <div className="flex items-center gap-3 border-r border-[hsl(var(--background))/0.2] pr-6">
          <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold">
            {selectedCandidates.length}
          </div>
          <span className="text-sm font-medium">Selected</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 gap-2 hover:bg-[hsl(var(--background))/0.1] hover:text-[hsl(var(--background))] text-[hsl(var(--muted))]">
            <ArrowRightLeft className="h-4 w-4" /> Move
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-2 hover:bg-[hsl(var(--background))/0.1] hover:text-[hsl(var(--background))] text-[hsl(var(--muted))]">
            <UserPlus className="h-4 w-4" /> Assign
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-2 hover:bg-[hsl(var(--background))/0.1] hover:text-[hsl(var(--background))] text-[hsl(var(--muted))]">
            <Calendar className="h-4 w-4" /> Schedule
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-2 hover:bg-[hsl(var(--background))/0.1] hover:text-[hsl(var(--background))] text-[hsl(var(--muted))]">
            <Tag className="h-4 w-4" /> Tag
          </Button>
          <div className="h-4 w-px bg-[hsl(var(--background))/0.2] mx-2" />
          <Button variant="ghost" size="sm" className="h-8 gap-2 hover:bg-[hsl(var(--destructive))/0.9] text-[hsl(var(--muted))] hover:text-white">
            <XCircle className="h-4 w-4" /> Reject
          </Button>
        </div>

        <div className="pl-6 border-l border-[hsl(var(--background))/0.2]">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-[hsl(var(--background))/0.1] hover:text-[hsl(var(--background))] text-[hsl(var(--muted))]" onClick={clearSelection}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
