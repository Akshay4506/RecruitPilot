import * as React from "react";
import { SearchInput } from "@/components/ui/search-input";
import { usePipelineStore } from "../../store/pipeline.store";

export function PipelineSearch() {
  const searchQuery = usePipelineStore(state => state.searchQuery);
  const setSearchQuery = usePipelineStore(state => state.setSearchQuery);

  return (
    <div className="w-full md:w-80">
      <SearchInput 
        placeholder="Search candidates, skills, or tags..." 
        value={searchQuery}
        onChange={setSearchQuery}
      />
    </div>
  );
}
