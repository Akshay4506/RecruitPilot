import * as React from "react";
import { SearchInput } from "@/components/ui/search-input";

export function InterviewSearch() {
  return (
    <div className="w-full md:w-80">
      <SearchInput 
        placeholder="Search candidates, roles, or meeting ID..." 
      />
    </div>
  );
}
