import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CompanyBranding } from "../../types";

interface BrandingProps {
  branding: CompanyBranding;
  onChange: () => void;
}

export function Branding({ branding, onChange }: BrandingProps) {
  return (
    <SettingsSection 
      title="Brand & Theme" 
      description="Customize how RecruitPilot appears to your candidates and users."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Company Logo</label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 border border-[hsl(var(--border))] rounded-lg flex items-center justify-center bg-[hsl(var(--muted))]">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">No logo</span>
              </div>
              <Button variant="outline" size="sm">Upload Logo</Button>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Recommended size: 256x256px (PNG or SVG)</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Favicon</label>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 border border-[hsl(var(--border))] rounded flex items-center justify-center bg-[hsl(var(--muted))]">
                <span className="text-[8px] text-[hsl(var(--muted-foreground))]">Icon</span>
              </div>
              <Button variant="outline" size="sm">Upload Favicon</Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Primary Color</label>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded border border-[hsl(var(--border))]" style={{ backgroundColor: branding.primaryColor }} />
              <Input type="text" defaultValue={branding.primaryColor} onChange={onChange} className="font-mono text-sm uppercase" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Accent Color</label>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded border border-[hsl(var(--border))]" style={{ backgroundColor: branding.accentColor }} />
              <Input type="text" defaultValue={branding.accentColor} onChange={onChange} className="font-mono text-sm uppercase" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Base Font</label>
            <Input defaultValue={branding.fontFamily} onChange={onChange} placeholder="e.g. Inter, Roboto, sans-serif" />
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}
