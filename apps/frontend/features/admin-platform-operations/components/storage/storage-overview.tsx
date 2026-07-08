import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { StorageMetrics, StorageCategory } from "../../types";
import { Database, HardDrive, FileText, Server, Paperclip } from "lucide-react";
import { Progress } from "@/components/ui/primitives";

interface StorageOverviewProps {
  metrics: StorageMetrics;
}

export function StorageOverview({ metrics }: StorageOverviewProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "DATABASE": return <Database className="h-4 w-4" />;
      case "BLOB_STORAGE": return <HardDrive className="h-4 w-4" />;
      case "LOGS": return <FileText className="h-4 w-4" />;
      case "BACKUPS": return <Server className="h-4 w-4" />;
      case "EMAIL_ATTACHMENTS": return <Paperclip className="h-4 w-4" />;
      default: return <HardDrive className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "DATABASE": return "bg-blue-500";
      case "BLOB_STORAGE": return "bg-indigo-500";
      case "LOGS": return "bg-gray-500";
      case "BACKUPS": return "bg-emerald-500";
      case "EMAIL_ATTACHMENTS": return "bg-amber-500";
      default: return "bg-primary";
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.split("_").map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(" ");
  };

  const overallPercentage = (metrics.totalUsedGb / metrics.totalAllocatedGb) * 100;

  return (
    <SettingsSection 
      title="Storage Usage" 
      description="Track and manage allocated storage across infrastructure."
    >
      <div className="space-y-6">
        
        <div className="p-6 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--muted)/0.3)]">
          <div className="flex justify-between items-end mb-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-[hsl(var(--foreground))]">Total Storage Used</span>
              <span className="text-3xl font-bold text-[hsl(var(--foreground))]">
                {metrics.totalUsedGb.toLocaleString()} <span className="text-lg text-[hsl(var(--muted-foreground))] font-normal">/ {metrics.totalAllocatedGb.toLocaleString()} GB</span>
              </span>
            </div>
            <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">{overallPercentage.toFixed(1)}% used</span>
          </div>
          
          <Progress value={overallPercentage} className="h-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.categories.map((cat: StorageCategory) => (
            <div key={cat.category} className="flex items-center gap-4 p-4 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))]">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${getCategoryColor(cat.category)}`}>
                {getCategoryIcon(cat.category)}
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{getCategoryLabel(cat.category)}</span>
                <div className="flex justify-between items-center mt-1 text-sm">
                  <span className="text-[hsl(var(--muted-foreground))] font-mono">{cat.sizeGb.toLocaleString()} GB</span>
                  <span className="text-[hsl(var(--muted-foreground))] font-medium">{cat.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SettingsSection>
  );
}
