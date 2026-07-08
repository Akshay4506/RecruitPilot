"use client";

import * as React from "react";
import { Drawer, DrawerContent, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { User } from "../../types";
import { Avatar } from "@/components/ui/avatar";
import { StatusChip } from "@/components/display/status-chip";
import { X, Building2, Briefcase, Mail, MapPin, Clock, Calendar, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { ROLE_LABELS } from "@/features/admin-shared/constants";

interface UserPreviewDrawerProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDetails?: (user: User) => void;
}

export function UserPreviewDrawer({ user, isOpen, onClose, onViewDetails }: UserPreviewDrawerProps) {
  if (!user) return null;

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
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="w-full max-w-md sm:max-w-lg right-0 h-full">
        <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
          <DrawerTitle className="text-lg font-semibold text-[hsl(var(--foreground))]">User Preview</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon-sm">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          {/* Header Profile */}
          <div className="flex items-start gap-4">
            <Avatar 
              src={user.profile.avatarSrc} 
              name={`${user.profile.firstName} ${user.profile.lastName}`}
              className="h-16 w-16"
            />
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">{user.profile.firstName} {user.profile.lastName}</h2>
              <div className="flex items-center gap-2">
                <StatusChip label={user.status} variant={getStatusVariant(user.status)} />
                <span className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  {ROLE_LABELS[user.role]}
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
              <Mail className="h-4 w-4" /> <span>{user.email}</span>
            </div>
            {user.profile.title && (
              <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                <Briefcase className="h-4 w-4" /> <span>{user.profile.title}</span>
              </div>
            )}
            {user.profile.location && (
              <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                <MapPin className="h-4 w-4" /> <span>{user.profile.location}</span>
              </div>
            )}
          </div>

          {/* Department & Team */}
          <div className="space-y-3 pt-4 border-t border-[hsl(var(--border))]">
            <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">Organization</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Department</span>
                <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                  <Building2 className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  {user.department?.name || "-"}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Team</span>
                <div className="text-sm text-[hsl(var(--foreground))]">{user.team?.name || "-"}</div>
              </div>
            </div>
            <div className="space-y-1 pt-2">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Assigned Workspaces</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {user.workspaces.map(ws => (
                  <span key={ws} className="px-2 py-1 bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] text-xs rounded-md">
                    {ws}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Security & Activity */}
          <div className="space-y-3 pt-4 border-t border-[hsl(var(--border))]">
            <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">Security & Activity</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Last Login</span>
                <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                  <Clock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  {formatDate(user.security.lastLoginAt)}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Joined</span>
                <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                  <Calendar className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  {formatDate(user.createdAt)}
                </div>
              </div>
              <div className="col-span-2 space-y-1 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  {user.security.mfaEnabled ? (
                    <><ShieldCheck className="h-4 w-4 text-[hsl(var(--success))]" /> <span className="text-[hsl(var(--success))] font-medium">MFA Enabled</span></>
                  ) : (
                    <span className="text-[hsl(var(--muted-foreground))]">MFA Not Enabled</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Close</Button>
          <Button className="flex-1" onClick={() => onViewDetails?.(user)}>View Full Profile</Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
