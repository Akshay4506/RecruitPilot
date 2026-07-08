import * as React from "react";
import { Integration } from "../../../types";
import { Card, CardContent } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/display/status-chip";
import { Settings, RefreshCw, Plus } from "lucide-react";

interface IntegrationCardProps {
  integration: Integration;
}

export function IntegrationCard({ integration }: IntegrationCardProps) {
  const isConnected = integration.status === "CONNECTED";

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))] flex items-center justify-center">
              <span className="text-xl font-bold text-[hsl(var(--muted-foreground))]">{integration.provider.charAt(0)}</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">{integration.name}</h3>
              <span className="text-sm text-[hsl(var(--muted-foreground))]">{integration.description}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusChip 
              variant={isConnected ? "success" : "neutral"} 
              label={isConnected ? "Connected" : "Disconnected"} 
            />
            {isConnected && integration.lastSyncAt && (
              <span className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                {new Date(integration.lastSyncAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
          
          <Button variant={isConnected ? "outline" : "primary"} size="sm" className="gap-2">
            {isConnected ? (
              <>
                <Settings className="h-4 w-4" />
                Configure
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Connect
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
