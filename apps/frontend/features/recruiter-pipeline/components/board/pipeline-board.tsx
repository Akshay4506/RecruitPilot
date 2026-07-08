import * as React from "react";
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { usePipelineStore } from "../../store/pipeline.store";
import { PipelineColumn } from "./pipeline-column";
import { PipelineDragOverlay } from "./pipeline-drag-overlay";

export function PipelineBoard() {
  const board = usePipelineStore(state => state.board);
  const candidatesByStage = usePipelineStore(state => state.candidates);
  const moveCandidate = usePipelineStore(state => state.moveCandidate);

  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!board) return null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // Find containers
    const activeContainer = active.data.current?.sortable?.containerId;
    const overContainer = over.data.current?.sortable?.containerId || over.id;

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const candidateId = active.id as string;
    const fromStage = active.data.current?.candidate?.stage;
    
    // The over.id could be a column or a candidate
    const isOverAColumn = board.columns.some(c => c.id === over.id);
    const toStage = isOverAColumn ? over.id as string : over.data.current?.candidate?.stage;

    if (fromStage && toStage && fromStage !== toStage) {
      moveCandidate(candidateId, fromStage, toStage);
    }
  };

  const activeCandidate = activeId 
    ? Object.values(candidatesByStage).flat().find(c => c.id === activeId) || null
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 pb-4 overflow-x-auto min-h-[500px]">
        {board.columns.map(column => (
          <PipelineColumn 
            key={column.id} 
            column={column} 
            candidates={candidatesByStage[column.id] || []} 
          />
        ))}
      </div>
      <PipelineDragOverlay activeCandidate={activeCandidate} />
    </DndContext>
  );
}
