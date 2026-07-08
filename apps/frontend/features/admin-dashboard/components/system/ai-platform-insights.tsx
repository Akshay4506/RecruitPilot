import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { PlatformInsight } from "../../types";
import { Lightbulb, AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIPlatformInsightsProps {
  insights: PlatformInsight[];
}

export function AIPlatformInsights({ insights }: AIPlatformInsightsProps) {
  const getIcon = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return <ShieldAlert className="h-4 w-4 text-[hsl(var(--destructive))]" />;
      case "WARNING": return <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning))]" />;
      default: return <Info className="h-4 w-4 text-[hsl(var(--info))]" />;
    }
  };

  const getStyle = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "border-[hsl(var(--destructive)/0.2)] bg-[hsl(var(--destructive)/0.05)]";
      case "WARNING": return "border-[hsl(var(--warning)/0.2)] bg-[hsl(var(--warning)/0.05)]";
      default: return "border-[hsl(var(--info)/0.2)] bg-[hsl(var(--info)/0.05)]";
    }
  };

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-[hsl(var(--warning))]" /> Platform Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1 space-y-3">
        {insights.map(insight => (
          <div key={insight.id} className={cn("p-3 rounded-lg border", getStyle(insight.severity))}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">{getIcon(insight.severity)}</div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">{insight.title}</h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
