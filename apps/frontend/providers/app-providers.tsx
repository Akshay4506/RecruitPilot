"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { ToastProvider } from "./toast-provider";
import { CommandPaletteProvider } from "./command-palette-provider";
import { AuthInitializer } from "./auth-initializer";

// ─────────────────────────────────────────────────────────────────────────────
// AppProviders — single root provider that composes all providers
// ─────────────────────────────────────────────────────────────────────────────
// Provider order matters:
// 1. ThemeProvider — must be outermost for CSS variable resolution
// 2. QueryProvider — TanStack Query context for data fetching
// 3. ToastProvider — depends on theme resolution for toast styling
// 4. AuthInitializer — uses QueryProvider (fetches /auth/me on mount)
// 5. CommandPaletteProvider — uses UIStore, needs QueryProvider for navigation

interface AppProvidersProps {
  children: React.ReactNode;
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ToastProvider />
        <AuthInitializer>
          <CommandPaletteProvider>
            {children}
          </CommandPaletteProvider>
        </AuthInitializer>
      </QueryProvider>
    </ThemeProvider>
  );
}

export { AppProviders };
