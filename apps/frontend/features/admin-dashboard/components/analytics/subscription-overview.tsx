import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { SubscriptionSummary as ISubscriptionSummary } from "../../types";
import { CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubscriptionOverviewProps {
  subscription: ISubscriptionSummary;
}

export function SubscriptionOverview({ subscription }: SubscriptionOverviewProps) {
  const usagePercentage = Math.round((subscription.seatsUsed / subscription.seatsTotal) * 100);
  
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-[hsl(var(--warning))]" /> Subscription
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1 space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-[hsl(var(--foreground))]">{subscription.planName}</h4>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium uppercase border border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]">
                {subscription.status}
              </span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{subscription.billingCycle}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-[hsl(var(--foreground))]">
              ${subscription.amount.toLocaleString()}
            </div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">per year</div>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-[hsl(var(--border))]">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">Recruiter Seats</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{subscription.seatsUsed} / {subscription.seatsTotal}</span>
          </div>
          <div className="h-2 w-full bg-[hsl(var(--secondary))] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[hsl(var(--primary))] rounded-full" 
              style={{ width: `${usagePercentage}%` }} 
            />
          </div>
        </div>

        <div className="pt-2 border-t border-[hsl(var(--border))] flex items-center justify-between">
          <div className="text-xs text-[hsl(var(--muted-foreground))]">
            Renews on <span className="text-[hsl(var(--foreground))] font-medium">{subscription.nextBillingDate}</span>
          </div>
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
            <Zap className="h-3 w-3 text-[hsl(var(--warning))]" /> Upgrade
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
