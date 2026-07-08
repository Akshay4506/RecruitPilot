import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime, formatDate } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type TimelineItemStatus =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "pending"
  | "neutral";

export interface TimelineActor {
  name: string;
  avatarSrc?: string;
  role?: string;
}

export interface TimelineMetadata {
  [key: string]: string | number | boolean | null | undefined;
}

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  /** Timestamp — ISO string or Date */
  timestamp: string | Date;
  status?: TimelineItemStatus;
  icon?: LucideIcon;
  actor?: TimelineActor;
  badge?: string;
  /** Key-value metadata shown in expandable section */
  metadata?: TimelineMetadata;
  /** Whether metadata is expanded by default */
  defaultExpanded?: boolean;
}

export interface TimelineProps {
  items: TimelineItem[];
  /** Show relative timestamps (e.g. "3h ago") or absolute dates */
  timestampFormat?: "relative" | "absolute";
  /** Highlight the first item as "current" */
  highlightFirst?: boolean;
  className?: string;
  /** Empty state title when no items */
  emptyTitle?: string;
  /** Empty state description when no items */
  emptyDescription?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Status dot
// ─────────────────────────────────────────────────────────────────────────────
const statusDotStyles: Record<TimelineItemStatus, string> = {
  success: "bg-[hsl(var(--success))] shadow-[0_0_0_3px_hsl(var(--success)/0.15)]",
  warning: "bg-[hsl(var(--warning))] shadow-[0_0_0_3px_hsl(var(--warning)/0.15)]",
  error:   "bg-[hsl(var(--danger))] shadow-[0_0_0_3px_hsl(var(--danger)/0.15)]",
  info:    "bg-[hsl(var(--info))] shadow-[0_0_0_3px_hsl(var(--info)/0.15)]",
  pending: "bg-[hsl(var(--warning))] animate-pulse shadow-[0_0_0_3px_hsl(var(--warning)/0.15)]",
  neutral: "bg-[hsl(var(--border))] border-2 border-[hsl(var(--muted-foreground)/0.4)]",
};

// ─────────────────────────────────────────────────────────────────────────────
// Single Timeline Item
// ─────────────────────────────────────────────────────────────────────────────
function TimelineItemRow({
  item,
  isLast,
  isFirst,
  highlightFirst,
  timestampFormat,
}: {
  item: TimelineItem;
  isLast: boolean;
  isFirst: boolean;
  highlightFirst: boolean;
  timestampFormat: "relative" | "absolute";
}) {
  const [expanded, setExpanded] = React.useState(item.defaultExpanded ?? false);
  const hasMetadata = item.metadata && Object.keys(item.metadata).length > 0;
  const Icon = item.icon;
  const status: TimelineItemStatus = item.status ?? "neutral";
  const isHighlighted = isFirst && highlightFirst;

  const ts =
    timestampFormat === "relative"
      ? formatRelativeTime(item.timestamp)
      : formatDate(item.timestamp, { hour: "2-digit", minute: "2-digit" });

  return (
    <li className="relative flex gap-4 group">
      {/* ── Connector line ─────────────────────────────────────────────── */}
      {!isLast && (
        <div
          className="absolute left-[15px] top-7 bottom-0 w-px bg-[hsl(var(--border))]"
          aria-hidden="true"
        />
      )}

      {/* ── Icon / dot column ──────────────────────────────────────────── */}
      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center">
        {Icon ? (
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border",
              "border-[hsl(var(--border))] bg-[hsl(var(--card))]",
              isHighlighted && "border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.08)]"
            )}
          >
            <Icon
              className={cn(
                "h-3.5 w-3.5",
                isHighlighted
                  ? "text-[hsl(var(--primary))]"
                  : "text-[hsl(var(--muted-foreground))]"
              )}
              aria-hidden
            />
          </div>
        ) : (
          <span
            className={cn("h-2.5 w-2.5 rounded-full", statusDotStyles[status])}
            aria-hidden
          />
        )}
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex-1 pb-6 min-w-0",
          isLast && "pb-0"
        )}
      >
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={cn(
                "text-sm font-medium text-[hsl(var(--foreground))] leading-snug",
                isHighlighted && "text-[hsl(var(--primary))]"
              )}
            >
              {item.title}
            </p>
            {item.badge && (
              <Badge variant="neutral" size="sm">
                {item.badge}
              </Badge>
            )}
          </div>
          <time
            dateTime={new Date(item.timestamp).toISOString()}
            className="shrink-0 text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5"
          >
            {ts}
          </time>
        </div>

        {/* Description */}
        {item.description && (
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Actor */}
        {item.actor && (
          <div className="mt-2 flex items-center gap-2">
            <Avatar
              size="xs"
              src={item.actor.avatarSrc}
              name={item.actor.name}
            />
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              {item.actor.name}
              {item.actor.role && (
                <span className="ml-1 opacity-60">· {item.actor.role}</span>
              )}
            </span>
          </div>
        )}

        {/* Expandable metadata */}
        {hasMetadata && (
          <div className="mt-2">
            <button
              onClick={() => setExpanded((v) => !v)}
              className={cn(
                "text-xs text-[hsl(var(--muted-foreground))]",
                "hover:text-[hsl(var(--foreground))] transition-colors duration-100",
                "focus:outline-none focus:underline"
              )}
              aria-expanded={expanded}
            >
              {expanded ? "Hide details ↑" : "Show details ↓"}
            </button>

            {expanded && (
              <dl
                className={cn(
                  "mt-2 rounded-lg border border-[hsl(var(--border))]",
                  "bg-[hsl(var(--muted)/0.4)] px-3 py-2.5",
                  "grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs",
                  "animate-[fade-in-up_150ms_ease-out]"
                )}
              >
                {Object.entries(item.metadata!).map(([key, val]) => (
                  <React.Fragment key={key}>
                    <dt className="text-[hsl(var(--muted-foreground))] truncate capitalize">
                      {key.replace(/_/g, " ")}
                    </dt>
                    <dd className="text-[hsl(var(--foreground))] font-medium truncate">
                      {val == null ? "—" : String(val)}
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Timeline
// ─────────────────────────────────────────────────────────────────────────────
function Timeline({
  items,
  timestampFormat = "relative",
  highlightFirst = false,
  className,
  emptyTitle = "No activity yet",
  emptyDescription = "Activity will appear here once events occur.",
}: TimelineProps) {
  if (items.length === 0) {
    return (
      <div className={cn("py-10 text-center", className)}>
        <p className="text-sm font-medium text-[hsl(var(--foreground))]">{emptyTitle}</p>
        <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <ol
      className={cn("relative space-y-0", className)}
      aria-label="Activity timeline"
    >
      {items.map((item, index) => (
        <TimelineItemRow
          key={item.id}
          item={item}
          isFirst={index === 0}
          isLast={index === items.length - 1}
          highlightFirst={highlightFirst}
          timestampFormat={timestampFormat}
        />
      ))}
    </ol>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Timeline skeleton
// ─────────────────────────────────────────────────────────────────────────────
function TimelineSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <ol className="relative space-y-0" aria-label="Loading timeline" aria-busy>
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="relative flex gap-4">
          {i < rows - 1 && (
            <div className="absolute left-[15px] top-7 bottom-0 w-px bg-[hsl(var(--border))]" aria-hidden />
          )}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--muted))] animate-pulse" />
          </div>
          <div className="flex-1 pb-6 space-y-1.5">
            <div className="flex justify-between items-center gap-4">
              <div className="h-3.5 rounded bg-[hsl(var(--muted))] animate-pulse" style={{ width: `${40 + i * 10}%` }} />
              <div className="h-3 w-12 rounded bg-[hsl(var(--muted))] animate-pulse" />
            </div>
            <div className="h-3 rounded bg-[hsl(var(--muted))] animate-pulse" style={{ width: `${60 + i * 5}%` }} />
          </div>
        </li>
      ))}
    </ol>
  );
}

export { Timeline, TimelineSkeleton };
