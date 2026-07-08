import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Lightbulb, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PipelineInsights() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3 items-start p-3 bg-[hsl(var(--muted)/0.3)] rounded-lg">
          <div className="h-2 w-2 rounded-full bg-[hsl(var(--primary))] mt-1.5" />
          <div className="flex-1">
            <div className="text-sm font-medium text-[hsl(var(--foreground))]">Fast-track Jamie Lin</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">96% match score. Consider moving directly to Manager Round.</div>
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs">Review</Button>
        </div>
        
        <div className="flex gap-3 items-start p-3 bg-[hsl(var(--destructive)/0.05)] rounded-lg border border-[hsl(var(--destructive)/0.2)]">
          <TrendingDown className="h-4 w-4 text-[hsl(var(--destructive))] mt-0.5" />
          <div className="flex-1">
            <div className="text-sm font-medium text-[hsl(var(--foreground))]">Technical Drop-off</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">50% drop rate in Technical Round this week.</div>
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs border-[hsl(var(--destructive)/0.5)] text-[hsl(var(--destructive))]">Analyze</Button>
        </div>
      </CardContent>
    </Card>
  );
}
