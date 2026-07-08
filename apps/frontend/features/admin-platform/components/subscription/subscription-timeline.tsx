import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Timeline, TimelineItem } from "@/components/display/timeline";
import { Users, Star, Zap, Clock } from "lucide-react";

export function SubscriptionTimeline() {
  const timelineItems: TimelineItem[] = [
    {
      id: "t1",
      title: "Started Free Trial",
      description: "Organization created and free trial initiated.",
      timestamp: "2023-01-15T09:00:00Z",
      status: "success",
      icon: Users
    },
    {
      id: "t2",
      title: "Upgraded to Professional",
      description: "Added 20 recruiter seats and unlocked API access.",
      timestamp: "2023-02-14T14:30:00Z",
      status: "success",
      icon: Star
    },
    {
      id: "t3",
      title: "Upgraded to Business",
      description: "Unlocked SSO, custom workflows, and additional storage.",
      timestamp: "2024-06-01T10:00:00Z",
      status: "success",
      icon: Zap
    },
    {
      id: "t4",
      title: "Scheduled Renewal",
      description: "Next billing cycle for Business Tier.",
      timestamp: "2025-06-01T00:00:00Z",
      status: "pending",
      icon: Clock
    }
  ];

  return (
    <SettingsSection 
      title="Subscription Timeline" 
      description="History of your organization's subscription changes and upgrades."
    >
      <Timeline items={timelineItems} />
    </SettingsSection>
  );
}
