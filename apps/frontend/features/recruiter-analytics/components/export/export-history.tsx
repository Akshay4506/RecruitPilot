"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { ExportJob } from "../../types";
import { History } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExportHistoryProps {
  jobs: ExportJob[];
}

export function ExportHistory({ jobs }: ExportHistoryProps) {
  const getVariant = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'FAILED': return 'destructive';
      case 'RUNNING': return 'primary';
      case 'QUEUED': return 'outline';
      default: return 'neutral';
    }
  };

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <History className="h-4 w-4" /> Export Queue
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1 space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-[hsl(var(--foreground))]">{job.name}</h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                {new Date(job.requestedAt).toLocaleTimeString()} • {job.format}
              </p>
            </div>
            <Badge variant={getVariant(job.status)} className="text-[10px] px-1.5 py-0 h-4 uppercase">
              {job.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
