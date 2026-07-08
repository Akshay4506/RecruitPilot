"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReportBuilder() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))] flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" /> Report Builder
        </CardTitle>
        <Button size="sm">Generate</Button>
      </CardHeader>
      <CardContent className="pt-6 flex-1 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Data Source</label>
            <select className="w-full flex h-10 w-full items-center justify-between rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option>Hiring Funnel</option>
              <option>Source Analytics</option>
              <option>Recruiter Performance</option>
              <option>Diversity Data</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Date Range</label>
            <select className="w-full flex h-10 w-full items-center justify-between rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option>Trailing 12 Months</option>
              <option>Year to Date</option>
              <option>Last Quarter</option>
              <option>Custom</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Grouping</label>
            <select className="w-full flex h-10 w-full items-center justify-between rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option>By Month</option>
              <option>By Department</option>
              <option>By Recruiter</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
