import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Office } from "../../types";

interface OfficeEditorProps {
  office: Office | null;
  onChange: () => void;
  onCancel: () => void;
}

export function OfficeEditor({ office, onChange, onCancel }: OfficeEditorProps) {
  if (!office) return null;

  return (
    <div className="space-y-6">
      <SettingsSection 
        title={`Edit ${office.name}`} 
        description="Core details and operational parameters for this location."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Office Name</label>
            <Input defaultValue={office.name} onChange={onChange} />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Status</label>
            <Select defaultValue={office.status} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Region</label>
            <Input defaultValue={office.region} onChange={onChange} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Capacity</label>
            <Input type="number" defaultValue={office.capacity} onChange={onChange} />
          </div>
          
          <div className="flex flex-col gap-2 md:col-span-2">
            <div className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))]">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">Headquarters</span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Set this location as the global headquarters.</span>
              </div>
              <Switch defaultChecked={office.isHeadquarters} onCheckedChange={onChange} />
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection 
        title="Location Details" 
        description="Physical address and local contact information."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Address Line 1</label>
            <Input defaultValue={office.address.addressLine1} onChange={onChange} />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">City</label>
            <Input defaultValue={office.address.city} onChange={onChange} />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Country</label>
            <Input defaultValue={office.address.country} onChange={onChange} />
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}
