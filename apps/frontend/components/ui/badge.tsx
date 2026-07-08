import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5",
    "text-xs font-medium leading-none",
    "transition-colors duration-150",
    "border",
  ].join(" "),
  {
    variants: {
      variant: {
        default:     "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border-transparent",
        primary:     "bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.2)]",
        success:     "bg-[hsl(var(--success-bg))] text-[hsl(var(--success))] border-[hsl(var(--success)/0.2)]",
        warning:     "bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.2)]",
        danger:      "bg-[hsl(var(--danger-bg))] text-[hsl(var(--danger))] border-[hsl(var(--danger)/0.2)]",
        info:        "bg-[hsl(var(--info-bg))] text-[hsl(var(--info))] border-[hsl(var(--info)/0.2)]",
        neutral:     "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-transparent",
        outline:     "bg-transparent text-[hsl(var(--foreground))] border-[hsl(var(--border))]",
        destructive: "bg-[hsl(var(--destructive)/0.1)] text-[hsl(var(--destructive))] border-[hsl(var(--destructive)/0.2)]",
      },
      size: {
        sm: "px-2 py-0 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-current opacity-80 shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
