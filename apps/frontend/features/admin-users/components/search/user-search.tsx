"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function UserSearch() {
  return (
    <div className="relative flex-1 max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
      </div>
      <Input
        type="text"
        placeholder="Search by name, email, or employee ID..."
        className="pl-9 h-10 w-full"
      />
    </div>
  );
}
