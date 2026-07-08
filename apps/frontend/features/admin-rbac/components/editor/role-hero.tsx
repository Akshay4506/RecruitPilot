import * as React from "react";
import { RbacRole } from "../../types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Undo } from "lucide-react";
import Link from "next/link";
import { StatusChip } from "@/components/display/status-chip";
import { formatDate } from "@/lib/utils";

interface RoleHeroProps {
  role: RbacRole;
  isDirty?: boolean;
}

export function RoleHero({ role, isDirty }: RoleHeroProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[hsl(var(--border))]">
      <div className="flex items-center gap-4">
        <Link href="/admin/roles">
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">{role.name}</h1>
            <StatusChip label={role.status} variant={role.status === "ACTIVE" ? "success" : "neutral"} />
            {isDirty && (
              <span className="text-xs font-medium text-[hsl(var(--warning))] bg-[hsl(var(--warning)/0.1)] px-2 py-0.5 rounded">Unsaved Changes</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mt-1">
            <span>Created by {role.createdBy?.firstName} {role.createdBy?.lastName}</span>
            <span>•</span>
            <span>Last updated {formatDate(role.updatedAt)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button variant="outline" className="gap-2 flex-1 md:flex-none" disabled={!isDirty}>
          <Undo className="h-4 w-4" />
          Discard
        </Button>
        <Button className="gap-2 flex-1 md:flex-none" disabled={!isDirty}>
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
