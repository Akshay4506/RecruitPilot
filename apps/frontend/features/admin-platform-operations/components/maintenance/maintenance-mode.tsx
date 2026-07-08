"use client";

import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { SystemConfiguration } from "../../types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ShieldAlert, AlertTriangle } from "lucide-react";

interface MaintenanceModeProps {
  config: SystemConfiguration;
}

export function MaintenanceMode({ config }: MaintenanceModeProps) {
  const [enabled, setEnabled] = React.useState(config.maintenanceModeEnabled);

  return (
    <SettingsSection 
      title="Maintenance Mode" 
      description="Enable maintenance mode to prevent non-administrative users from accessing the system."
    >
      <div className={`p-6 border rounded-lg transition-colors ${enabled ? 'bg-[hsl(var(--destructive)/0.05)] border-[hsl(var(--destructive)/0.2)]' : 'bg-[hsl(var(--card))] border-[hsl(var(--border))]'}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className={`h-5 w-5 ${enabled ? 'text-[hsl(var(--destructive))]' : 'text-[hsl(var(--muted-foreground))]'}`} />
              <h3 className={`font-semibold ${enabled ? 'text-[hsl(var(--destructive))]' : 'text-[hsl(var(--foreground))]'}`}>
                {enabled ? "Maintenance Mode is Active" : "Maintenance Mode is Disabled"}
              </h3>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-2xl">
              When enabled, all users will be presented with a maintenance screen. Background jobs and webhook processing will pause automatically based on the system configuration.
            </p>
            {enabled && (
              <div className="flex items-center gap-2 mt-2 p-3 bg-[hsl(var(--destructive)/0.1)] rounded text-sm text-[hsl(var(--destructive))] font-medium">
                <AlertTriangle className="h-4 w-4" />
                Downtime is currently active. User sessions have been terminated.
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">{enabled ? "Enabled" : "Disabled"}</span>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[hsl(var(--border))]">
          <Button variant="outline">Schedule Future Maintenance</Button>
          <Button variant={enabled ? "destructive" : "primary"} disabled>
            Save Changes
          </Button>
        </div>
      </div>
    </SettingsSection>
  );
}
