"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { ReportDefinition } from "../../types";
import { FileText, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportsListProps {
  reports: ReportDefinition[];
}

export function ReportsList({ reports }: ReportsListProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <FileText className="h-4 w-4" /> Report Templates
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1 space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-[hsl(var(--foreground))]">{report.name}</h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">{report.description}</p>
            </div>
            <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-[hsl(var(--muted-foreground))]">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
