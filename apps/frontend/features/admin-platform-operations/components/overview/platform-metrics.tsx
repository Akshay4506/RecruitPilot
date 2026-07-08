import * as React from "react";
import { Card, CardContent } from "@/components/cards/card";
import { Clock, HardDrive, ListTree, Activity, AlertTriangle, Zap } from "lucide-react";
import { JobMetrics, StorageMetrics, QueueHealth } from "../../types";

interface PlatformMetricsProps {
  jobMetrics: JobMetrics;
  storageMetrics: StorageMetrics;
  queues: QueueHealth[];
}

export function PlatformMetrics({ jobMetrics, storageMetrics, queues }: PlatformMetricsProps) {
  const totalQueueSize = queues.reduce((sum, q) => sum + q.size, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      
      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Uptime</p>
              <p className="text-lg sm:text-2xl font-bold text-[hsl(var(--foreground))]">99.99%</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--success)/0.1)] flex items-center justify-center">
              <Clock className="h-4 w-4 text-[hsl(var(--success))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Queue Size</p>
              <p className="text-lg sm:text-2xl font-bold text-[hsl(var(--foreground))]">{totalQueueSize.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <ListTree className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Jobs Running</p>
              <p className="text-lg sm:text-2xl font-bold text-[hsl(var(--foreground))]">142</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
              <Activity className="h-4 w-4 text-[hsl(var(--primary))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Total Storage</p>
              <p className="text-lg sm:text-2xl font-bold text-[hsl(var(--foreground))]">{storageMetrics.totalUsedGb} <span className="text-xs font-normal text-[hsl(var(--muted-foreground))]">GB</span></p>
            </div>
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <HardDrive className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Error Rate</p>
              <p className="text-lg sm:text-2xl font-bold text-[hsl(var(--foreground))]">{(jobMetrics.failureRate).toFixed(2)}%</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--destructive)/0.1)] flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-[hsl(var(--destructive))]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Response Time</p>
              <p className="text-lg sm:text-2xl font-bold text-[hsl(var(--foreground))]">124 <span className="text-xs font-normal text-[hsl(var(--muted-foreground))]">ms</span></p>
            </div>
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <Zap className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
