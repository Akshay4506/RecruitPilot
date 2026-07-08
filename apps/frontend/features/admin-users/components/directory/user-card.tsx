"use client";

import * as React from "react";
import { User } from "../../types";
import { Card, CardContent } from "@/components/cards/card";
import { Avatar } from "@/components/ui/avatar";
import { StatusChip } from "@/components/display/status-chip";
import { Building2, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ROLE_LABELS } from "@/features/admin-shared/constants";

interface UserCardProps {
  user: User;
  onClick?: (user: User) => void;
}

export function UserCard({ user, onClick }: UserCardProps) {
  const getStatusVariant = (status: string) => {
    switch(status) {
      case "ACTIVE": return "success";
      case "INACTIVE": return "warning";
      case "DISABLED":
      case "LOCKED": return "error";
      default: return "neutral";
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:border-[hsl(var(--primary))] transition-colors border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]"
      onClick={() => onClick?.(user)}
    >
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar 
              src={user.profile.avatarSrc} 
              name={`${user.profile.firstName} ${user.profile.lastName}`}
              className="h-10 w-10"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-[hsl(var(--foreground))]">{user.profile.firstName} {user.profile.lastName}</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{user.email}</span>
            </div>
          </div>
          <StatusChip label={user.status} variant={getStatusVariant(user.status)} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
            <span className="capitalize font-medium text-[hsl(var(--foreground))]">{ROLE_LABELS[user.role]}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
            <Building2 className="h-3.5 w-3.5" />
            <span>{user.department?.name || "No department"} {user.team ? `• ${user.team.name}` : ""}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
            <Calendar className="h-3.5 w-3.5" />
            <span>Joined {formatDate(user.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
