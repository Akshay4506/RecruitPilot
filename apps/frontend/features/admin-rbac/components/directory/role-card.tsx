"use client";

import * as React from "react";
import { RbacRole } from "../../types";
import { Card, CardContent } from "@/components/cards/card";
import { StatusChip } from "@/components/display/status-chip";
import { Users, Key, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RoleCardProps {
  role: RbacRole;
  onClick?: (role: RbacRole) => void;
  selected?: boolean;
}

export function RoleCard({ role, onClick, selected }: RoleCardProps) {
  return (
    <Card 
      className={`border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] cursor-pointer hover:border-[hsl(var(--primary)/0.5)] transition-colors ${selected ? "ring-2 ring-[hsl(var(--primary))]" : ""}`}
      onClick={() => onClick?.(role)}
    >
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-semibold text-[hsl(var(--foreground))]">{role.name}</span>
            <Badge variant="outline" className="mt-1 w-fit">{role.type}</Badge>
          </div>
          <StatusChip label={role.status} variant={role.status === "ACTIVE" ? "success" : "neutral"} />
        </div>

        <p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-2">
          {role.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{role.assignedUsersCount} Users</span>
          </div>
          <div className="flex items-center gap-1">
            <Key className="h-3.5 w-3.5" />
            <span>{role.permissions.length} Perms</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5" />
            <span>{role.riskLevel}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
