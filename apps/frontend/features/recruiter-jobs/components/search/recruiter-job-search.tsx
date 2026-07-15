import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function RecruiterJobSearch() {
  return (
    <Input
      type="search"
      placeholder="Search jobs..."
      className="w-full max-w-md"
      leftIcon={<Search className="h-4 w-4" />}
    />
  );
}
