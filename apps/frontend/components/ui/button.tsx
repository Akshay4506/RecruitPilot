"use client";

import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles shared across all variants
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium text-sm rounded-md",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
          "hover:bg-[hsl(var(--primary)/0.9)] active:bg-[hsl(var(--primary)/0.85)]",
          "shadow-[0_1px_3px_0_rgb(0_0_0/0.1)]",
          "hover:shadow-[0_4px_12px_0_rgb(99_102_241/0.35)]",
        ].join(" "),
        secondary: [
          "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
          "hover:bg-[hsl(var(--secondary)/0.8)] active:bg-[hsl(var(--secondary)/0.7)]",
          "border border-[hsl(var(--border))]",
        ].join(" "),
        outline: [
          "border border-[hsl(var(--border))] bg-transparent",
          "text-[hsl(var(--foreground))]",
          "hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
          "active:bg-[hsl(var(--accent)/0.8)]",
        ].join(" "),
        ghost: [
          "bg-transparent text-[hsl(var(--foreground))]",
          "hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
          "active:bg-[hsl(var(--accent)/0.8)]",
        ].join(" "),
        link: [
          "bg-transparent text-[hsl(var(--primary))] underline-offset-4",
          "hover:underline",
          "h-auto px-0 py-0",
        ].join(" "),
        destructive: [
          "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]",
          "hover:bg-[hsl(var(--destructive)/0.9)] active:bg-[hsl(var(--destructive)/0.85)]",
          "shadow-[0_1px_3px_0_rgb(0_0_0/0.1)]",
        ].join(" "),
        "destructive-outline": [
          "border border-[hsl(var(--destructive)/0.5)] bg-transparent",
          "text-[hsl(var(--destructive))]",
          "hover:bg-[hsl(var(--destructive)/0.08)]",
        ].join(" "),
      },
      size: {
        xs:   "h-7 px-2.5 text-xs rounded",
        sm:   "h-8 px-3 text-xs",
        md:   "h-9 px-4 text-sm",
        lg:   "h-10 px-5 text-sm",
        xl:   "h-12 px-6 text-base",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-xs": "h-7 w-7 p-0",
        "icon-lg": "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <Slottable>{children}</Slottable>
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
