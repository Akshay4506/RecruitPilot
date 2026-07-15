"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

// ── Trend badge ───────────────────────────────────────────────────────────────
interface TrendProps {
  value: number;
  label?: string;
  format?: "percent" | "absolute";
}

function Trend({ value, label, format = "percent" }: TrendProps) {
  const isPositive = value > 0;
  const isNeutral  = value === 0;
  const Icon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  const colorClass = isNeutral
    ? "text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))]"
    : isPositive
    ? "text-[hsl(var(--success))] bg-[hsl(var(--success-bg))]"
    : "text-[hsl(var(--danger))] bg-[hsl(var(--danger-bg))]";

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap", colorClass)}>
      <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
      {format === "percent" ? `${Math.abs(value)}%` : Math.abs(value)}
      {label && <span className="text-current/70 ml-0.5">{label}</span>}
    </span>
  );
}

// ── Metric Card ───────────────────────────────────────────────────────────────
export interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
  trendLabel?: string;
  trendFormat?: "percent" | "absolute";
  icon?: LucideIcon;
  iconColor?: string;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode; // Optional mini-chart slot
}

const MetricCardBase = ({
  title,
  value,
  description,
  trend,
  trendLabel,
  trendFormat,
  icon: Icon,
  iconColor,
  loading = false,
  className,
  children,
}: MetricCardProps) => {
  if (loading) {
    return (
      <Card className={cn("p-5", className)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="h-3.5 w-24 rounded bg-[hsl(var(--muted))] animate-[shimmer_2s_linear_infinite] bg-[length:200%_100%]" />
            <div className="h-7 w-20 rounded bg-[hsl(var(--muted))] animate-[shimmer_2s_linear_infinite] bg-[length:200%_100%]" />
            <div className="h-3 w-16 rounded bg-[hsl(var(--muted))] animate-[shimmer_2s_linear_infinite] bg-[length:200%_100%]" />
          </div>
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--muted))] animate-[shimmer_2s_linear_infinite] bg-[length:200%_100%]" />
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[hsl(var(--muted-foreground))] line-clamp-2">
            {title}
          </p>
          <p className="mt-1.5 text-2xl font-bold text-[hsl(var(--foreground))] tracking-tight">
            {value}
          </p>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {trend !== undefined && (
              <Trend value={trend} label={trendLabel} format={trendFormat} />
            )}
            {description && (
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                {description}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              "bg-[hsl(var(--primary)/0.1)]",
              iconColor
            )}
            aria-hidden="true"
          >
            <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
          </div>
        )}
      </div>

      {/* Optional mini-chart slot */}
      {children && (
        <div className="mt-4 -mx-5 -mb-5 px-5 pb-4 border-t border-[hsl(var(--border))]">
          {children}
        </div>
      )}
    </Card>
  );
}

export const MetricCard = React.memo(MetricCardBase);
export { Trend };
