import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Progress } from "@/components/ui/primitives";
import { mockOrganizationMetrics } from "../../mock/organization.mock";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export function OrganizationHealth() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Organization Health</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[hsl(var(--primary))]" />
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Setup Completion</span>
            </div>
            <span className="text-sm font-bold text-[hsl(var(--foreground))]">{mockOrganizationMetrics.completionScore}%</span>
          </div>
          <Progress value={mockOrganizationMetrics.completionScore} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[hsl(var(--success))]" />
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Security Score</span>
            </div>
            <span className="text-sm font-bold text-[hsl(var(--foreground))]">{mockOrganizationMetrics.securityScore}/100</span>
          </div>
          <Progress value={mockOrganizationMetrics.securityScore} className="h-2" variant="success" />
        </div>

      </CardContent>
    </Card>
  );
}
