import * as React from "react";
import { SearchInput } from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroSearchProps {
  onSearch: (query: string) => void;
  onQuickFilter: (filter: string) => void;
  onViewSaved: () => void;
  onViewRecent: () => void;
}

export function HeroSearch({ onSearch, onQuickFilter, onViewSaved, onViewRecent }: HeroSearchProps) {
  const quickFilters = [
    "Remote",
    "Hybrid",
    "On-site",
    "Full-time",
    "Contract",
    "Internship"
  ];

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            Discover Your Next Opportunity
          </h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            Search thousands of tech jobs matched to your skills and preferences.
          </p>
        </div>

        <div className="relative">
          <SearchInput 
            placeholder="Search by job title, company, or keywords..." 
            onChange={onSearch}
            className="h-12 text-base shadow-inner"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-medium text-[hsl(var(--muted-foreground))] mr-1">Quick Filters:</span>
            {quickFilters.map((filter) => (
              <Badge 
                key={filter} 
                variant="outline" 
                className="cursor-pointer hover:bg-[hsl(var(--primary)/0.1)] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.3)] transition-colors"
                onClick={() => onQuickFilter(filter.toUpperCase().replace("-", "_"))}
              >
                {filter}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onViewRecent} className="text-[hsl(var(--muted-foreground))] text-xs h-8">
              <Clock className="mr-1.5 h-3.5 w-3.5" />
              Recent
            </Button>
            <Button variant="ghost" size="sm" onClick={onViewSaved} className="text-[hsl(var(--muted-foreground))] text-xs h-8">
              <Bookmark className="mr-1.5 h-3.5 w-3.5" />
              Saved
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export function HeroSearchSkeleton() {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-3 flex flex-col items-center">
          <div className="h-8 w-64 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-4 w-96 max-w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
        </div>
        
        <div className="h-12 w-full bg-[hsl(var(--muted))] animate-pulse rounded-md" />
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-6 w-16 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
            ))}
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-[hsl(var(--muted))] animate-pulse rounded" />
            <div className="h-8 w-20 bg-[hsl(var(--muted))] animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
