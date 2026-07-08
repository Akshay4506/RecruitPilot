import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Timeline, TimelineItem } from "@/components/display/timeline";
import { Check } from "lucide-react";

export function BillingHistory() {
  const timelineItems: TimelineItem[] = [
    {
      id: "b1",
      title: "Invoice INV-2024-001 Paid",
      description: "Payment of $899.00 processed successfully via Visa ending in 4242.",
      timestamp: "2024-06-01T08:15:00Z",
      status: "success",
      icon: Check
    },
    {
      id: "b2",
      title: "Invoice INV-2023-012 Paid",
      description: "Payment of $899.00 processed successfully via Visa ending in 4242.",
      timestamp: "2023-06-01T08:12:00Z",
      status: "success",
      icon: Check
    }
  ];

  return (
    <SettingsSection 
      title="Recent Activity" 
      description="Timeline of payments, credits, and billing events."
    >
      <Timeline items={timelineItems} />
    </SettingsSection>
  );
}
