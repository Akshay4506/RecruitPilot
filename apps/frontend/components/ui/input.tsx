import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      type = "text",
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-[hsl(var(--foreground))]",
              disabled && "opacity-50",
              labelClassName
            )}
          >
            {label}
            {props.required && (
              <span className="ml-0.5 text-[hsl(var(--destructive))]" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[hsl(var(--muted-foreground))]"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            className={cn(
              // Base
              "flex h-9 w-full rounded-md border bg-transparent px-3 py-1",
              "text-sm text-[hsl(var(--foreground))]",
              "placeholder:text-[hsl(var(--muted-foreground))]",
              // Border & ring
              "border-[hsl(var(--input))]",
              "ring-offset-background",
              "transition-colors duration-150",
              // Focus
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-1",
              // States
              "disabled:cursor-not-allowed disabled:opacity-50",
              // Error
              error && "border-[hsl(var(--destructive))] focus-visible:ring-[hsl(var(--destructive)/0.4)]",
              // Icon padding
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              className
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div
              className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[hsl(var(--muted-foreground))]"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-xs text-[hsl(var(--destructive))]" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-[hsl(var(--muted-foreground))]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// ── Textarea ──────────────────────────────────────────────────────────────────
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, label, error, hint, id, disabled, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn("text-sm font-medium text-[hsl(var(--foreground))]", disabled && "opacity-50")}
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-[hsl(var(--input))]",
            "bg-transparent px-3 py-2 text-sm",
            "placeholder:text-[hsl(var(--muted-foreground))]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            error && "border-[hsl(var(--destructive))]",
            className
          )}
          ref={ref}
          disabled={disabled}
          aria-invalid={!!error}
          {...props}
        />
        {error && <p className="text-xs text-[hsl(var(--destructive))]" role="alert">{error}</p>}
        {hint && !error && <p className="text-xs text-[hsl(var(--muted-foreground))]">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
