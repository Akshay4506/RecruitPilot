import * as React from "react";
import { PipelineBoard } from "../../types";
import { ChevronDown, Briefcase } from "lucide-react";

interface PipelineSelectorProps {
  boards: PipelineBoard[];
  activeBoardId: string;
  onSelect: (boardId: string) => void;
}

export function PipelineSelector({ boards, activeBoardId, onSelect }: PipelineSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const activeBoard = boards.find(b => b.id === activeBoardId);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg hover:border-[hsl(var(--primary)/0.5)] transition-colors text-left min-w-[280px]"
      >
        <div className="p-1.5 bg-[hsl(var(--primary)/0.1)] rounded-md text-[hsl(var(--primary))] shrink-0">
          <Briefcase className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-semibold">Active Pipeline</div>
          <div className="text-sm font-bold text-[hsl(var(--foreground))] truncate">{activeBoard?.name || "Select Pipeline"}</div>
        </div>
        <ChevronDown className={`h-4 w-4 text-[hsl(var(--muted-foreground))] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-lg overflow-hidden z-50">
            {boards.map(board => (
              <button
                key={board.id}
                onClick={() => {
                  onSelect(board.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${board.id === activeBoardId ? 'bg-[hsl(var(--primary)/0.05)] text-[hsl(var(--primary))] font-medium' : 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted)/0.5)]'}`}
              >
                <span>{board.name}</span>
                {board.department && <span className="text-xs text-[hsl(var(--muted-foreground))]">{board.department}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
