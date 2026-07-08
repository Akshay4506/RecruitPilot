import * as React from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function RecruiterCandidateFilters() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" className="h-10 gap-2 border-[hsl(var(--border))]">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        <Badge variant="neutral" className="ml-1 h-5 px-1.5 bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border-none">
          3
        </Badge>
      </Button>

      <div className="hidden lg:flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-10 gap-2 text-[hsl(var(--muted-foreground))]">
          Status <ChevronDown className="h-3 w-3" />
        </Button>
        <Button variant="outline" size="sm" className="h-10 gap-2 text-[hsl(var(--muted-foreground))]">
          Skills <ChevronDown className="h-3 w-3" />
        </Button>
        <Button variant="outline" size="sm" className="h-10 gap-2 text-[hsl(var(--muted-foreground))]">
          Experience <ChevronDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
