import * as React from "react";
import { RbacRole } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Clock, Smartphone, MapPin } from "lucide-react";

interface AccessPoliciesProps {
  role: RbacRole;
}

export function AccessPolicies({ role }: AccessPoliciesProps) {
  const { accessPolicy } = role;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Conditional Access Policies</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        
        <div className="flex items-start gap-4 p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="h-8 w-8 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center shrink-0">
            <Smartphone className="h-4 w-4 text-[hsl(var(--primary))]" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Device Policies</span>
              {accessPolicy.devicePolicies.length > 0 ? (
                <span className="text-xs font-semibold text-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)] px-2 py-0.5 rounded">Enforced</span>
              ) : (
                <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Not Configured</span>
              )}
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              {accessPolicy.devicePolicies.length > 0 
                ? accessPolicy.devicePolicies.join(", ") 
                : "No device restrictions applied."}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="h-8 w-8 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center shrink-0">
            <Clock className="h-4 w-4 text-[hsl(var(--primary))]" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Session & Time Restrictions</span>
              {accessPolicy.timeRestrictions || accessPolicy.sessionLimits > 0 ? (
                <span className="text-xs font-semibold text-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)] px-2 py-0.5 rounded">Enforced</span>
              ) : (
                <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Not Configured</span>
              )}
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Max concurrent sessions: {accessPolicy.sessionLimits || "Unlimited"}.
              {accessPolicy.timeRestrictions && ` Access restricted to ${accessPolicy.timeRestrictions.startTime} - ${accessPolicy.timeRestrictions.endTime} (${accessPolicy.timeRestrictions.timezone}).`}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="h-8 w-8 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 text-[hsl(var(--primary))]" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">IP Restrictions</span>
              {accessPolicy.ipRestrictions.length > 0 ? (
                <span className="text-xs font-semibold text-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)] px-2 py-0.5 rounded">Enforced</span>
              ) : (
                <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Not Configured</span>
              )}
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              {accessPolicy.ipRestrictions.length > 0 
                ? `${accessPolicy.ipRestrictions.length} authorized IP ranges.`
                : "No IP restrictions applied."}
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
