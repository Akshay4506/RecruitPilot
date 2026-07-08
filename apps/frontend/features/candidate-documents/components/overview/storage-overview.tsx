import * as React from "react";
import { MetricCard } from "@/components/cards/metric-card";
import { Progress } from "@/components/ui/primitives";
import { FileText, Award, Briefcase, HardDrive } from "lucide-react";
import { DocumentStorageOverview } from "../../types";
import { Card, CardContent } from "@/components/cards/card";

interface StorageOverviewProps {
  overview: DocumentStorageOverview;
}

export function StorageOverview({ overview }: StorageOverviewProps) {
  const usedMB = (overview.totalSizeBytes / (1024 * 1024)).toFixed(1);
  const maxMB = (overview.maxSizeBytes / (1024 * 1024)).toFixed(0);
  const percentUsed = (overview.totalSizeBytes / overview.maxSizeBytes) * 100;
  
  return (
    <div className="space-y-4">
      {/* Main Storage Bar */}
      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
                <HardDrive className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Storage Used</h3>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Your document storage capacity</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-[hsl(var(--foreground))]">{usedMB} MB</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">of {maxMB} MB total</div>
            </div>
          </div>
          <Progress 
            value={percentUsed} 
            className="h-2.5" 
          />
          <div className="mt-2 text-xs text-[hsl(var(--muted-foreground))] text-right">
            {percentUsed.toFixed(1)}% used
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Resumes"
          value={overview.resumesCount.toString()}
          icon={FileText}
          className="border-[hsl(var(--border))] shadow-sm text-[hsl(var(--primary))]"
        />
        <MetricCard
          title="Certificates"
          value={overview.certificatesCount.toString()}
          icon={Award}
          className="border-[hsl(var(--border))] shadow-sm text-[hsl(var(--warning))]"
        />
        <MetricCard
          title="Portfolios"
          value={overview.portfolioFilesCount.toString()}
          icon={Briefcase}
          className="border-[hsl(var(--border))] shadow-sm text-[hsl(var(--info))]"
        />
      </div>
    </div>
  );
}

export function StorageOverviewSkeleton() {
  return (
    <div className="space-y-4">
      <Card className="border-[hsl(var(--border))] shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
              <div className="space-y-1">
                <div className="h-4 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-3 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div className="h-5 w-16 bg-[hsl(var(--muted))] animate-pulse rounded ml-auto" />
              <div className="h-3 w-20 bg-[hsl(var(--muted))] animate-pulse rounded ml-auto" />
            </div>
          </div>
          <div className="h-2.5 w-full bg-[hsl(var(--muted))] animate-pulse rounded-full" />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="border-[hsl(var(--border))] shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="h-4 w-20 bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-8 w-8 bg-[hsl(var(--muted))] animate-pulse rounded-full" />
              </div>
              <div className="h-6 w-12 bg-[hsl(var(--muted))] animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
