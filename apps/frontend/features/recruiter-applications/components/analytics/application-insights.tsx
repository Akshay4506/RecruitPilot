import * as React from "react";
import { Application } from "../../types";
import { Card } from "@/components/cards/card";
import { Lightbulb, Info, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ApplicationInsights({ applications }: { applications: Application[] }) {
  // Mock insights based on applications array
  const insights = [
    {
      id: "1",
      type: "success",
      icon: Lightbulb,
      title: "Strong Match Detected",
      description: "Jamie Lin has a 96% match score for the Backend Engineer role.",
      action: "Review Profile",
    },
    {
      id: "2",
      type: "warning",
      icon: Clock,
      title: "Application Aging",
      description: "3 candidates have been in 'Under Review' for over 7 days.",
      action: "View Aging",
    },
    {
      id: "3",
      type: "critical",
      icon: AlertCircle,
      title: "Missing Feedback",
      description: "Technical Interview feedback is missing for Alex Rivera.",
      action: "Remind Team",
    },
    {
      id: "4",
      type: "info",
      icon: Info,
      title: "New Applicants",
      description: "12 new applications received in the last 24 hours.",
      action: "Screen Now",
    }
  ];

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="h-5 w-5 text-[hsl(var(--warning))]" />
        <h3 className="font-semibold text-lg text-[hsl(var(--foreground))]">AI Insights</h3>
      </div>
      
      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {insights.map(insight => {
          const Icon = insight.icon;
          return (
            <div 
              key={insight.id}
              className={cn(
                "p-3 rounded-lg border border-[hsl(var(--border))] flex gap-3 transition-colors",
                insight.type === "success" ? "bg-[hsl(var(--success-bg))]" :
                insight.type === "warning" ? "bg-[hsl(var(--warning-bg))]" :
                insight.type === "critical" ? "bg-[hsl(var(--danger-bg))]" :
                "bg-[hsl(var(--info-bg))]"
              )}
            >
              <Icon 
                className={cn(
                  "h-5 w-5 shrink-0 mt-0.5",
                  insight.type === "success" ? "text-[hsl(var(--success))]" :
                  insight.type === "warning" ? "text-[hsl(var(--warning))]" :
                  insight.type === "critical" ? "text-[hsl(var(--danger))]" :
                  "text-[hsl(var(--info))]"
                )} 
              />
              <div className="flex-1 space-y-1">
                <p className={cn(
                  "text-sm font-semibold",
                  insight.type === "success" ? "text-[hsl(var(--success))]" :
                  insight.type === "warning" ? "text-[hsl(var(--warning))]" :
                  insight.type === "critical" ? "text-[hsl(var(--danger))]" :
                  "text-[hsl(var(--info))]"
                )}>{insight.title}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{insight.description}</p>
                <button className="text-xs font-medium text-[hsl(var(--primary))] hover:underline mt-2 block">
                  {insight.action} &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
