import * as React from "react";
import { SearchInput } from "@/components/ui/search-input";

export function RoleSearch() {
  return (
    <div className="w-full md:w-[320px]">
      <SearchInput placeholder="Search roles by name or description..." />
    </div>
  );
}
