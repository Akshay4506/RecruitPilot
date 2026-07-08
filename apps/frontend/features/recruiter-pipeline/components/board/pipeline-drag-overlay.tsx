import * as React from "react";
import { DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { PipelineCandidate } from "../../types";
import { PipelineCard } from "./pipeline-card";

interface PipelineDragOverlayProps {
  activeCandidate: PipelineCandidate | null;
}

export function PipelineDragOverlay({ activeCandidate }: PipelineDragOverlayProps) {
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DragOverlay dropAnimation={dropAnimation}>
      {activeCandidate ? (
        <div className="rotate-2 scale-105 shadow-xl ring-2 ring-[hsl(var(--primary))] rounded-lg">
          <PipelineCard candidate={activeCandidate} />
        </div>
      ) : null}
    </DragOverlay>
  );
}
