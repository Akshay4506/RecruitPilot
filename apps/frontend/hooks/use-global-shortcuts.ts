"use client";

import { useEffect, useState } from "react";
import { useUIStore } from "@/store/ui.store";

export function useGlobalShortcuts() {
  const setCommandPaletteOpen = useUIStore((state) => state.openCommandPalette);
  const [shortcutHelpOpen, setShortcutHelpOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      const isInput =
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      if (isInput && e.key !== "Escape" && !(e.key === "s" && (e.metaKey || e.ctrlKey))) {
        return;
      }

      // Ctrl+K -> Command Palette (handled in command-palette.tsx, but we can centralize here if we want)
      // Actually command-palette.tsx has its own hook, we'll keep that isolated for component state.
      
      // "/" -> Focus Search
      if (e.key === "/" && !isInput) {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>("input[type='search'], input[placeholder*='Search']");
        if (searchInput) {
          searchInput.focus();
        } else {
          // Fallback to command palette if no search input on screen
          setCommandPaletteOpen();
        }
      }

      // "?" -> Shortcut Help
      if (e.key === "?" && !isInput && !e.shiftKey) { // Shift+/ is ? usually, so we just check key === "?"
        e.preventDefault();
        setShortcutHelpOpen(true);
      }

      // "Esc" -> Handled automatically by Radix UI Dialogs/Drawers, but we can add custom unfocus logic here
      if (e.key === "Escape") {
        if (isInput) {
          (document.activeElement as HTMLElement).blur();
        }
      }

      // "Ctrl+S" -> Global Save Intercept
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        // Dispatch a custom event that forms can listen to
        document.dispatchEvent(new CustomEvent("globalSave"));
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setCommandPaletteOpen]);

  return { shortcutHelpOpen, setShortcutHelpOpen };
}
