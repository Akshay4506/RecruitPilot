import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { LocalizationPreference } from "../../types";

interface LocalizationProps {
  localization: LocalizationPreference;
  onChange: () => void;
}

export function Localization({ localization, onChange }: LocalizationProps) {
  return (
    <SettingsSection 
      title="Localization & Formatting" 
      description="Set regional defaults for dates, times, and currency."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Global Language</label>
          <Select defaultValue={localization.language} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="en-GB">English (UK)</SelectItem>
              <SelectItem value="es-ES">Spanish</SelectItem>
              <SelectItem value="fr-FR">French</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Default Currency</label>
          <Select defaultValue={localization.currency} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">US Dollar (USD)</SelectItem>
              <SelectItem value="EUR">Euro (EUR)</SelectItem>
              <SelectItem value="GBP">British Pound (GBP)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Date Format</label>
          <Select defaultValue={localization.dateFormat} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (US)</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (UK/EU)</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (ISO)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Time Format</label>
          <Select defaultValue={localization.timeFormat} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select time format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12h">12-hour (1:00 PM)</SelectItem>
              <SelectItem value="24h">24-hour (13:00)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </SettingsSection>
  );
}
