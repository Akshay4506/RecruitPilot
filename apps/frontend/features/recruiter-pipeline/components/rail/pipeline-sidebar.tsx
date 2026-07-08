import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PipelineSidebar() {
  return (
    <div className="space-y-6">
      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Upcoming Interviews
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] px-2 py-1 rounded text-xs font-bold text-center leading-tight">
              <div>AUG</div>
              <div>12</div>
            </div>
            <div>
              <div className="text-sm font-medium text-[hsl(var(--foreground))]">Alex Rivera</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Technical Round • 2:00 PM</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] px-2 py-1 rounded text-xs font-bold text-center leading-tight">
              <div>AUG</div>
              <div>14</div>
            </div>
            <div>
              <div className="text-sm font-medium text-[hsl(var(--foreground))]">Jordan Lee</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Manager Sync • 11:30 AM</div>
            </div>
          </div>
          <Button variant="outline" className="w-full text-xs">View Calendar</Button>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Pending Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 border border-[hsl(var(--border))] p-2.5 rounded-lg hover:border-[hsl(var(--primary)/0.5)] transition-colors cursor-pointer">
            <div className="h-4 w-4 rounded-full border border-[hsl(var(--muted-foreground))] flex-shrink-0" />
            <div className="text-sm text-[hsl(var(--foreground))] flex-1">Review Jamie Lin&apos;s Assessment</div>
            <Clock className="h-3 w-3 text-[hsl(var(--destructive))]" />
          </div>
          <div className="flex items-center gap-3 border border-[hsl(var(--border))] p-2.5 rounded-lg hover:border-[hsl(var(--primary)/0.5)] transition-colors cursor-pointer">
            <div className="h-4 w-4 rounded-full border border-[hsl(var(--muted-foreground))] flex-shrink-0" />
            <div className="text-sm text-[hsl(var(--foreground))] flex-1">Send offer to Morgan Davis</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
