"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface MultiSelectFilterProps {
  title: string;
  options: FilterOption[];
  selectedValues: Set<string>;
  onSelectionChange: (values: Set<string>) => void;
  className?: string;
  placeholder?: string;
}

function MultiSelectFilter({
  title,
  options,
  selectedValues,
  onSelectionChange,
  className,
  placeholder = "Search options...",
}: MultiSelectFilterProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (val: string) => {
    const next = new Set(selectedValues);
    if (next.has(val)) {
      next.delete(val);
    } else {
      next.add(val);
    }
    onSelectionChange(next);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectionChange(new Set());
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex h-9 items-center justify-between gap-2 rounded-md border border-[hsl(var(--input))]",
            "bg-[hsl(var(--background))] px-3 py-1 text-sm shadow-sm transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]",
            "hover:bg-[hsl(var(--accent))]",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium text-[hsl(var(--muted-foreground))] shrink-0">{title}</span>
            {selectedValues.size > 0 && (
              <>
                <div className="h-4 w-px bg-[hsl(var(--border))] mx-1" />
                <Badge variant="neutral" size="sm" className="px-1.5 font-normal">
                  {selectedValues.size} selected
                </Badge>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0 text-[hsl(var(--muted-foreground))]">
            {selectedValues.size > 0 && (
              <X
                className="h-3.5 w-3.5 hover:text-[hsl(var(--foreground))] cursor-pointer"
                onClick={handleClear}
              />
            )}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </div>
        </button>
      </PopoverPrimitive.Trigger>
      
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={cn(
            "z-50 w-[240px] rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--popover))] p-0 shadow-md outline-none",
            "data-[state=open]:animate-[fade-in-up_150ms_ease-out]",
            "data-[state=closed]:animate-[fade-out_150ms_ease-in]"
          )}
        >
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          isSelected
                            ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-white"
                            : "border-[hsl(var(--input))] opacity-50"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      {option.icon && (
                        <div className="mr-2 text-[hsl(var(--muted-foreground))]">
                          {option.icon}
                        </div>
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export { MultiSelectFilter };
