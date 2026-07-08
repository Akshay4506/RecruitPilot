import * as React from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecruiterJobFilters() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" className="h-9 border-dashed">
        <Filter className="h-4 w-4 mr-2" />
        Status
      </Button>
      <Button variant="outline" size="sm" className="h-9 border-dashed">
        <Filter className="h-4 w-4 mr-2" />
        Department
      </Button>
      <Button variant="outline" size="sm" className="h-9 border-dashed">
        <Filter className="h-4 w-4 mr-2" />
        Work Mode
      </Button>
      <div className="hidden sm:block h-6 border-l border-[hsl(var(--border))] mx-1" />
      <Button variant="ghost" size="sm" className="h-9 text-[hsl(var(--muted-foreground))]">
        <X className="h-4 w-4 mr-2" />
        Clear
      </Button>
    </div>
  );
}
