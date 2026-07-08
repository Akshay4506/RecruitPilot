"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/loaders/skeleton";
import { SectionLoader } from "@/components/loaders/spinner";
import { Alert } from "@/components/feedback/alert";

// ─────────────────────────────────────────────────────────────────────────────
// Shared chart types
// ─────────────────────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface ChartSeries {
  /** Key in data object */
  dataKey: string;
  /** Legend label */
  label: string;
  /** Line/bar/area color — defaults to chart palette */
  color?: string;
}

/** Shared props across all chart card wrappers */
export interface BaseChartCardProps {
  title: string;
  description?: string;
  data: ChartDataPoint[];
  series: ChartSeries[];
  /** Category axis key (X) */
  categoryKey: string;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string;
  /** Chart height in px */
  height?: number;
  className?: string;
  /** Optional footer content */
  footer?: React.ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// Design-system aware chart color palette
// ─────────────────────────────────────────────────────────────────────────────
export const CHART_COLORS = [
  "#6366f1", // brand-500   — Indigo
  "#0ea5e9", // info-500    — Sky
  "#10b981", // success-500 — Emerald
  "#f59e0b", // warning-500 — Amber
  "#f43f5e", // danger-500  — Rose
  "#a5adff", // brand-300   — Light Indigo
  "#94a3b8", // neutral-400 — Slate
];

export function getChartColor(index: number): string {
  return CHART_COLORS[index % CHART_COLORS.length];
}

// ─────────────────────────────────────────────────────────────────────────────
// ChartCard — shared wrapper (header + loading + error + empty + footer)
// ─────────────────────────────────────────────────────────────────────────────
interface ChartCardProps {
  title: string;
  description?: string;
  loading?: boolean;
  error?: string;
  isEmpty?: boolean;
  emptyMessage?: string;
  height?: number;
  className?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function ChartCard({
  title,
  description,
  loading = false,
  error,
  isEmpty = false,
  emptyMessage = "No data available for the selected period.",
  height = 280,
  className,
  footer,
  children,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]",
        "shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]",
        className
      )}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] leading-snug">
          {title}
        </h3>
        {description && (
          <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">
            {description}
          </p>
        )}
      </div>

      {/* Body */}
      <div className="px-2 pb-4" style={{ height }}>
        {loading ? (
          <SectionLoader message="" minHeight={`${height}px`} />
        ) : error ? (
          <div className="flex items-center justify-center h-full px-5">
            <Alert variant="error" title="Failed to load chart">
              {error}
            </Alert>
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="h-12 w-12 rounded-xl bg-[hsl(var(--muted))] flex items-center justify-center">
              <svg className="h-6 w-6 text-[hsl(var(--muted-foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] text-center max-w-[200px]">
              {emptyMessage}
            </p>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-[hsl(var(--border))] px-5 py-3">
          {footer}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Chart card skeleton
// ─────────────────────────────────────────────────────────────────────────────
export function ChartCardSkeleton({
  height = 280,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5",
        className
      )}
    >
      <div className="space-y-1.5 mb-4">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-52" />
      </div>
      <Skeleton className="w-full" style={{ height }} rounded="lg" />
    </div>
  );
}
