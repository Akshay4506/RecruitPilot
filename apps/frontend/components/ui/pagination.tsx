"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface PaginationProps {
  /** Current 1-based page */
  page: number;
  /** Total number of rows */
  total: number;
  /** Rows per page */
  pageSize: number;
  /** Called when page changes */
  onPageChange: (page: number) => void;
  /** Called when page size changes */
  onPageSizeChange?: (size: number) => void;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Show jump-to-page input */
  showJumpTo?: boolean;
  /** Compact layout (mobile-friendly) */
  compact?: boolean;
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Page number range builder
// ─────────────────────────────────────────────────────────────────────────────
function buildPageRange(current: number, total: number, delta = 2): (number | "...")[] {
  if (total <= 1) return [1];

  const range: (number | "...")[] = [];
  const left  = Math.max(1, current - delta);
  const right = Math.min(total, current + delta);

  if (left > 1) {
    range.push(1);
    if (left > 2) range.push("...");
  }

  for (let i = left; i <= right; i++) range.push(i);

  if (right < total) {
    if (right < total - 1) range.push("...");
    range.push(total);
  }

  return range;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────────────────────────
function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  showJumpTo = false,
  compact = false,
  className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [jumpValue, setJumpValue] = React.useState("");

  const from = Math.min((page - 1) * pageSize + 1, total);
  const to   = Math.min(page * pageSize, total);

  const go = (p: number) => {
    const clamped = Math.max(1, Math.min(totalPages, p));
    if (clamped !== page) onPageChange(clamped);
  };

  const handleJump = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const n = parseInt(jumpValue, 10);
    if (!Number.isNaN(n)) go(n);
    setJumpValue("");
  };

  // ── Compact (mobile) ──────────────────────────────────────────────────────
  if (compact) {
    return (
      <div className={cn("flex items-center justify-between gap-2", className)}>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          {from}–{to} of {total}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            disabled={page <= 1}
            onClick={() => go(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[60px] text-center text-xs text-[hsl(var(--muted-foreground))]">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            disabled={page >= totalPages}
            onClick={() => go(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Full pagination ───────────────────────────────────────────────────────
  const pages = buildPageRange(page, totalPages);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        "text-sm text-[hsl(var(--muted-foreground))]",
        className
      )}
    >
      {/* Row count + page size */}
      <div className="flex items-center gap-3">
        <span className="whitespace-nowrap">
          {total === 0 ? "No results" : `${from}–${to} of ${total}`}
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5">
            <label htmlFor="page-size-select" className="text-xs whitespace-nowrap">
              Rows per page
            </label>
            <select
              id="page-size-select"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className={cn(
                "h-7 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))]",
                "px-2 text-xs text-[hsl(var(--foreground))]",
                "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              )}
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        {/* First */}
        <Button
          variant="outline"
          size="icon-sm"
          disabled={page <= 1}
          onClick={() => go(1)}
          aria-label="First page"
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </Button>

        {/* Previous */}
        <Button
          variant="outline"
          size="icon-sm"
          disabled={page <= 1}
          onClick={() => go(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-8 w-8 items-center justify-center text-xs"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => go(p as number)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium",
                "transition-colors duration-100",
                "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]",
                p === page
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-sm"
                  : "hover:bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]"
              )}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <Button
          variant="outline"
          size="icon-sm"
          disabled={page >= totalPages}
          onClick={() => go(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>

        {/* Last */}
        <Button
          variant="outline"
          size="icon-sm"
          disabled={page >= totalPages}
          onClick={() => go(totalPages)}
          aria-label="Last page"
        >
          <ChevronsRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Jump to page */}
      {showJumpTo && (
        <div className="flex items-center gap-1.5">
          <label htmlFor="jump-to-page" className="text-xs whitespace-nowrap">Go to</label>
          <input
            id="jump-to-page"
            type="number"
            min={1}
            max={totalPages}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyDown={handleJump}
            placeholder={String(page)}
            className={cn(
              "h-7 w-14 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))]",
              "px-2 text-center text-xs text-[hsl(var(--foreground))]",
              "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            )}
            aria-label="Go to page"
          />
        </div>
      )}
    </nav>
  );
}

export { Pagination };
