import * as React from "react";
import { RbacRole } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { mockWorkspaces } from "../../../admin-shared/mock";
import { Badge } from "@/components/ui/badge";
import { Globe, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface WorkspaceAccessProps {
  role: RbacRole;
}

export function WorkspaceAccess({ role }: WorkspaceAccessProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Workspace Access</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        
        {role.type === "SYSTEM" && role.name === "Super Administrator" && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(var(--primary)/0.05)] border border-[hsl(var(--primary)/0.2)] mb-4">
            <Shield className="h-5 w-5 text-[hsl(var(--primary))]" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[hsl(var(--primary))]">Global Access Override</span>
              <span className="text-xs text-[hsl(var(--primary)/0.8)]">This role has implicit access to all current and future workspaces.</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {mockWorkspaces.map((ws: any) => {
            const hasAccess = role.workspaces.includes(ws.id) || (role.type === "SYSTEM" && role.name === "Super Administrator");
            
            return (
              <div key={ws.id} className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center shrink-0">
                    <Globe className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[hsl(var(--foreground))]">{ws.name}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{ws.environment}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {hasAccess && (
                    <Badge variant="outline" className="text-xs bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))] border-[hsl(var(--success)/0.2)]">
                      Granted
                    </Badge>
                  )}
                  <Switch 
                    checked={hasAccess} 
                    disabled={role.type === "SYSTEM" && role.name === "Super Administrator"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
