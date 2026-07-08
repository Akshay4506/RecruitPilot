import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, FilterX } from "lucide-react";
import { usePipelineStore } from "../../store/pipeline.store";

export function PipelineFilters() {
  const activeFilters = usePipelineStore(state => state.activeFilters);
  const filterCount = Object.values(activeFilters).flat().length;

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="h-10 gap-2 border-[hsl(var(--border))]">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {filterCount > 0 && (
          <Badge variant="neutral" className="ml-1 h-5 px-1.5 bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border-none">
            {filterCount}
          </Badge>
        )}
      </Button>
      {filterCount > 0 && (
        <Button variant="ghost" size="sm" className="h-10 px-2 text-[hsl(var(--muted-foreground))]">
          <FilterX className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
