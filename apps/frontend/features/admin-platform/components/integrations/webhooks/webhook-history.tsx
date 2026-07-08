import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Timeline, TimelineItem } from "@/components/display/timeline";
import { Webhook as WebhookIcon, AlertTriangle, CheckCircle } from "lucide-react";

export function WebhookHistory() {
  const timelineItems: TimelineItem[] = [
    {
      id: "wh1",
      title: "Delivery Failed",
      description: "POST to https://api.acme.com/webhooks/recruitpilot failed with 500 Internal Server Error. Retrying in 5 minutes.",
      timestamp: "2024-07-08T12:00:00Z",
      status: "error",
      icon: AlertTriangle
    },
    {
      id: "wh2",
      title: "Endpoint Added",
      description: "Zapier Integration endpoint created and verified.",
      timestamp: "2024-06-15T10:30:00Z",
      status: "success",
      icon: CheckCircle
    },
    {
      id: "wh3",
      title: "Payload Version Updated",
      description: "Updated webhook payload format from v1 to v2.",
      timestamp: "2024-05-10T14:00:00Z",
      status: "info",
      icon: WebhookIcon
    }
  ];

  return (
    <SettingsSection 
      title="Recent Webhook Events" 
      description="Audit log of webhook configuration changes and critical delivery failures."
    >
      <Timeline items={timelineItems} />
    </SettingsSection>
  );
}
