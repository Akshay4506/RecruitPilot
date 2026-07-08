import { create } from "zustand";

// ─────────────────────────────────────────────────────────────────────────────
// Global UI State (non-persistent)
// Manages: Command Palette, Notification Panel, Modal queue
// ─────────────────────────────────────────────────────────────────────────────

interface UIStore {
  // Command palette
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;

  // Notification panel
  isNotificationPanelOpen: boolean;
  openNotificationPanel: () => void;
  closeNotificationPanel: () => void;

  // Global loading overlay (for full-page transitions)
  isPageLoading: boolean;
  setPageLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  // Command palette
  isCommandPaletteOpen: false,
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
  toggleCommandPalette: () => set((s) => ({ isCommandPaletteOpen: !s.isCommandPaletteOpen })),

  // Notifications
  isNotificationPanelOpen: false,
  openNotificationPanel: () => set({ isNotificationPanelOpen: true }),
  closeNotificationPanel: () => set({ isNotificationPanelOpen: false }),

  // Page loading
  isPageLoading: false,
  setPageLoading: (isPageLoading) => set({ isPageLoading }),
}));
