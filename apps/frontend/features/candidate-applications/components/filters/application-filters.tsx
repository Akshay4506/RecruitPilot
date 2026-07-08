import * as React from "react";
import { Button } from "@/components/ui/button";
import { MultiSelectFilter } from "@/components/filters/multi-select-filter";
import { SlidersHorizontal, X } from "lucide-react";

export interface ApplicationFilterState {
  status: Set<string>;
  stage: Set<string>;
  sort: string;
}

interface ApplicationFiltersProps {
  filters: ApplicationFilterState;
  onFilterChange: (filters: ApplicationFilterState) => void;
  onClear: () => void;
  className?: string;
}

export function ApplicationFilters({ filters, onFilterChange, onClear, className }: ApplicationFiltersProps) {
  
  const updateFilter = (key: keyof ApplicationFilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className={`bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-6 ${className || ""}`}>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[hsl(var(--foreground))] font-semibold">
          <SlidersHorizontal className="h-4 w-4" />
          <h2>Filters</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear} className="h-8 text-xs text-[hsl(var(--muted-foreground))]">
          <X className="mr-1 h-3 w-3" /> Clear
        </Button>
      </div>

      <div className="space-y-5">
        
        {/* Sort */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Sort By</label>
          <select 
            className="w-full h-9 rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))]"
            value={filters.sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
          >
            <option value="newest">Recently Updated</option>
            <option value="oldest">Oldest First</option>
            <option value="applied-desc">Newest Applications</option>
            <option value="applied-asc">Oldest Applications</option>
          </select>
        </div>

        {/* Status */}
        <MultiSelectFilter
          title="Status"
          options={[
            { label: "Active", value: "ACTIVE" },
            { label: "Withdrawn", value: "WITHDRAWN" },
            { label: "Rejected", value: "REJECTED" },
            { label: "Hired", value: "HIRED" },
          ]}
          selectedValues={filters.status}
          onSelectionChange={(vals) => updateFilter("status", vals)}
        />

        {/* Stage */}
        <MultiSelectFilter
          title="Current Stage"
          options={[
            { label: "Submitted", value: "SUBMITTED" },
            { label: "Under Review", value: "UNDER_REVIEW" },
            { label: "Shortlisted", value: "SHORTLISTED" },
            { label: "Interviewing", value: "INTERVIEW" },
            { label: "Offer", value: "OFFER" },
          ]}
          selectedValues={filters.stage}
          onSelectionChange={(vals) => updateFilter("stage", vals)}
        />

      </div>
    </div>
  );
}
