import * as React from "react";
import { PlatformHealth, SystemConfiguration } from "../../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, ShieldAlert, ArrowRight } from "lucide-react";

interface PlatformHeroProps {
  health: PlatformHealth;
  config: SystemConfiguration;
}

export function PlatformHero({ health, config }: PlatformHeroProps) {
  const isHealthy = health.status === "HEALTHY";
  const isMaintenance = config.maintenanceModeEnabled;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[hsl(var(--border))]">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Platform Operations</h1>
          {isMaintenance ? (
            <Badge variant="outline" className="bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.2)]">
              Maintenance Mode
            </Badge>
          ) : (
            <Badge variant="outline" className={`bg-[hsl(var(--${isHealthy ? 'success' : 'destructive'})/0.1)] text-[hsl(var(--${isHealthy ? 'success' : 'destructive'}))] border-[hsl(var(--${isHealthy ? 'success' : 'destructive'})/0.2)]`}>
              {health.overallScore}% Healthy
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mt-1">
          <span>Environment: {config.environment}</span>
          <span>•</span>
          <span>Region: {config.region}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button variant="outline" className="gap-2 flex-1 md:flex-none">
          <ShieldAlert className="h-4 w-4" />
          <span className="hidden sm:inline">Active Alerts</span>
        </Button>
        <Button className="gap-2 flex-1 md:flex-none bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
          <Activity className="h-4 w-4" />
          Live Metrics
          <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}
