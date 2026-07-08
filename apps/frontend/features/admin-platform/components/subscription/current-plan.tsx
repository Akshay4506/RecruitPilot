import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Subscription, SubscriptionPlan } from "../../types";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface CurrentPlanProps {
  subscription: Subscription;
  plan: SubscriptionPlan;
}

export function CurrentPlan({ subscription, plan }: CurrentPlanProps) {
  const endDate = new Date(subscription.currentPeriodEnd).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <SettingsSection 
      title="Current Subscription" 
      description="Manage your platform subscription plan and billing cycle."
      footer={
        <div className="flex justify-end gap-2 w-full">
          <Button variant="outline">Cancel Subscription</Button>
          <Button className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">Change Plan</Button>
        </div>
      }
    >
      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="flex-1 space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Active Plan</span>
            <span className="text-3xl font-bold text-[hsl(var(--foreground))]">{plan.name}</span>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Billing Cycle</span>
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">Annual</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Next Renewal</span>
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">{endDate}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Total Amount</span>
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">${plan.monthlyPrice * 12} / year</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Status</span>
                <span className="text-sm font-medium text-[hsl(var(--success))]">{subscription.status}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[hsl(var(--muted)/0.3)] rounded-lg p-6 border border-[hsl(var(--border))]">
          <h3 className="text-sm font-semibold mb-4 text-[hsl(var(--foreground))]">Plan Features</h3>
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <Check className="h-4 w-4 text-[hsl(var(--success))]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SettingsSection>
  );
}
