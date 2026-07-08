import * as React from "react";
import { Button } from "@/components/ui/button";
import { MultiSelectFilter } from "@/components/filters/multi-select-filter";
import { SlidersHorizontal, X } from "lucide-react";

export interface JobFilterState {
  workMode: Set<string>;
  employmentType: Set<string>;
  experience: Set<string>;
  department: Set<string>;
  sort: string;
}

interface AdvancedFiltersProps {
  filters: JobFilterState;
  onFilterChange: (filters: JobFilterState) => void;
  onClear: () => void;
  className?: string;
}

export function AdvancedFilters({ filters, onFilterChange, onClear, className }: AdvancedFiltersProps) {
  
  const updateFilter = (key: keyof JobFilterState, value: any) => {
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
            <option value="newest">Newest</option>
            <option value="relevant">Most Relevant</option>
            <option value="salary">Highest Salary</option>
            <option value="closing">Closing Soon</option>
          </select>
        </div>

        {/* Work Mode */}
        <MultiSelectFilter
          title="Work Mode"
          options={[
            { label: "Remote", value: "REMOTE" },
            { label: "Hybrid", value: "HYBRID" },
            { label: "On-site", value: "ON_SITE" },
          ]}
          selectedValues={filters.workMode}
          onSelectionChange={(vals) => updateFilter("workMode", vals)}
        />

        {/* Employment Type */}
        <MultiSelectFilter
          title="Employment Type"
          options={[
            { label: "Full-time", value: "FULL_TIME" },
            { label: "Part-time", value: "PART_TIME" },
            { label: "Contract", value: "CONTRACT" },
            { label: "Internship", value: "INTERNSHIP" },
          ]}
          selectedValues={filters.employmentType}
          onSelectionChange={(vals) => updateFilter("employmentType", vals)}
        />

        {/* Experience Level */}
        <MultiSelectFilter
          title="Experience Level"
          options={[
            { label: "Entry Level", value: "ENTRY" },
            { label: "Mid Level", value: "MID" },
            { label: "Senior", value: "SENIOR" },
            { label: "Lead", value: "LEAD" },
            { label: "Executive", value: "EXECUTIVE" },
          ]}
          selectedValues={filters.experience}
          onSelectionChange={(vals) => updateFilter("experience", vals)}
        />

        {/* Department */}
        <MultiSelectFilter
          title="Department"
          options={[
            { label: "Engineering", value: "Engineering" },
            { label: "Design", value: "Design" },
            { label: "Data & AI", value: "Data Engineering" },
            { label: "Product", value: "Product" },
            { label: "Marketing", value: "Marketing" },
          ]}
          selectedValues={filters.department}
          onSelectionChange={(vals) => updateFilter("department", vals)}
        />

      </div>
    </div>
  );
}

export function AdvancedFiltersSkeleton() {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-4 w-12 bg-[hsl(var(--muted))] animate-pulse rounded" />
      </div>
      
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-3">
          <div className="h-5 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="space-y-2">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-4 w-full bg-[hsl(var(--muted))] animate-pulse rounded opacity-50" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
