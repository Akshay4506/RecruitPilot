"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export function AnalyticsDateRange() {
  return (
    <Button variant="outline" className="gap-2 border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
      <Calendar className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
      <span>Last 12 Months</span>
    </Button>
  );
}
