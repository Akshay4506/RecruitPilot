import { create } from "zustand";
import { PipelineBoard, PipelineCandidate } from "../types";

interface PipelineState {
  // Current loaded board
  board: PipelineBoard | null;
  // Local candidates state (for optimistic updates)
  candidates: Record<string, PipelineCandidate[]>; // keyed by stage id
  
  // Selection
  selectedCandidates: string[];
  bulkSelectionMode: boolean;
  
  // UI State
  viewMode: "board" | "list";
  searchQuery: string;
  activeFilters: Record<string, string[]>;
  collapsedColumns: string[];
  
  // Actions
  setBoard: (board: PipelineBoard) => void;
  moveCandidate: (candidateId: string, fromStage: string, toStage: string) => void;
  toggleSelection: (candidateId: string, multi?: boolean) => void;
  clearSelection: () => void;
  setSearchQuery: (query: string) => void;
  toggleColumnCollapse: (stageId: string) => void;
}

export const usePipelineStore = create<PipelineState>((set, get) => ({
  board: null,
  candidates: {},
  selectedCandidates: [],
  bulkSelectionMode: false,
  viewMode: "board",
  searchQuery: "",
  activeFilters: {},
  collapsedColumns: [],

  setBoard: (board) => {
    // Group candidates by stage
    const grouped: Record<string, PipelineCandidate[]> = {};
    board.columns.forEach(col => {
      grouped[col.id] = [];
    });
    board.candidates.forEach(cand => {
      if (!grouped[cand.stage]) {
        grouped[cand.stage] = [];
      }
      grouped[cand.stage].push(cand);
    });

    set({ board, candidates: grouped });
  },

  moveCandidate: (candidateId, fromStage, toStage) => {
    if (fromStage === toStage) return;

    set((state) => {
      const sourceCol = [...(state.candidates[fromStage] || [])];
      const destCol = [...(state.candidates[toStage] || [])];
      
      const candidateIndex = sourceCol.findIndex(c => c.id === candidateId);
      if (candidateIndex === -1) return state;

      const [movedCandidate] = sourceCol.splice(candidateIndex, 1);
      
      // Update stage property locally
      const updatedCandidate = { ...movedCandidate, stage: toStage, lastActivity: new Date().toISOString() };
      destCol.push(updatedCandidate);

      return {
        candidates: {
          ...state.candidates,
          [fromStage]: sourceCol,
          [toStage]: destCol
        }
      };
    });

    // In a real app, we would emit the DragOperation here or from the component.
    // e.g. api.mutate({ candidateId, fromStage, toStage, timestamp: new Date().toISOString() })
  },

  toggleSelection: (candidateId, multi = false) => {
    set((state) => {
      const isSelected = state.selectedCandidates.includes(candidateId);
      let newSelection: string[];

      if (multi) {
        newSelection = isSelected 
          ? state.selectedCandidates.filter(id => id !== candidateId)
          : [...state.selectedCandidates, candidateId];
      } else {
        newSelection = isSelected && state.selectedCandidates.length === 1 ? [] : [candidateId];
      }

      return {
        selectedCandidates: newSelection,
        bulkSelectionMode: newSelection.length > 0
      };
    });
  },

  clearSelection: () => set({ selectedCandidates: [], bulkSelectionMode: false }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  toggleColumnCollapse: (stageId) => set((state) => ({
    collapsedColumns: state.collapsedColumns.includes(stageId)
      ? state.collapsedColumns.filter(id => id !== stageId)
      : [...state.collapsedColumns, stageId]
  }))
}));
