"use client";

import * as React from "react";
import { RbacRole, PermissionTemplate, PermissionState, RolePermission } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { PERMISSIONS } from "../../../admin-shared/constants/permissions";
import { PERMISSION_CATEGORIES } from "../../../admin-shared/constants/permission-categories";
import { Check, X, Circle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PermissionMatrixProps {
  role: RbacRole;
  template: PermissionTemplate | null;
}

// Group permissions by prefix based on categories (e.g. jobs:view -> jobs)
const getPermissionsForCategory = (categoryId: string) => {
  return Object.entries(PERMISSIONS)
    .filter(([_, val]) => (val as string).startsWith(categoryId + ":"))
    .map(([key, val]) => ({ key, value: val as string }));
};

export function PermissionMatrix({ role, template }: PermissionMatrixProps) {
  // Normally state would be managed by react-hook-form or similar.
  const [permissions, setPermissions] = React.useState<RolePermission[]>(role.permissions);

  const getPermissionState = (permValue: string): PermissionState => {
    const found = permissions.find(p => p.permissionId === permValue);
    if (found) return found.state;
    return template ? "INHERIT" : "DENY";
  };

  const getInheritedState = (permValue: string): "ALLOW" | "DENY" => {
    if (!template) return "DENY";
    const found = template.permissions.find(p => p.permissionId === permValue);
    return found?.state === "ALLOW" ? "ALLOW" : "DENY";
  };

  const handleStateChange = (permValue: string, newState: PermissionState) => {
    setPermissions(prev => {
      const existing = prev.find(p => p.permissionId === permValue);
      if (existing) {
        return prev.map(p => p.permissionId === permValue ? { ...p, state: newState } : p);
      }
      return [...prev, { permissionId: permValue as any, state: newState }];
    });
  };

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))] flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Permission Matrix</CardTitle>
        <div className="flex items-center gap-4 text-xs font-medium text-[hsl(var(--muted-foreground))]">
          <div className="flex items-center gap-1.5"><div className="h-4 w-4 bg-[hsl(var(--success)/0.1)] border border-[hsl(var(--success))] rounded-sm flex items-center justify-center"><Check className="h-3 w-3 text-[hsl(var(--success))]" /></div> Allow</div>
          <div className="flex items-center gap-1.5"><div className="h-4 w-4 bg-[hsl(var(--destructive)/0.1)] border border-[hsl(var(--destructive))] rounded-sm flex items-center justify-center"><X className="h-3 w-3 text-[hsl(var(--destructive))]" /></div> Deny</div>
          {template && (
            <div className="flex items-center gap-1.5"><div className="h-4 w-4 bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded-sm flex items-center justify-center"><Circle className="h-2 w-2 text-[hsl(var(--muted-foreground))]" /></div> Inherit</div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[hsl(var(--border))]">
          {PERMISSION_CATEGORIES.map((category: any) => {
            const catPerms = getPermissionsForCategory(category.id);
            if (catPerms.length === 0) return null;

            return (
              <div key={category.id} className="p-6">
                <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-4">{category.label}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                  {catPerms.map(perm => {
                    const currentState = getPermissionState(perm.value);
                    const actionName = perm.value.split(":")[1];
                    const label = actionName.charAt(0).toUpperCase() + actionName.slice(1);
                    const inheritedValue = getInheritedState(perm.value);

                    return (
                      <div key={perm.value} className="flex items-center justify-between">
                        <span className="text-sm text-[hsl(var(--foreground))] font-medium">{label}</span>
                        
                        <div className="flex items-center gap-1 bg-[hsl(var(--muted))] rounded-md p-1">
                          <button
                            type="button"
                            onClick={() => handleStateChange(perm.value, "ALLOW")}
                            className={`h-6 w-8 rounded flex items-center justify-center transition-colors ${currentState === "ALLOW" ? "bg-[hsl(var(--background))] shadow-sm border border-[hsl(var(--success))] text-[hsl(var(--success))]" : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--background))/50]"}`}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          
                          {template && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => handleStateChange(perm.value, "INHERIT")}
                                    className={`h-6 w-8 rounded flex items-center justify-center transition-colors ${currentState === "INHERIT" ? "bg-[hsl(var(--background))] shadow-sm border border-[hsl(var(--border))] text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--background))/50]"}`}
                                  >
                                    <Circle className="h-2.5 w-2.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Inherit ({inheritedValue})</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}

                          <button
                            type="button"
                            onClick={() => handleStateChange(perm.value, "DENY")}
                            className={`h-6 w-8 rounded flex items-center justify-center transition-colors ${currentState === "DENY" ? "bg-[hsl(var(--background))] shadow-sm border border-[hsl(var(--destructive))] text-[hsl(var(--destructive))]" : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--background))/50]"}`}
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
