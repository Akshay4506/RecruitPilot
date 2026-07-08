"use client";

import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { MaintenanceEvent } from "../../types";
import { Timeline } from "@/components/display/timeline";
import { Wrench, CheckCircle, Clock } from "lucide-react";

interface MaintenanceHistoryProps {
  events: MaintenanceEvent[];
}

export function MaintenanceHistory({ events }: MaintenanceHistoryProps) {
  return (
    <SettingsSection 
      title="Maintenance History" 
      description="Record of past and upcoming scheduled downtime events."
    >
      <div className="p-6 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))]">
        <Timeline 
          items={events.map((event) => ({
            id: event.id,
            title: event.title,
            description: event.description,
            timestamp: new Date(event.scheduledStart).toLocaleString(),
            status: event.status === "COMPLETED" ? "success" : 
                    event.status === "ACTIVE" ? "warning" : "neutral",
            icon: event.status === "COMPLETED" ? CheckCircle : 
                  event.status === "ACTIVE" ? Wrench : Clock
          }))} 
        />
      </div>
    </SettingsSection>
  );
}
