import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { PlatformHealth } from "../../types";
import { StatusChip } from "@/components/display/status-chip";
import { Database, ListTree, HardDrive, Mail, Search, Zap } from "lucide-react";

interface SystemHealthProps {
  health: PlatformHealth;
}

export function SystemHealth({ health }: SystemHealthProps) {
  const getVariant = (status: string): "success" | "warning" | "error" | "neutral" => {
    switch (status) {
      case "HEALTHY": return "success";
      case "DEGRADED": return "warning";
      case "DOWN": return "error";
      case "MAINTENANCE": return "neutral";
      default: return "neutral";
    }
  };

  const services = [
    { name: "Database", icon: Database, status: health.services.database },
    { name: "Background Queue", icon: ListTree, status: health.services.queue },
    { name: "Blob Storage", icon: HardDrive, status: health.services.storage },
    { name: "Email Delivery", icon: Mail, status: health.services.email },
    { name: "Elasticsearch", icon: Search, status: health.services.search },
    { name: "Redis Cache", icon: Zap, status: health.services.cache },
  ];

  return (
    <SettingsSection 
      title="Live Service Health" 
      description="Current operational status of core infrastructure components."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <div key={i} className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))] flex items-center justify-center">
                  <Icon className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                </div>
                <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{service.name}</span>
              </div>
              <StatusChip 
                variant={getVariant(service.status)} 
                label={service.status} 
                showIcon={true} 
              />
            </div>
          );
        })}
      </div>
    </SettingsSection>
  );
}
