import * as React from "react";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

export function RecruiterApplicationFilters() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" className="h-10 border-dashed border-[hsl(var(--border))]">
        <Filter className="h-4 w-4 mr-2 text-[hsl(var(--muted-foreground))]" />
        Status
      </Button>
      <Button variant="outline" size="sm" className="h-10 border-dashed border-[hsl(var(--border))]">
        <Filter className="h-4 w-4 mr-2 text-[hsl(var(--muted-foreground))]" />
        Job
      </Button>
      <Button variant="outline" size="sm" className="h-10 border-dashed border-[hsl(var(--border))]">
        <Filter className="h-4 w-4 mr-2 text-[hsl(var(--muted-foreground))]" />
        Recruiter
      </Button>
      <Button variant="ghost" size="sm" className="h-10 text-[hsl(var(--muted-foreground))]">
        <X className="h-4 w-4 mr-2" />
        Clear
      </Button>
    </div>
  );
}
