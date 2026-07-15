"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/cards/card";
import { AlertCircle, Activity, MessageSquareWarning } from "lucide-react";

export function InterviewHealth() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] overflow-hidden">
      <CardContent className="p-4 flex flex-col items-start gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-2 bg-[hsl(var(--primary)/0.1)] rounded-full text-[hsl(var(--primary))]">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[hsl(var(--foreground))]">Interview Health</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">AI Insights</div>
          </div>
        </div>
        
        <div className="flex flex-col flex-wrap gap-3 w-full">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[hsl(var(--warning)/0.2)] bg-[hsl(var(--warning)/0.05)] text-sm">
            <MessageSquareWarning className="h-4 w-4 text-[hsl(var(--warning))]" />
            <span className="text-[hsl(var(--foreground))]">Alex Rivera has <span className="font-semibold text-[hsl(var(--warning))]">2 overdue</span> scorecards</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[hsl(var(--destructive)/0.2)] bg-[hsl(var(--destructive)/0.05)] text-sm">
            <AlertCircle className="h-4 w-4 text-[hsl(var(--destructive))]" />
            <span className="text-[hsl(var(--foreground))]">Missing interviewer for <span className="font-semibold text-[hsl(var(--destructive))]">Jamie Lin (2:00 PM)</span></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
