import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PipelineCandidate } from "../../types";
import { PipelineCardMenu } from "./pipeline-card-menu";
import { Clock, GripVertical } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { usePipelineStore } from "../../store/pipeline.store";

interface PipelineCardProps {
  candidate: PipelineCandidate;
}

export function PipelineCard({ candidate }: PipelineCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: candidate.id, data: { type: "Candidate", candidate } });

  const toggleSelection = usePipelineStore(state => state.toggleSelection);
  const selectedCandidates = usePipelineStore(state => state.selectedCandidates);
  const isSelected = selectedCandidates.includes(candidate.id);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className="opacity-30 border-2 border-[hsl(var(--primary))] border-dashed rounded-lg h-[180px] bg-[hsl(var(--primary)/0.05)]"
      />
    );
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey) {
          toggleSelection(candidate.id, true);
        } else {
          // Open preview
        }
      }}
      className={`group relative bg-[hsl(var(--card))] border rounded-lg p-3 shadow-sm hover:shadow-md transition-all cursor-pointer ${
        isSelected ? "border-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.5)]" : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div 
            {...attributes} 
            {...listeners} 
            className="cursor-grab hover:bg-[hsl(var(--muted))] p-1 rounded-sm text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <GripVertical className="h-4 w-4" />
          </div>
          <Avatar src={candidate.avatarUrl} name={candidate.name} size="sm" />
          <div>
            <div className="text-sm font-semibold text-[hsl(var(--foreground))] line-clamp-1">{candidate.name}</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-1">{candidate.role}</div>
          </div>
        </div>
        <PipelineCardMenu 
          onSchedule={() => {}} 
          onMove={() => {}} 
          onAssign={() => {}} 
          onReject={() => {}} 
          onArchive={() => {}} 
        />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {candidate.skills.slice(0, 3).map(skill => (
          <Badge key={skill} variant="neutral" className="text-[10px] px-1.5 py-0 h-5 font-normal">
            {skill}
          </Badge>
        ))}
        {candidate.skills.length > 3 && (
          <Badge variant="neutral" className="text-[10px] px-1.5 py-0 h-5 font-normal text-[hsl(var(--muted-foreground))]">
            +{candidate.skills.length - 3}
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))] pt-3 border-t border-[hsl(var(--border))]">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          <span>{formatRelativeTime(candidate.lastActivity)}</span>
        </div>
        <div className="flex items-center gap-2">
          {candidate.matchScore >= 90 && (
             <Badge variant="outline" className="border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.05)] text-[hsl(var(--success))] text-[10px] px-1 py-0 h-4">
               {candidate.matchScore}%
             </Badge>
          )}
          {candidate.priority === "CRITICAL" && (
            <div className="h-2 w-2 rounded-full bg-[hsl(var(--destructive))]" title="Critical Priority" />
          )}
        </div>
      </div>
    </div>
  );
}
