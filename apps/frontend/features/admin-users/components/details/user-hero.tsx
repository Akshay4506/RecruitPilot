import * as React from "react";
import { User } from "../../types";
import { Avatar } from "@/components/ui/avatar";
import { StatusChip } from "@/components/display/status-chip";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { ROLE_LABELS } from "@/features/admin-shared/constants";

interface UserHeroProps {
  user: User;
}

export function UserHero({ user }: UserHeroProps) {
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
    <div className="flex flex-col gap-6 border-b border-[hsl(var(--border))] pb-6">
      <Link href="/admin/users" className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] w-fit">
        <ArrowLeft className="h-4 w-4" /> Back to Directory
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex items-center gap-5">
          <Avatar 
            src={user.profile.avatarSrc} 
            name={`${user.profile.firstName} ${user.profile.lastName}`}
            className="h-20 w-20"
          />
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
              {user.profile.firstName} {user.profile.lastName}
            </h1>
            <div className="flex items-center gap-3">
              <StatusChip label={user.status} variant={getStatusVariant(user.status)} />
              <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                {ROLE_LABELS[user.role]}
              </span>
            </div>
          </div>
        </div>

        <Button variant="outline" className="gap-2 shrink-0">
          <Edit className="h-4 w-4" /> Edit Profile
        </Button>
      </div>
    </div>
  );
}
