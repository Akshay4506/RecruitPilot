import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SecurityPreference } from "../../types";

interface SecurityPreferencesProps {
  security: SecurityPreference;
  onChange: () => void;
}

export function SecurityPreferences({ security, onChange }: SecurityPreferencesProps) {
  return (
    <div className="space-y-6">
      <SettingsSection 
        title="Password Policy" 
        description="Enforce strong password requirements for local authentication."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Minimum Password Length</label>
            <Input type="number" defaultValue={security.passwordPolicy.minLength} onChange={onChange} className="w-32" />
          </div>

          <div className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))]">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">Require Uppercase Letters</span>
            <Switch defaultChecked={security.passwordPolicy.requireUppercase} onCheckedChange={onChange} />
          </div>

          <div className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))]">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">Require Numbers</span>
            <Switch defaultChecked={security.passwordPolicy.requireNumbers} onCheckedChange={onChange} />
          </div>

          <div className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))]">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">Require Symbols</span>
            <Switch defaultChecked={security.passwordPolicy.requireSymbols} onCheckedChange={onChange} />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection 
        title="Session & Access Policies" 
        description="Manage session timeouts and network restrictions."
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Idle Session Timeout (minutes)</label>
            <div className="flex items-center gap-2">
              <Input type="number" defaultValue={security.sessionTimeoutMinutes} onChange={onChange} className="w-32" />
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Automatically log out inactive users.</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-[hsl(var(--border))]">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Authorized IP Ranges (Optional)</label>
            <textarea 
              className="flex min-h-[80px] w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g. 192.168.1.0/24 (one per line)"
              defaultValue={security.allowedIpRanges.join("\n")} 
              onChange={onChange}
            />
            <span className="text-xs text-[hsl(var(--muted-foreground))]">If specified, access is restricted to these networks only.</span>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}
