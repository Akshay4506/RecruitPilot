"use client";

import * as React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { RbacRole } from "../../types";
import { X, Users, Shield, Globe, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/display/status-chip";
import { Badge } from "@/components/ui/badge";

interface RolePreviewDrawerProps {
  role: RbacRole | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDetails: (role: RbacRole) => void;
}

export function RolePreviewDrawer({ role, isOpen, onClose, onViewDetails }: RolePreviewDrawerProps) {
  if (!role) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-full sm:w-[400px] rounded-none bg-[hsl(var(--background))] border-l border-[hsl(var(--border))]">
        <DrawerHeader className="border-b border-[hsl(var(--border))] p-4 flex items-center justify-between">
          <DrawerTitle className="text-lg font-semibold text-[hsl(var(--foreground))]">Role Preview</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-16 w-16 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
              <Shield className="h-8 w-8 text-[hsl(var(--primary))]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">{role.name}</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{role.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <StatusChip label={role.status} variant={role.status === "ACTIVE" ? "success" : "neutral"} />
              <Badge variant="outline">{role.type}</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Summary</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Assigned</span>
                </div>
                <span className="text-lg font-semibold text-[hsl(var(--foreground))]">{role.assignedUsersCount}</span>
              </div>
              
              <div className="flex flex-col gap-1 p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                  <ShieldAlert className="h-4 w-4" />
                  <span className="text-xs">Permissions</span>
                </div>
                <span className="text-lg font-semibold text-[hsl(var(--foreground))]">{role.permissions.length}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Workspaces</h4>
              <div className="flex flex-wrap gap-2">
                {role.workspaces.map(ws => (
                  <Badge key={ws} variant="outline" className="gap-1 bg-[hsl(var(--secondary)/0.5)]">
                    <Globe className="h-3 w-3" /> {ws}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] mt-auto">
          <Button className="w-full" onClick={() => onViewDetails(role)}>
            View Role Matrix
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
