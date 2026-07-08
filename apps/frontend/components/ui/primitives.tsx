import * as React from "react";
import { cn } from "@/lib/utils";

// ── Separator ─────────────────────────────────────────────────────────────────
interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-[hsl(var(--border))]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
}

// ── Label ─────────────────────────────────────────────────────────────────────
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-[hsl(var(--foreground))]",
        "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-[hsl(var(--destructive))]" aria-hidden="true">*</span>
      )}
    </label>
  )
);
Label.displayName = "Label";

// ── Scroll Area ───────────────────────────────────────────────────────────────
interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: string;
}

function ScrollArea({ className, maxHeight = "400px", children, ...props }: ScrollAreaProps) {
  return (
    <div
      className={cn("overflow-auto", className)}
      style={{ maxHeight }}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const positionMap = {
    top:    "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left:   "right-full mr-2 top-1/2 -translate-y-1/2",
    right:  "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 px-2.5 py-1.5 rounded-md",
            "bg-[hsl(var(--foreground))] text-[hsl(var(--background))]",
            "text-xs font-medium whitespace-nowrap shadow-lg",
            "pointer-events-none",
            "animate-[fade-in_150ms_ease-out]",
            positionMap[side],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

// ── Progress ──────────────────────────────────────────────────────────────────
interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  trackClassName?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "danger";
}

function Progress({
  value,
  max = 100,
  className,
  trackClassName,
  showLabel = false,
  size = "md",
  variant = "default",
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeMap = { sm: "h-1", md: "h-2", lg: "h-3" };
  const variantMap = {
    default: "bg-[hsl(var(--primary))]",
    success: "bg-[hsl(var(--success))]",
    warning: "bg-[hsl(var(--warning))]",
    danger:  "bg-[hsl(var(--danger))]",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          "flex-1 overflow-hidden rounded-full bg-[hsl(var(--muted))]",
          sizeMap[size],
          trackClassName
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            variantMap[variant]
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-[hsl(var(--muted-foreground))] w-8 text-right">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}

export { Separator, Label, ScrollArea, Tooltip, Progress };
