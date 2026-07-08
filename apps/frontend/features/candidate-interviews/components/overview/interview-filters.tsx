import * as React from "react";
import { InterviewStatus, InterviewType } from "../../types";
import { Button } from "@/components/ui/button";
import { Search, FilterX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, Separator } from "@/components/ui/primitives";

export interface InterviewFilterState {
  status: Set<InterviewStatus>;
  type: Set<InterviewType>;
  search: string;
  sort: "upcoming" | "newest" | "completed";
}

interface InterviewFiltersProps {
  filters: InterviewFilterState;
  onFilterChange: (filters: InterviewFilterState) => void;
  onClear: () => void;
}

const STATUS_OPTIONS: { label: string; value: InterviewStatus }[] = [
  { label: "Scheduled", value: "SCHEDULED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const TYPE_OPTIONS: { label: string; value: InterviewType }[] = [
  { label: "Initial Screen", value: "INITIAL_SCREEN" },
  { label: "Technical", value: "TECHNICAL" },
  { label: "System Design", value: "SYSTEM_DESIGN" },
  { label: "Behavioral", value: "BEHAVIORAL" },
  { label: "Founder Chat", value: "FOUNDER_CHAT" },
];

export function InterviewFilters({ filters, onFilterChange, onClear }: InterviewFiltersProps) {
  
  const handleStatusToggle = (status: InterviewStatus) => {
    const next = new Set(filters.status);
    if (next.has(status)) next.delete(status);
    else next.add(status);
    onFilterChange({ ...filters, status: next });
  };

  const handleTypeToggle = (type: InterviewType) => {
    const next = new Set(filters.type);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    onFilterChange({ ...filters, type: next });
  };

  const activeCount = filters.status.size + filters.type.size + (filters.search ? 1 : 0);

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm flex flex-col h-[calc(100vh-8rem)]">
      
      <div className="p-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
        <h2 className="font-semibold text-[hsl(var(--foreground))]">Filters</h2>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-8 px-2 text-[hsl(var(--muted-foreground))]">
            <FilterX className="h-3.5 w-3.5 mr-1" /> Clear ({activeCount})
          </Button>
        )}
      </div>

      <div className="p-4 border-b border-[hsl(var(--border))]">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <Input 
            placeholder="Search company or job..." 
            className="pl-9 bg-[hsl(var(--muted)/0.5)] border-none"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[hsl(var(--foreground))]">Status</h3>
            <div className="flex flex-col gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-[hsl(var(--muted)/0.3)] p-1 -ml-1 rounded">
                  <input
                    type="checkbox"
                    className="rounded border-[hsl(var(--input))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))]"
                    checked={filters.status.has(opt.value)}
                    onChange={() => handleStatusToggle(opt.value)}
                  />
                  <span className="text-[hsl(var(--muted-foreground))]">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[hsl(var(--foreground))]">Interview Type</h3>
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((opt) => {
                const isActive = filters.type.has(opt.value);
                return (
                  <Badge 
                    key={opt.value}
                    variant={isActive ? "default" : "outline"}
                    className={`cursor-pointer hover:opacity-80 ${!isActive ? 'bg-[hsl(var(--background))]' : ''}`}
                    onClick={() => handleTypeToggle(opt.value)}
                  >
                    {opt.label}
                  </Badge>
                );
              })}
            </div>
          </div>
          
          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[hsl(var(--foreground))]">Sort By</h3>
            <select 
              className="w-full text-sm rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--ring))] focus:outline-none"
              value={filters.sort}
              onChange={(e) => onFilterChange({ ...filters, sort: e.target.value as any })}
            >
              <option value="upcoming">Upcoming First</option>
              <option value="newest">Recently Scheduled</option>
              <option value="completed">Completed First</option>
            </select>
          </div>

        </div>
      </ScrollArea>
      
    </div>
  );
}
