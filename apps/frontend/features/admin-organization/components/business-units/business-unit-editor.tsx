import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { BusinessUnit } from "../../types";

interface BusinessUnitEditorProps {
  businessUnit: BusinessUnit | null;
  onChange: () => void;
  onCancel: () => void;
}

export function BusinessUnitEditor({ businessUnit, onChange, onCancel }: BusinessUnitEditorProps) {
  if (!businessUnit) return null;

  return (
    <SettingsSection 
      title={`Edit ${businessUnit.name}`} 
      description="Manage business unit details and structural grouping."
    >
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Business Unit Name</label>
          <Input defaultValue={businessUnit.name} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Status</label>
          <Select defaultValue={businessUnit.status} onValueChange={onChange}>
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
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Description</label>
          <textarea 
            className="flex min-h-[80px] w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue={businessUnit.description} 
            onChange={onChange}
          />
        </div>
      </div>
    </SettingsSection>
  );
}
