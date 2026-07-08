import * as React from "react";
import { cn } from "@/lib/utils";

// ── Base Skeleton ─────────────────────────────────────────────────────────────
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: "sm" | "md" | "lg" | "full";
}

function Skeleton({ className, rounded = "md", ...props }: SkeletonProps) {
  const roundedMap = {
    sm:   "rounded",
    md:   "rounded-md",
    lg:   "rounded-lg",
    full: "rounded-full",
  };
  return (
    <div
      className={cn(
        "animate-pulse bg-[hsl(var(--muted))]",
        roundedMap[rounded],
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

// ── Card Skeleton ─────────────────────────────────────────────────────────────
function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[hsl(var(--border))] p-5 space-y-3",
        "bg-[hsl(var(--card))]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-9 w-9" rounded="lg" />
      </div>
      <Skeleton className="h-7 w-24" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

// ── Table Row Skeleton ────────────────────────────────────────────────────────
function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="border-b border-[hsl(var(--border))]">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4" style={{ width: `${60 + Math.random() * 40}%` }} />
        </td>
      ))}
    </tr>
  );
}

function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} cols={cols} />
      ))}
    </tbody>
  );
}

// ── List Item Skeleton ────────────────────────────────────────────────────────
function ListItemSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 p-3", className)}>
      <Skeleton className="h-9 w-9 shrink-0" rounded="full" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-6 w-16" rounded="full" />
    </div>
  );
}

// ── Profile Skeleton ──────────────────────────────────────────────────────────
function ProfileSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Skeleton className="h-10 w-10 shrink-0" rounded="full" />
      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

// ── Page Skeleton – Full page loading state ────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="space-y-6 p-6" aria-label="Loading page content" aria-live="polite">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
        <div className="p-4 border-b border-[hsl(var(--border))]">
          <Skeleton className="h-4 w-32" />
        </div>
        <table className="w-full">
          <TableSkeleton rows={6} cols={5} />
        </table>
      </div>
    </div>
  );
}

export {
  Skeleton,
  CardSkeleton,
  TableSkeleton,
  TableRowSkeleton,
  ListItemSkeleton,
  ProfileSkeleton,
  PageSkeleton,
};
