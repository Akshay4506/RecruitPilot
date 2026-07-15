"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function UserSearch() {
  return (
    <Input
      type="text"
      placeholder="Search by name, email, or employee ID..."
      className="h-10 w-full flex-1 max-w-md"
      leftIcon={<Search className="h-4 w-4" />}
    />
  );
}
