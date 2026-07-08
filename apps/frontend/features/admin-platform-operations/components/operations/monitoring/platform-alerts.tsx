import * as React from "react";
import { SystemAlert } from "../../../types";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlatformAlertsProps {
  alerts: SystemAlert[];
}

export function PlatformAlerts({ alerts }: PlatformAlertsProps) {
  const getIcon = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return <AlertCircle className="h-5 w-5 text-[hsl(var(--destructive))]" />;
      case "WARNING": return <AlertTriangle className="h-5 w-5 text-[hsl(var(--warning))]" />;
      case "INFO": return <Info className="h-5 w-5 text-[hsl(var(--primary))]" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  const getBgClass = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "bg-[hsl(var(--destructive)/0.05)] border-[hsl(var(--destructive)/0.2)]";
      case "WARNING": return "bg-[hsl(var(--warning)/0.05)] border-[hsl(var(--warning)/0.2)]";
      case "INFO": return "bg-[hsl(var(--primary)/0.05)] border-[hsl(var(--primary)/0.2)]";
      default: return "bg-[hsl(var(--card))] border-[hsl(var(--border))]";
    }
  };

  if (alerts.length === 0) {
    return (
      <SettingsSection title="System Alerts" description="Active monitoring alerts and warnings.">
        <div className="flex flex-col items-center justify-center py-12 text-center bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] rounded-lg border-dashed">
          <CheckCircle2 className="h-12 w-12 text-[hsl(var(--success))] mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-[hsl(var(--foreground))]">All Systems Nominal</h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">There are no active alerts at this time.</p>
        </div>
      </SettingsSection>
    );
  }

  return (
    <SettingsSection 
      title="System Alerts" 
      description="Active monitoring alerts and warnings."
    >
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`flex items-start gap-4 p-4 border rounded-lg ${getBgClass(alert.severity)}`}>
            <div className="mt-1">
              {getIcon(alert.severity)}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-[hsl(var(--foreground))]">{alert.title}</h4>
                <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">
                  {new Date(alert.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{alert.message}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Source: {alert.source}</span>
                {alert.status === "ACTIVE" && (
                  <Button variant="link" size="sm" className="h-auto p-0 text-[hsl(var(--primary))] text-xs">
                    Acknowledge
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SettingsSection>
  );
}
