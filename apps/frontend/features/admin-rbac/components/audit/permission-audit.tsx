import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { RbacRole, PermissionAuditSummary } from "../../types";
import { Clock, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface PermissionAuditProps {
  role: RbacRole;
  summary?: PermissionAuditSummary;
}

export function PermissionAudit({ role, summary }: PermissionAuditProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Audit & Compliance</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center shrink-0">
              <Clock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Last Modified</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{formatDate(role.updatedAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Created By</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{role.createdBy?.firstName} {role.createdBy?.lastName}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
