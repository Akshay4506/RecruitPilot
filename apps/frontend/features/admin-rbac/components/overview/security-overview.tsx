import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { mockRbacMetrics } from "../../mock/rbac.mock";
import { ShieldCheck, ShieldAlert, Clock, AlertTriangle } from "lucide-react";

export function SecurityOverview() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] h-full">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Security Overview</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex flex-col justify-between gap-4">
        
        <div className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--success)/0.1)] flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-[hsl(var(--success))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">MFA Adoption</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Enforced on admin roles</span>
            </div>
          </div>
          <span className="font-semibold text-[hsl(var(--success))]">{mockRbacMetrics.mfaAdoptionRate}%</span>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--warning)/0.1)] flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">High Risk Roles</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Critical access granted</span>
            </div>
          </div>
          <span className="font-semibold text-[hsl(var(--warning))]">{mockRbacMetrics.highRiskRoles}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--destructive)/0.1)] flex items-center justify-center">
              <ShieldAlert className="h-4 w-4 text-[hsl(var(--destructive))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Elevated Access</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Users with root level access</span>
            </div>
          </div>
          <span className="font-semibold text-[hsl(var(--destructive))]">{mockRbacMetrics.elevatedAccessCount}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <Clock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Expiring Policies</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Temporary access ending soon</span>
            </div>
          </div>
          <span className="font-semibold text-[hsl(var(--foreground))]">{mockRbacMetrics.expiringPolicies}</span>
        </div>

      </CardContent>
    </Card>
  );
}
