import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Organization } from "../../types";

interface CompanyProfileProps {
  organization: Organization;
  onChange: () => void;
}

export function CompanyProfile({ organization, onChange }: CompanyProfileProps) {
  return (
    <SettingsSection 
      title="Company Profile" 
      description="Basic information about your organization."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Company Name</label>
          <Input defaultValue={organization.name} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Legal Name</label>
          <Input defaultValue={organization.legalName} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Primary Domain</label>
          <Input defaultValue={organization.domain} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Website</label>
          <Input defaultValue={organization.website} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Industry</label>
          <Select defaultValue={organization.industry} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Company Size</label>
          <Select defaultValue={organization.companySize} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="11-50">11-50</SelectItem>
              <SelectItem value="51-200">51-200</SelectItem>
              <SelectItem value="201-1000">201-1000</SelectItem>
              <SelectItem value="1000-5000">1000-5000</SelectItem>
              <SelectItem value="5000+">5000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Description</label>
          <textarea 
            className="flex min-h-[80px] w-full rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue={organization.description} 
            onChange={onChange}
          />
        </div>
      </div>
    </SettingsSection>
  );
}
