import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, getInitials } from "@/lib/utils";

// ── Size variants ─────────────────────────────────────────────────────────────
const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden rounded-full select-none",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[9px]",
        sm: "h-8 w-8 text-xs",
        md: "h-9 w-9 text-sm",
        lg: "h-10 w-10 text-sm",
        xl: "h-12 w-12 text-base",
        "2xl": "h-16 w-16 text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// ── Indicator (online/offline) ────────────────────────────────────────────────
const indicatorVariants = cva(
  "absolute bottom-0 right-0 rounded-full border-2 border-[hsl(var(--background))]",
  {
    variants: {
      status: {
        online:  "bg-[hsl(var(--success))]",
        offline: "bg-[hsl(var(--muted-foreground)/0.5)]",
        busy:    "bg-[hsl(var(--warning))]",
        away:    "bg-[hsl(var(--warning))]",
      },
      size: {
        xs: "h-1.5 w-1.5 border",
        sm: "h-2 w-2",
        md: "h-2.5 w-2.5",
        lg: "h-3 w-3",
        xl: "h-3.5 w-3.5",
        "2xl": "h-4 w-4",
      },
    },
    defaultVariants: { status: "online", size: "md" },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string;
  status?: "online" | "offline" | "busy" | "away";
  fallbackClassName?: string;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, src, alt, name, status, fallbackClassName, ...props }, ref) => {
  const initials = name ? getInitials(name) : "?";

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size, className }))}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt ?? name ?? "Avatar"}
          className="h-full w-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full",
          "bg-gradient-to-br from-[hsl(var(--primary)/0.8)] to-[hsl(var(--primary))]",
          "text-white font-semibold tracking-wide",
          fallbackClassName
        )}
        delayMs={src ? 300 : 0}
      >
        {initials}
      </AvatarPrimitive.Fallback>

      {status && (
        <span
          className={cn(indicatorVariants({ status, size }))}
          aria-label={`Status: ${status}`}
        />
      )}
    </AvatarPrimitive.Root>
  );
});
Avatar.displayName = "Avatar";

// ── Avatar Group ──────────────────────────────────────────────────────────────
interface AvatarGroupProps {
  items: Array<{ src?: string; name?: string; alt?: string }>;
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
  className?: string;
}

function AvatarGroup({ items, max = 4, size = "md", className }: AvatarGroupProps) {
  const visible = items.slice(0, max);
  const overflow = items.length - max;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visible.map((item, i) => (
        <Avatar
          key={i}
          src={item.src}
          name={item.name}
          alt={item.alt}
          size={size}
          className="ring-2 ring-[hsl(var(--background))]"
        />
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            avatarVariants({ size }),
            "ring-2 ring-[hsl(var(--background))]",
            "flex items-center justify-center",
            "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]",
            "font-medium text-xs"
          )}
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}

export { Avatar, AvatarGroup, avatarVariants };
