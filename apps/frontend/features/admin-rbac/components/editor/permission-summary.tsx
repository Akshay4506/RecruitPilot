import * as React from "react";
import { RbacRole, PermissionTemplate } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Shield, Key, Network, ShieldAlert } from "lucide-react";

interface PermissionSummaryProps {
  role: RbacRole;
  template: PermissionTemplate | null;
}

export function PermissionSummary({ role, template }: PermissionSummaryProps) {
  const totalPerms = role.permissions.length;
  
  let inheritedCount = 0;
  let overriddenCount = 0;

  if (template) {
    inheritedCount = role.permissions.filter(p => p.state === "INHERIT").length;
    overriddenCount = role.permissions.filter(p => p.state !== "INHERIT").length;
  } else {
    overriddenCount = totalPerms;
  }

  // Just mock conflict logic for UI
  const conflictCount = 0;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Permission Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="flex flex-col gap-1 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
            <Key className="h-4 w-4" />
            <span className="text-xs">Explicit Permissions</span>
          </div>
          <span className="text-xl font-bold text-[hsl(var(--foreground))]">{totalPerms}</span>
        </div>
        
        <div className="flex flex-col gap-1 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
            <Network className="h-4 w-4" />
            <span className="text-xs">Inherited</span>
          </div>
          <span className="text-xl font-bold text-[hsl(var(--foreground))]">{inheritedCount}</span>
        </div>

        <div className="flex flex-col gap-1 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
            <Shield className="h-4 w-4" />
            <span className="text-xs">Overrides</span>
          </div>
          <span className="text-xl font-bold text-[hsl(var(--foreground))]">{overriddenCount}</span>
        </div>

        <div className="flex flex-col gap-1 p-3 rounded-lg border border-[hsl(var(--warning)/0.3)] bg-[hsl(var(--warning)/0.05)]">
          <div className="flex items-center gap-2 text-[hsl(var(--warning))]">
            <ShieldAlert className="h-4 w-4" />
            <span className="text-xs">Conflicts</span>
          </div>
          <span className="text-xl font-bold text-[hsl(var(--warning))]">{conflictCount}</span>
        </div>

      </CardContent>
    </Card>
  );
}
