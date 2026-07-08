"use client";

import * as React from "react";
import { GlobalCommandPalette } from "@/components/navigation/command-palette";
import { useUIStore } from "@/store/ui.store";

function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const { isCommandPaletteOpen, closeCommandPalette, toggleCommandPalette } = useUIStore();

  // Ctrl/Cmd + K global shortcut
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleCommandPalette();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggleCommandPalette]);

  return (
    <>
      {children}
      <GlobalCommandPalette
        open={isCommandPaletteOpen}
        onOpenChange={(open) => !open && closeCommandPalette()}
      />
    </>
  );
}

export { CommandPaletteProvider };
