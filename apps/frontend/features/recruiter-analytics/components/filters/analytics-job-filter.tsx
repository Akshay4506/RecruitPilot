"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

export function AnalyticsJobFilter() {
  return (
    <Button variant="outline" className="gap-2 border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
      <Briefcase className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
      <span>All Jobs</span>
    </Button>
  );
}
