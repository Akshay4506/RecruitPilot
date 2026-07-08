import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { PipelineColumn as ColumnType, PipelineCandidate } from "../../types";
import { PipelineCard } from "./pipeline-card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface PipelineColumnProps {
  column: ColumnType;
  candidates: PipelineCandidate[];
}

export function PipelineColumn({ column, candidates }: PipelineColumnProps) {
  const { setNodeRef } = useSortable({
    id: column.id,
    data: { type: "Column", column }
  });

  return (
    <div 
      className="flex flex-col flex-shrink-0 w-80 bg-[hsl(var(--muted)/0.3)] rounded-xl border border-[hsl(var(--border))] overflow-hidden h-[calc(100vh-280px)]"
    >
      <div className="p-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] sticky top-0 z-10">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm text-[hsl(var(--foreground))]">{column.title}</h3>
          <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
            {candidates.length} {column.capacity ? `/ ${column.capacity}` : ''}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold">
          {column.health === "CRITICAL" && (
            <span className="flex items-center gap-1 text-[hsl(var(--destructive))]">
              <AlertCircle className="h-3 w-3" /> Bottleneck
            </span>
          )}
          {column.health === "WARNING" && (
            <span className="flex items-center gap-1 text-[hsl(var(--warning))]">
              <AlertCircle className="h-3 w-3" /> Slowing
            </span>
          )}
          {column.health === "ACTIVE" && (
            <span className="flex items-center gap-1 text-[hsl(var(--success))]">
              <CheckCircle2 className="h-3 w-3" /> Healthy
            </span>
          )}
          {column.averageDays !== undefined && (
            <span className="text-[hsl(var(--muted-foreground))] ml-auto">Avg: {column.averageDays}d</span>
          )}
        </div>
      </div>

      <div 
        ref={setNodeRef}
        className="flex-1 overflow-y-auto p-2 space-y-2 min-h-[150px]"
      >
        <SortableContext items={candidates.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {candidates.map(cand => (
            <PipelineCard key={cand.id} candidate={cand} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
