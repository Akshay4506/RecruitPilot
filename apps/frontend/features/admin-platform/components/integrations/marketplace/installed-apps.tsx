import * as React from "react";
import { MarketplaceApp } from "../../../types";
import { Card, CardContent } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SettingsHeader } from "@/features/admin-settings/components/settings-header";
import { Settings, AlertCircle } from "lucide-react";

interface InstalledAppsProps {
  apps: MarketplaceApp[];
}

export function InstalledApps({ apps }: InstalledAppsProps) {
  const installedApps = apps.filter(app => app.isInstalled);

  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Installed Applications" 
        description="Manage extensions currently installed in your workspace." 
      />

      <div className="space-y-4">
        {installedApps.map((app) => (
          <Card key={app.id} className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))] rounded-lg flex items-center justify-center">
                  <span className="font-bold text-[hsl(var(--muted-foreground))]">{app.name.charAt(0)}</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-[hsl(var(--foreground))]">{app.name}</h3>
                    {app.updateAvailable && (
                      <Badge variant="outline" className="bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.2)]">
                        Update Available
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">by {app.publisher} • {app.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {app.updateAvailable && (
                  <Button variant="outline" size="sm" className="gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Update
                  </Button>
                )}
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {installedApps.length === 0 && (
          <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">
            No applications installed.
          </div>
        )}
      </div>
    </div>
  );
}
