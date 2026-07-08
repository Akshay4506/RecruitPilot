"use client";

import * as React from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/primitives";

export interface DateRange {
  from?: string; // ISO date string (YYYY-MM-DD)
  to?: string;
}

export interface DateFilterProps {
  title?: string;
  value: DateRange;
  onChange: (value: DateRange) => void;
  className?: string;
}

function DateFilter({
  title = "Date",
  value,
  onChange,
  className,
}: DateFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [localValue, setLocalValue] = React.useState<DateRange>(value);

  // Sync local state when popover opens
  React.useEffect(() => {
    if (open) setLocalValue(value);
  }, [open, value]);

  const hasValue = !!value.from || !!value.to;

  const handleApply = () => {
    onChange(localValue);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange({ from: undefined, to: undefined });
    setLocalValue({ from: undefined, to: undefined });
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          className={cn(
            "flex h-9 items-center justify-between gap-2 rounded-md border border-[hsl(var(--input))]",
            "bg-[hsl(var(--background))] px-3 py-1 text-sm shadow-sm transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]",
            "hover:bg-[hsl(var(--accent))]",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <span className="font-medium text-[hsl(var(--muted-foreground))] shrink-0">
              {title}
            </span>
            {hasValue && (
              <>
                <div className="h-4 w-px bg-[hsl(var(--border))] mx-1" />
                <Badge variant="neutral" size="sm" className="px-1.5 font-normal">
                  {value.from ? new Date(value.from).toLocaleDateString() : "Any"} 
                  {" - "} 
                  {value.to ? new Date(value.to).toLocaleDateString() : "Any"}
                </Badge>
              </>
            )}
          </div>
          {hasValue && (
            <X
              className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] cursor-pointer shrink-0"
              onClick={handleClear}
            />
          )}
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={cn(
            "z-50 w-[280px] rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--popover))] p-4 shadow-md outline-none",
            "data-[state=open]:animate-[fade-in-up_150ms_ease-out]",
            "data-[state=closed]:animate-[fade-out_150ms_ease-in]"
          )}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date-from">From</Label>
              <input
                id="date-from"
                type="date"
                value={localValue.from ?? ""}
                onChange={(e) => setLocalValue({ ...localValue, from: e.target.value || undefined })}
                className="flex h-9 w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-to">To</Label>
              <input
                id="date-to"
                type="date"
                value={localValue.to ?? ""}
                onChange={(e) => setLocalValue({ ...localValue, to: e.target.value || undefined })}
                className="flex h-9 w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[hsl(var(--border))]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocalValue({ from: undefined, to: undefined })}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export { DateFilter };
