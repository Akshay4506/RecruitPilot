import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, CreditCard, ArrowUpCircle } from "lucide-react";
import { Subscription, SubscriptionPlan } from "../../types";
import { Badge } from "@/components/ui/badge";

interface BillingHeroProps {
  subscription: Subscription;
  plan: SubscriptionPlan;
}

export function BillingHero({ subscription, plan }: BillingHeroProps) {
  const endDate = new Date(subscription.currentPeriodEnd).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[hsl(var(--border))]">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Platform Administration</h1>
          <Badge variant="outline" className="bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.2)]">
            {plan.name} Plan
          </Badge>
          {subscription.status === "ACTIVE" && (
            <Badge variant="outline" className="bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))] border-[hsl(var(--success)/0.2)]">
              Active
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mt-1">
          <span>${plan.monthlyPrice} / month</span>
          <span>•</span>
          <span>Renews on {endDate}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button variant="outline" className="gap-2 flex-1 md:flex-none">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Latest Invoice</span>
        </Button>
        <Button variant="outline" className="gap-2 flex-1 md:flex-none">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Payment Method</span>
        </Button>
        <Button className="gap-2 flex-1 md:flex-none bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
          <ArrowUpCircle className="h-4 w-4" />
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
}
