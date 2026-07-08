"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export function AnalyticsDepartmentFilter() {
  return (
    <Button variant="outline" className="gap-2 border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
      <Building2 className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
      <span>All Departments</span>
    </Button>
  );
}
