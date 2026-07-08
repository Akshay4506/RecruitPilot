import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  /** Desktop: collapsed to icon-only width */
  isCollapsed: boolean;
  /** Mobile: drawer is open */
  isMobileOpen: boolean;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileOpen: false,
      toggle: () => set((s) => ({ isCollapsed: !s.isCollapsed })),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      openMobile: () => set({ isMobileOpen: true }),
      closeMobile: () => set({ isMobileOpen: false }),
      toggleMobile: () => set((s) => ({ isMobileOpen: !s.isMobileOpen })),
    }),
    {
      name: "rp-sidebar-state",
      partialize: (s) => ({ isCollapsed: s.isCollapsed }),
    }
  )
);
