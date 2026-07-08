import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─────────────────────────────────────────────────────────────────────────────
// Active Workspace store — persisted to localStorage
// ─────────────────────────────────────────────────────────────────────────────

interface WorkspaceStore {
  activeWorkspaceId: string | null;
  workspaceName: string | null;
  setActiveWorkspace: (id: string, name: string) => void;
  clearWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      activeWorkspaceId: null,
      workspaceName: null,
      setActiveWorkspace: (id, name) => set({ activeWorkspaceId: id, workspaceName: name }),
      clearWorkspace: () => set({ activeWorkspaceId: null, workspaceName: null }),
    }),
    {
      name: "rp-workspace",
    }
  )
);
