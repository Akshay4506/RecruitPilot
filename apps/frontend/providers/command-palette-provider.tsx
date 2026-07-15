"use client";

import * as React from "react";
import { GlobalCommandPalette } from "@/components/navigation/command-palette";
import { useUIStore } from "@/store/ui.store";
import { useShallow } from "zustand/react/shallow";
import { useGlobalShortcuts } from "@/hooks/use-global-shortcuts";
import { ShortcutHelpDialog } from "@/components/dialogs/shortcut-help-dialog";

function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const { isCommandPaletteOpen, closeCommandPalette, toggleCommandPalette } = useUIStore(
    useShallow((state) => ({
      isCommandPaletteOpen: state.isCommandPaletteOpen,
      closeCommandPalette: state.closeCommandPalette,
      toggleCommandPalette: state.toggleCommandPalette,
    }))
  );

  const { shortcutHelpOpen, setShortcutHelpOpen } = useGlobalShortcuts();

  return (
    <>
      {children}
      <GlobalCommandPalette
        open={isCommandPaletteOpen}
        onOpenChange={(open) => !open && closeCommandPalette()}
      />
      <ShortcutHelpDialog
        open={shortcutHelpOpen}
        onOpenChange={setShortcutHelpOpen}
      />
    </>
  );
}

export { CommandPaletteProvider };
