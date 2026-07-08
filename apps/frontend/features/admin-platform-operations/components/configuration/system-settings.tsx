"use client";

import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { SystemConfiguration } from "../../types";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface SystemSettingsProps {
  config: SystemConfiguration;
}

export function SystemSettings({ config }: SystemSettingsProps) {
  return (
    <SettingsSection 
      title="General Configuration" 
      description="Platform-wide operational settings and regional preferences."
      footer={
        <div className="flex justify-end w-full">
          <Button className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">Save Configuration</Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Server Environment</label>
            <Input defaultValue={config.environment} disabled />
            <span className="text-[10px] text-[hsl(var(--muted-foreground))]">Configured via environment variables. Cannot be changed here.</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">System Timezone</label>
            <Input defaultValue={config.timezone} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Primary Region</label>
            <Input defaultValue={config.region} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--muted)/0.3)]">
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Debug Mode</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Enable verbose logging and diagnostic endpoints.</span>
            </div>
            <Switch defaultChecked={config.debugModeEnabled} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Max Upload Size (MB)</label>
            <Input type="number" defaultValue={config.maxUploadSizeMb} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Session Timeout (Minutes)</label>
            <Input type="number" defaultValue={config.sessionTimeoutMinutes} />
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}
