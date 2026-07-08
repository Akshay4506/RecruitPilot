"use client";

import * as React from "react";
import { ShellLayout } from "./shell-layout";
import { analyticsNav } from "@/config/nav.config";
import { Download, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ShellLayoutProps } from "./shell-layout";

// ─────────────────────────────────────────────────────────────────────────────
// AnalyticsLayout — dashboard with filter bar + export slot
// ─────────────────────────────────────────────────────────────────────────────

export interface AnalyticsLayoutProps extends Omit<ShellLayoutProps, "navConfig"> {
  /** Slot for date pickers, dimension filters, etc. */
  filterBar?: React.ReactNode;
  /** Callback for the export button */
  onExport?: () => void;
  /** Label for export button */
  exportLabel?: string;
  isExporting?: boolean;
  /** Optional page title rendered inside filter bar */
  pageTitle?: string;
}

function AnalyticsLayout({
  user,
  filterBar,
  onExport,
  exportLabel = "Export",
  isExporting = false,
  pageTitle,
  children,
  headerProps = {},
  ...props
}: AnalyticsLayoutProps) {
  return (
    <ShellLayout
      navConfig={analyticsNav}
      user={user}
      contentWidth="fluid"
      noPadding
      headerProps={{ showSearch: false, ...headerProps }}
      {...props}
    >
      {/* ── Filter bar ─────────────────────────────────────────────────── */}
      <div
        className={cn(
          "sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-[hsl(var(--border))]",
          "bg-[hsl(var(--background)/0.9)] backdrop-blur-sm px-4 sm:px-6 py-3"
        )}
      >
        {/* Page title */}
        {pageTitle && (
          <h1 className="text-sm font-semibold text-[hsl(var(--foreground))] mr-2">
            {pageTitle}
          </h1>
        )}

        {/* Filters slot */}
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          {filterBar ?? (
            <span className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters will appear here
            </span>
          )}
        </div>

        {/* Export */}
        {onExport && (
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            loading={isExporting}
            className="shrink-0"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            {exportLabel}
          </Button>
        )}
      </div>

      {/* ── Page content ───────────────────────────────────────────────── */}
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </ShellLayout>
  );
}

export { AnalyticsLayout };
