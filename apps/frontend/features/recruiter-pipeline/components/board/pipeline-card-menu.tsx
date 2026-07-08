import * as React from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Calendar, ArrowRightLeft, UserPlus, XCircle, Archive } from "lucide-react";

interface PipelineCardMenuProps {
  onSchedule: () => void;
  onMove: () => void;
  onAssign: () => void;
  onReject: () => void;
  onArchive: () => void;
}

export function PipelineCardMenu({ onSchedule, onMove, onAssign, onReject, onArchive }: PipelineCardMenuProps) {
  // Using a simple absolute positioned menu for now, or could use DropdownMenu if available
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon-xs" 
        className="h-6 w-6" 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
      >
        <MoreHorizontal className="h-3.5 w-3.5" />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-md shadow-lg py-1 z-50">
            <button className="w-full text-left px-3 py-1.5 text-xs hover:bg-[hsl(var(--muted)/0.5)] flex items-center gap-2" onClick={(e) => { e.stopPropagation(); onSchedule(); setIsOpen(false); }}>
              <Calendar className="h-3 w-3" /> Schedule Interview
            </button>
            <button className="w-full text-left px-3 py-1.5 text-xs hover:bg-[hsl(var(--muted)/0.5)] flex items-center gap-2" onClick={(e) => { e.stopPropagation(); onMove(); setIsOpen(false); }}>
              <ArrowRightLeft className="h-3 w-3" /> Move Stage
            </button>
            <button className="w-full text-left px-3 py-1.5 text-xs hover:bg-[hsl(var(--muted)/0.5)] flex items-center gap-2" onClick={(e) => { e.stopPropagation(); onAssign(); setIsOpen(false); }}>
              <UserPlus className="h-3 w-3" /> Assign Recruiter
            </button>
            <div className="h-px bg-[hsl(var(--border))] my-1" />
            <button className="w-full text-left px-3 py-1.5 text-xs hover:bg-[hsl(var(--destructive)/0.1)] text-[hsl(var(--destructive))] flex items-center gap-2" onClick={(e) => { e.stopPropagation(); onReject(); setIsOpen(false); }}>
              <XCircle className="h-3 w-3" /> Reject
            </button>
            <button className="w-full text-left px-3 py-1.5 text-xs hover:bg-[hsl(var(--muted)/0.5)] text-[hsl(var(--muted-foreground))] flex items-center gap-2" onClick={(e) => { e.stopPropagation(); onArchive(); setIsOpen(false); }}>
              <Archive className="h-3 w-3" /> Archive
            </button>
          </div>
        </>
      )}
    </div>
  );
}
