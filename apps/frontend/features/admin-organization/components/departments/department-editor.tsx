import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Department } from "../../types";

interface DepartmentEditorProps {
  department: Department | null;
  onChange: () => void;
  onCancel: () => void;
}

export function DepartmentEditor({ department, onChange, onCancel }: DepartmentEditorProps) {
  if (!department) return null;

  return (
    <SettingsSection 
      title={`Edit ${department.name}`} 
      description="Modify department details, leadership, and operational status."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Department Name</label>
          <Input defaultValue={department.name} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Status</label>
          <Select defaultValue={department.status} onValueChange={onChange}>
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
        
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Description</label>
          <textarea 
            className="flex min-h-[80px] w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue={department.description} 
            onChange={onChange}
          />
        </div>
      </div>
    </SettingsSection>
  );
}
