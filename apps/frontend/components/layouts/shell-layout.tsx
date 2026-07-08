"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/navigation/sidebar/sidebar";
import { Header } from "@/components/navigation/header/header";
import type { NavConfig } from "@/types/navigation";
import type { HeaderProps } from "@/components/navigation/header/header";
import type { SidebarUser } from "@/components/navigation/sidebar/sidebar";

// ─────────────────────────────────────────────────────────────────────────────
// ShellLayout — the shared inner structure for all role-based layouts
// ─────────────────────────────────────────────────────────────────────────────

export interface ShellLayoutProps {
  /** Navigation data for this role */
  navConfig: NavConfig;
  /** Current user */
  user: SidebarUser;
  /** Header props (optional overrides) */
  headerProps?: Partial<HeaderProps>;
  /** Main content */
  children: React.ReactNode;
  className?: string;
  /** Fluid (full-width) content or constrained max-width */
  contentWidth?: "fluid" | "constrained" | "wide";
  /** Remove default padding from the content area */
  noPadding?: boolean;
}

const contentWidthMap = {
  fluid:       "w-full",
  wide:        "max-w-screen-2xl mx-auto w-full",
  constrained: "max-w-5xl mx-auto w-full",
};

function ShellLayout({
  navConfig,
  user,
  headerProps = {},
  children,
  className,
  contentWidth = "fluid",
  noPadding = false,
}: ShellLayoutProps) {
  return (
    <div className={cn("flex h-screen overflow-hidden bg-[hsl(var(--background))]", className)}>
      {/* Sidebar */}
      <Sidebar navConfig={navConfig} user={user} />

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Header
          user={user}
          showBreadcrumbs
          showSearch
          {...headerProps}
        />

        {/* Page content */}
        <main
          id="main-content"
          className={cn(
            "flex-1 overflow-y-auto",
            !noPadding && "p-4 sm:p-6",
            contentWidthMap[contentWidth]
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export { ShellLayout };
