import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Lightbulb, Info, AlertOctagon } from "lucide-react";

export function InterviewInsights() {
  const insights = [
    { type: "info", text: "Candidate scored highest in System Architecture (4.8/5.0).", icon: Info, color: "text-[hsl(var(--info))]", bg: "bg-[hsl(var(--info)/0.1)]", border: "border-[hsl(var(--info)/0.2)]" },
    { type: "warning", text: "Communication score dropped from Round 1 (4.0 -> 3.2).", icon: AlertOctagon, color: "text-[hsl(var(--warning))]", bg: "bg-[hsl(var(--warning)/0.1)]", border: "border-[hsl(var(--warning)/0.2)]" }
  ];

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Lightbulb className="h-4 w-4" /> AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${insight.border} ${insight.bg}`}>
              <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${insight.color}`} />
              <div className={`text-sm ${insight.color} font-medium`}>{insight.text}</div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
