import * as React from "react";
import { LucideIcon, SearchX, FolderOpen, Users, Briefcase, Calendar, FileText, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ── Pre-defined empty state illustrations ─────────────────────────────────────
const EMPTY_ICONS: Record<string, LucideIcon> = {
  default:      FolderOpen,
  search:       SearchX,
  candidates:   Users,
  jobs:         Briefcase,
  interviews:   Calendar,
  documents:    FileText,
  analytics:    BarChart3,
};

export interface EmptyStateProps {
  type?: keyof typeof EMPTY_ICONS;
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

function EmptyState({
  type = "default",
  icon: CustomIcon,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = "md",
}: EmptyStateProps) {
  const Icon = CustomIcon ?? EMPTY_ICONS[type];

  const sizeConfig = {
    sm: { wrapper: "py-8", icon: "h-10 w-10", iconWrapper: "h-16 w-16", title: "text-sm", desc: "text-xs" },
    md: { wrapper: "py-12", icon: "h-12 w-12", iconWrapper: "h-20 w-20", title: "text-base", desc: "text-sm" },
    lg: { wrapper: "py-16", icon: "h-14 w-14", iconWrapper: "h-24 w-24", title: "text-lg", desc: "text-base" },
  };
  const cfg = sizeConfig[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        cfg.wrapper,
        className
      )}
      role="status"
      aria-live="polite"
    >
      {/* Icon container */}
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl mb-4",
          cfg.iconWrapper,
          "bg-[hsl(var(--muted))]"
        )}
        aria-hidden="true"
      >
        <Icon className={cn(cfg.icon, "text-[hsl(var(--muted-foreground))]")} />
      </div>

      {/* Text */}
      <h3 className={cn("font-semibold text-[hsl(var(--foreground))] mb-1.5", cfg.title)}>
        {title}
      </h3>
      {description && (
        <p className={cn("text-[hsl(var(--muted-foreground))] max-w-sm mx-auto", cfg.desc)}>
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="mt-5 flex items-center gap-3">
          {action && (
            <Button
              variant="primary"
              size="sm"
              onClick={action.onClick}
              loading={action.loading}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" size="sm" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export { EmptyState };
