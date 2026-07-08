import * as React from "react";
import { SearchInput } from "@/components/ui/search-input";
import { MultiSelectFilter } from "@/components/filters/multi-select-filter";

interface DocumentFiltersProps {
  selectedTypes: Set<string>;
  onSearchChange: (value: string) => void;
  onTypeChange: (types: Set<string>) => void;
  onSortChange: (sort: string) => void;
}

export function DocumentFilters({ selectedTypes, onSearchChange, onTypeChange, onSortChange }: DocumentFiltersProps) {
  const typeOptions = [
    { value: "RESUME", label: "Resume" },
    { value: "CERTIFICATE", label: "Certificates" },
    { value: "PORTFOLIO", label: "Portfolio" },
    { value: "OFFER_LETTER", label: "Offer Letter" },
    { value: "TRANSCRIPT", label: "Transcript" },
    { value: "OTHER", label: "Other" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "name", label: "Name (A-Z)" },
    { value: "size", label: "Size (Largest)" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <div className="w-full sm:max-w-xs">
        <SearchInput 
          placeholder="Search documents..." 
          onChange={onSearchChange} 
        />
      </div>
      <div className="flex w-full sm:w-auto flex-1 items-center gap-3 justify-start sm:justify-end">
        <MultiSelectFilter
          title="Type"
          options={typeOptions}
          selectedValues={selectedTypes}
          onSelectionChange={onTypeChange}
        />
        
        {/* We can use a standard native select or custom select for sort. 
            Reusing MultiSelectFilter for now since it's a dropdown, but restricting it to single selection via logic if needed, 
            or using a standard select element to keep it simple. */}
        <select 
          className="flex h-9 w-[150px] rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))]"
          onChange={(e) => onSortChange(e.target.value)}
          defaultValue="newest"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
