import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { SystemHealthNode } from "../../types";
import { Activity, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemHealthProps {
  nodes: SystemHealthNode[];
}

export function SystemHealth({ nodes }: SystemHealthProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "HEALTHY": return "bg-[hsl(var(--success))]";
      case "DEGRADED": return "bg-[hsl(var(--warning))]";
      case "DOWN": return "bg-[hsl(var(--destructive))]";
      default: return "bg-[hsl(var(--muted))]";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "HEALTHY": return "text-[hsl(var(--success))]";
      case "DEGRADED": return "text-[hsl(var(--warning))]";
      case "DOWN": return "text-[hsl(var(--destructive))]";
      default: return "text-[hsl(var(--muted))]";
    }
  };

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Activity className="h-4 w-4 text-[hsl(var(--info))]" /> System Health
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {nodes.map((node) => (
          <div key={node.id} className="flex flex-col gap-2 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">{node.name}</span>
              <div className="flex items-center gap-1.5">
                <span className={cn("h-2 w-2 rounded-full", getStatusColor(node.status))} />
                <span className={cn("text-xs font-semibold capitalize", getStatusText(node.status))}>
                  {node.status.toLowerCase()}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="flex flex-col">
                <span className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Latency</span>
                <span className="text-xs font-medium text-[hsl(var(--foreground))]">{node.latencyMs} ms</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Uptime</span>
                <span className="text-xs font-medium text-[hsl(var(--foreground))]">{node.uptimePercentage}%</span>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Checked</span>
                <span className="text-[10px] font-medium text-[hsl(var(--muted-foreground))] flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" /> {node.lastChecked}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
