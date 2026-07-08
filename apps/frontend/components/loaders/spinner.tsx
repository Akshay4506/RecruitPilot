"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Spinner ───────────────────────────────────────────────────────────────────
const spinnerVariants = cva("animate-spin text-[hsl(var(--primary))]", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
  },
  defaultVariants: { size: "md" },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
  "aria-label"?: string;
}

function Spinner({ size, className, "aria-label": ariaLabel = "Loading" }: SpinnerProps) {
  return (
    <Loader2
      className={cn(spinnerVariants({ size, className }))}
      aria-label={ariaLabel}
      role="status"
    />
  );
}

// ── Section Loader ────────────────────────────────────────────────────────────
interface SectionLoaderProps {
  message?: string;
  className?: string;
  minHeight?: string;
}

function SectionLoader({
  message = "Loading...",
  className,
  minHeight = "200px",
}: SectionLoaderProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3", className)}
      style={{ minHeight }}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <Spinner size="lg" />
      {message && (
        <p className="text-sm text-[hsl(var(--muted-foreground))] animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}

// ── Page Loader ───────────────────────────────────────────────────────────────
function PageLoader({ message = "Loading RecruitPilot..." }: { message?: string }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[hsl(var(--background))]"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      {/* Logo mark */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--primary))] shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>

      <Spinner size="lg" />

      <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
        {message}
      </p>
    </div>
  );
}

// ── Inline Dots Loader (for tables, lists) ────────────────────────────────────
function DotsLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] animate-[pulse-soft_1.4s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

export { Spinner, SectionLoader, PageLoader, DotsLoader, spinnerVariants };
