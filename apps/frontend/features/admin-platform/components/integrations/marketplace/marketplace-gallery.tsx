import * as React from "react";
import { MarketplaceApp } from "../../../types";
import { Card, CardContent } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SettingsHeader } from "@/features/admin-settings/components/settings-header";

interface MarketplaceGalleryProps {
  apps: MarketplaceApp[];
}

export function MarketplaceGallery({ apps }: MarketplaceGalleryProps) {
  const availableApps = apps.filter(app => !app.isInstalled);

  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="App Directory" 
        description="Discover and connect third-party extensions to RecruitPilot." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableApps.map((app) => (
          <Card key={app.id} className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))] rounded-lg flex items-center justify-center">
                  <span className="font-bold text-[hsl(var(--muted-foreground))]">{app.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[hsl(var(--foreground))]">{app.name}</h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">by {app.publisher}</p>
                </div>
              </div>
              <Badge variant="default" className="w-fit mb-3">{app.category}</Badge>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6 flex-1">{app.description}</p>
              
              <Button variant="outline" className="w-full">Install App</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
