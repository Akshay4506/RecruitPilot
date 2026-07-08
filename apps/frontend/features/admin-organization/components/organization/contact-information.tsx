import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Input } from "@/components/ui/input";
import { ContactInformation as ContactInfoType } from "../../types";

interface ContactInformationProps {
  contactInfo: ContactInfoType;
  onChange: () => void;
}

export function ContactInformation({ contactInfo, onChange }: ContactInformationProps) {
  return (
    <SettingsSection 
      title="Contact Information" 
      description="Primary corporate address and contact details."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Address Line 1</label>
          <Input defaultValue={contactInfo.addressLine1} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Address Line 2 (Optional)</label>
          <Input defaultValue={contactInfo.addressLine2} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">City</label>
          <Input defaultValue={contactInfo.city} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">State / Province</label>
          <Input defaultValue={contactInfo.state} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Postal / Zip Code</label>
          <Input defaultValue={contactInfo.postalCode} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Country</label>
          <Input defaultValue={contactInfo.country} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2 md:col-span-2 pt-4 border-t border-[hsl(var(--border))] mt-2">
          <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2">Corporate Contacts</h4>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Main Phone Number</label>
          <Input defaultValue={contactInfo.phone} onChange={onChange} />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">General Email</label>
          <Input defaultValue={contactInfo.email} onChange={onChange} type="email" />
        </div>
        
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Support Email</label>
          <Input defaultValue={contactInfo.supportEmail} onChange={onChange} type="email" />
        </div>
      </div>
    </SettingsSection>
  );
}
