import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function RecruiterApplicationSearch() {
  return (
    <div className="relative flex-1 max-w-sm">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
      </div>
      <Input 
        type="search"
        placeholder="Search candidates, jobs, or skills..."
        className="pl-9 h-10 w-full bg-[hsl(var(--background))]"
      />
    </div>
  );
}
