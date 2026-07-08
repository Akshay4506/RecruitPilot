import * as React from "react";
import { Card, CardContent } from "@/components/cards/card";
import { ShieldCheck, ShieldAlert, Users, Key } from "lucide-react";
import { mockRbacMetrics } from "../../mock/rbac.mock";

export function RbacMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Active Roles</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{mockRbacMetrics.activeRoles}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-[hsl(var(--primary))]" />
            </div>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">{mockRbacMetrics.customRoles} custom roles</p>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Permission Sets</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{mockRbacMetrics.permissionSets}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <Key className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
            </div>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">Across 10 categories</p>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Assigned Users</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{mockRbacMetrics.assignedUsers}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <Users className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
            </div>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">Mapped to roles</p>
        </CardContent>
      </Card>

      <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Policy Conflicts</p>
              <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{mockRbacMetrics.policyConflicts}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--destructive)/0.1)] flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-[hsl(var(--destructive))]" />
            </div>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">Requires admin review</p>
        </CardContent>
      </Card>
    </div>
  );
}
