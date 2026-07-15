import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function RecruiterApplicationSearch() {
  return (
    <Input 
      type="search"
      placeholder="Search candidates, jobs, or skills..."
      className="h-10 w-full flex-1 max-w-sm bg-[hsl(var(--background))]"
      leftIcon={<Search className="h-4 w-4" />}
    />
  );
}
