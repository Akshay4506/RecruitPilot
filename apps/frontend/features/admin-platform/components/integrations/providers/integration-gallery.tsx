import * as React from "react";
import { Integration } from "../../../types";
import { IntegrationCard } from "./integration-card";
import { SettingsHeader } from "@/features/admin-settings/components/settings-header";

interface IntegrationGalleryProps {
  integrations: Integration[];
}

export function IntegrationGallery({ integrations }: IntegrationGalleryProps) {
  const categories = ["COMMUNICATION", "VIDEO", "IDENTITY", "HRIS", "DEVELOPER", "DOCUMENTS"] as const;

  const categoryNames = {
    COMMUNICATION: "Communication & Messaging",
    VIDEO: "Video Conferencing",
    IDENTITY: "Identity & Access Management",
    HRIS: "HRIS & Payroll",
    DEVELOPER: "Developer Tools",
    DOCUMENTS: "Document Storage"
  };

  return (
    <div className="space-y-12">
      <SettingsHeader 
        title="Connected Services" 
        description="Manage your third-party integrations and identity providers." 
      />

      {categories.map(category => {
        const categoryIntegrations = integrations.filter(i => i.category === category);
        if (categoryIntegrations.length === 0) return null;

        return (
          <div key={category} className="space-y-4">
            <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
              {categoryNames[category]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryIntegrations.map(integration => (
                <IntegrationCard key={integration.id} integration={integration} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
