"use client";

import * as React from "react";
import { Menu, Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Notifications } from "./notifications";
import { UserMenu } from "./user-menu";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { useSidebarStore } from "@/store/sidebar.store";
import type { BreadcrumbItem, Workspace } from "@/types/navigation";
import type { NotificationItem } from "./notifications";
import type { UserMenuUser } from "./user-menu";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface HeaderProps {
  user?: UserMenuUser;
  /** Show workspace switcher */
  workspaces?: Workspace[];
  currentWorkspaceId?: string;
  onWorkspaceSwitch?: (id: string) => void;
  /** Breadcrumbs */
  breadcrumbs?: BreadcrumbItem[];
  showBreadcrumbs?: boolean;
  /** Notifications */
  notificationCount?: number;
  notifications?: NotificationItem[];
  /** Global search */
  showSearch?: boolean;
  onSearchOpen?: () => void;
  /** Auth actions */
  onSignOut?: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  /** Custom right-side content */
  rightContent?: React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────────────────────

function Header({
  user,
  workspaces,
  currentWorkspaceId,
  onWorkspaceSwitch,
  breadcrumbs,
  showBreadcrumbs = true,
  notificationCount = 0,
  notifications = [],
  showSearch = true,
  onSearchOpen,
  onSignOut,
  onProfile,
  onSettings,
  rightContent,
  className,
}: HeaderProps) {
  const toggleMobile = useSidebarStore((s) => s.toggleMobile);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center gap-3",
        "border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/0.9)]",
        "backdrop-blur-sm px-4",
        "shrink-0",
        className
      )}
    >
      {/* ── Left ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleMobile}
          className="md:hidden shrink-0"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Workspace switcher */}
        {workspaces && workspaces.length > 0 && currentWorkspaceId && onWorkspaceSwitch && (
          <WorkspaceSwitcher
            workspaces={workspaces}
            currentWorkspaceId={currentWorkspaceId}
            onSwitch={onWorkspaceSwitch}
          />
        )}

        {/* Breadcrumbs */}
        {showBreadcrumbs && (
          <Breadcrumbs items={breadcrumbs} className="hidden sm:flex" />
        )}
      </div>

      {/* ── Right ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Global search button (Ctrl+K) */}
        {showSearch && (
          <button
            onClick={onSearchOpen}
            className={cn(
              "hidden sm:flex items-center gap-2 h-8 rounded-md border border-[hsl(var(--input))]",
              "bg-[hsl(var(--background))] px-3 text-sm text-[hsl(var(--muted-foreground))]",
              "hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
              "transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]",
              "w-44 lg:w-56"
            )}
            aria-label="Open command palette"
          >
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span className="flex-1 text-left text-xs">Search...</span>
            <kbd
              className="hidden lg:inline-flex items-center gap-1 rounded border border-[hsl(var(--border))] px-1.5 py-0.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))]"
              aria-label="Press Control or Command plus K"
            >
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>
        )}

        {/* Custom content slot */}
        {rightContent}

        {/* Notifications */}
        {user && (
          <Notifications count={notificationCount} notifications={notifications} />
        )}

        {/* User menu */}
        {user && (
          <UserMenu
            user={user}
            onSignOut={onSignOut}
            onSettings={onSettings}
            onProfile={onProfile}
          />
        )}
      </div>
    </header>
  );
}

export { Header };
