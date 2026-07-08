import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── Base Card ─────────────────────────────────────────────────────────────────
const cardVariants = cva(
  [
    "rounded-xl border bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]",
    "transition-all duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        default:  "border-[hsl(var(--border))] shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]",
        elevated: "border-[hsl(var(--border))] shadow-[0_4px_12px_0_rgb(0_0_0/0.08)]",
        ghost:    "border-transparent shadow-none bg-transparent",
        outline:  "border-[hsl(var(--border))] shadow-none bg-transparent",
        filled:   "border-transparent bg-[hsl(var(--secondary))] shadow-none",
      },
      hoverable: {
        true: "cursor-pointer hover:shadow-[0_8px_24px_0_rgb(0_0_0/0.1)] hover:-translate-y-0.5 hover:border-[hsl(var(--primary)/0.3)]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      hoverable: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hoverable, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, hoverable, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

// ── Card sections ─────────────────────────────────────────────────────────────
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 p-5 pb-3", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-semibold text-base leading-snug text-[hsl(var(--foreground))]", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-[hsl(var(--muted-foreground))]", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center px-5 py-4",
        "border-t border-[hsl(var(--border))]",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
