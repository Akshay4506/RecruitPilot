import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function RecruiterJobSearch() {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
      </div>
      <Input
        type="search"
        placeholder="Search jobs by title, department, or location..."
        className="pl-10 w-full"
      />
    </div>
  );
}
