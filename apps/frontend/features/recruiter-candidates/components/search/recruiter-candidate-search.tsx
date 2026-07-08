import * as React from "react";
import { SearchInput } from "@/components/ui/search-input";

export function RecruiterCandidateSearch() {
  return (
    <div className="flex-1 w-full max-w-md">
      <SearchInput 
        placeholder="Search candidates by name, email, skills..." 
        className="h-10 bg-[hsl(var(--background))]"
      />
    </div>
  );
}
