import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckCircle2, XCircle, Clock, AlertCircle, Ban,
  Circle, Send, Pause, Eye, LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
    "text-xs font-medium leading-none",
    "border whitespace-nowrap",
    "transition-colors duration-150",
  ].join(" "),
  {
    variants: {
      variant: {
        // Application/Job statuses
        active:      "bg-[hsl(var(--success-bg))] text-[hsl(var(--success))] border-[hsl(var(--success)/0.2)]",
        inactive:    "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-transparent",
        draft:       "bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.2)]",
        published:   "bg-[hsl(var(--success-bg))] text-[hsl(var(--success))] border-[hsl(var(--success)/0.2)]",
        scheduled:   "bg-[hsl(var(--info-bg))] text-[hsl(var(--info))] border-[hsl(var(--info)/0.2)]",
        closed:      "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-transparent",
        pending:     "bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.2)]",
        approved:    "bg-[hsl(var(--success-bg))] text-[hsl(var(--success))] border-[hsl(var(--success)/0.2)]",
        rejected:    "bg-[hsl(var(--danger-bg))] text-[hsl(var(--danger))] border-[hsl(var(--danger)/0.2)]",
        // Generic semantics
        success:     "bg-[hsl(var(--success-bg))] text-[hsl(var(--success))] border-[hsl(var(--success)/0.2)]",
        warning:     "bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.2)]",
        error:       "bg-[hsl(var(--danger-bg))] text-[hsl(var(--danger))] border-[hsl(var(--danger)/0.2)]",
        info:        "bg-[hsl(var(--info-bg))] text-[hsl(var(--info))] border-[hsl(var(--info)/0.2)]",
        neutral:     "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-transparent",
        // Interview-specific
        confirmed:   "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.2)]",
        "in-progress": "bg-[hsl(var(--info-bg))] text-[hsl(var(--info))] border-[hsl(var(--info)/0.2)]",
        completed:   "bg-[hsl(var(--success-bg))] text-[hsl(var(--success))] border-[hsl(var(--success)/0.2)]",
        cancelled:   "bg-[hsl(var(--danger-bg))] text-[hsl(var(--danger))] border-[hsl(var(--danger)/0.2)]",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

// Status icon map
const STATUS_ICONS: Record<string, LucideIcon> = {
  active:      CheckCircle2,
  published:   CheckCircle2,
  approved:    CheckCircle2,
  success:     CheckCircle2,
  completed:   CheckCircle2,
  rejected:    XCircle,
  error:       XCircle,
  cancelled:   XCircle,
  closed:      Ban,
  inactive:    Circle,
  neutral:     Circle,
  draft:       Pause,
  pending:     Clock,
  warning:     AlertCircle,
  scheduled:   Send,
  info:        Eye,
  confirmed:   CheckCircle2,
  "in-progress": Clock,
};

export interface StatusChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {
  showIcon?: boolean;
  icon?: LucideIcon;
  label?: string;
}

function StatusChip({
  className,
  variant,
  showIcon = true,
  icon: CustomIcon,
  label,
  children,
  ...props
}: StatusChipProps) {
  const Icon = CustomIcon ?? (variant ? STATUS_ICONS[variant] : undefined);
  const displayText = label ?? children;

  return (
    <span className={cn(chipVariants({ variant, className }))} {...props}>
      {showIcon && Icon && (
        <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
      )}
      {displayText}
    </span>
  );
}

// ── Convenience exports for common statuses ────────────────────────────────────
const JobStatusChip = ({ status }: { status: string }) => {
  const map: Record<string, VariantProps<typeof chipVariants>["variant"]> = {
    DRAFT: "draft",
    PUBLISHED: "published",
    CLOSED: "closed",
  };
  const label: Record<string, string> = {
    DRAFT: "Draft",
    PUBLISHED: "Published",
    CLOSED: "Closed",
  };
  return <StatusChip variant={map[status] ?? "neutral"}>{label[status] ?? status}</StatusChip>;
};

const ApplicationStatusChip = ({ status }: { status: string }) => {
  const map: Record<string, VariantProps<typeof chipVariants>["variant"]> = {
    APPLIED: "info",
    SCREENING: "pending",
    INTERVIEW: "scheduled",
    OFFER: "approved",
    HIRED: "success",
    REJECTED: "rejected",
  };
  const label: Record<string, string> = {
    APPLIED: "Applied",
    SCREENING: "Screening",
    INTERVIEW: "Interview",
    OFFER: "Offer",
    HIRED: "Hired",
    REJECTED: "Rejected",
  };
  return <StatusChip variant={map[status] ?? "neutral"}>{label[status] ?? status}</StatusChip>;
};

const InterviewStatusChip = ({ status }: { status: string }) => {
  const map: Record<string, VariantProps<typeof chipVariants>["variant"]> = {
    DRAFT: "draft",
    SCHEDULED: "scheduled",
    CONFIRMED: "confirmed",
    IN_PROGRESS: "in-progress",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
  };
  const label: Record<string, string> = {
    DRAFT: "Draft",
    SCHEDULED: "Scheduled",
    CONFIRMED: "Confirmed",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  };
  return <StatusChip variant={map[status] ?? "neutral"}>{label[status] ?? status}</StatusChip>;
};

export {
  StatusChip,
  JobStatusChip,
  ApplicationStatusChip,
  InterviewStatusChip,
  chipVariants,
};
