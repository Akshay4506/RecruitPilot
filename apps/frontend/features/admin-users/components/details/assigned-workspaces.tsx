import * as React from "react";
import { User } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Globe } from "lucide-react";

interface AssignedWorkspacesProps {
  user: User;
}

export function AssignedWorkspaces({ user }: AssignedWorkspacesProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Assigned Workspaces</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {user.workspaces.map((ws, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
            <div className="h-8 w-8 rounded bg-[hsl(var(--primary)/0.1)] flex items-center justify-center shrink-0">
              <Globe className="h-4 w-4 text-[hsl(var(--primary))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">{ws}</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Standard Access</span>
            </div>
          </div>
        ))}
        {user.workspaces.length === 0 && (
          <div className="text-sm text-[hsl(var(--muted-foreground))] text-center py-4">
            No workspaces assigned
          </div>
        )}
      </CardContent>
    </Card>
  );
}
