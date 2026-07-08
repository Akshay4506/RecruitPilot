import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  [
    "relative flex items-start gap-3 rounded-lg border p-4",
    "text-sm",
  ].join(" "),
  {
    variants: {
      variant: {
        default:  "bg-[hsl(var(--card))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]",
        success:  "bg-[hsl(var(--success-bg))] border-[hsl(var(--success)/0.25)] text-[hsl(var(--success))]",
        warning:  "bg-[hsl(var(--warning-bg))] border-[hsl(var(--warning)/0.25)] text-[hsl(var(--warning))]",
        error:    "bg-[hsl(var(--danger-bg))] border-[hsl(var(--danger)/0.25)] text-[hsl(var(--danger))]",
        info:     "bg-[hsl(var(--info-bg))] border-[hsl(var(--info)/0.25)] text-[hsl(var(--info))]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const ALERT_ICONS: Record<string, LucideIcon> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error:   AlertCircle,
  info:    Info,
  default: Info,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: LucideIcon;
  dismissible?: boolean;
  onDismiss?: () => void;
}

function Alert({
  className,
  variant = "default",
  title,
  icon: CustomIcon,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const Icon = CustomIcon ?? ALERT_ICONS[variant ?? "default"];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    >
      {Icon && (
        <Icon className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
      )}

      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold leading-snug mb-0.5">{title}</p>
        )}
        {children && (
          <div className="text-current/80 leading-relaxed text-[0.8125rem]">
            {children}
          </div>
        )}
      </div>

      {dismissible && (
        <button
          onClick={onDismiss}
          className={cn(
            "shrink-0 rounded p-0.5 -mt-0.5 -mr-0.5",
            "opacity-60 hover:opacity-100 transition-opacity",
            "focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1"
          )}
          aria-label="Dismiss alert"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export { Alert, alertVariants };
