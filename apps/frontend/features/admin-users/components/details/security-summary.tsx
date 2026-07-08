import * as React from "react";
import { User } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { ShieldCheck, ShieldAlert, KeyRound, Clock, LogIn, Lock, Mail } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface SecuritySummaryProps {
  user: User;
}

export function SecuritySummary({ user }: SecuritySummaryProps) {
  const { security } = user;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Security & Access</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
              <KeyRound className="h-4 w-4" /> Multi-Factor Auth
            </span>
            {security.mfaEnabled ? (
              <span className="flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--success))]">
                <ShieldCheck className="h-4 w-4" /> Enabled
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--warning))]">
                <ShieldAlert className="h-4 w-4" /> Disabled
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
              <Lock className="h-4 w-4" /> Password Changed
            </span>
            <span className="text-sm text-[hsl(var(--foreground))]">
              {formatDate(security.passwordChangedAt)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
              <Clock className="h-4 w-4" /> Account State
            </span>
            <span className="text-sm text-[hsl(var(--foreground))] font-medium capitalize">
              {security.accountState.toLowerCase()}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
              <LogIn className="h-4 w-4" /> Last Login
            </span>
            <span className="text-sm text-[hsl(var(--foreground))]">
              {formatDate(security.lastLoginAt)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" /> Last Failed Login
            </span>
            <span className="text-sm text-[hsl(var(--foreground))]">
              {security.lastFailedLoginAt ? formatDate(security.lastFailedLoginAt) : "None"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2">
              <Mail className="h-4 w-4" /> Invite Status
            </span>
            <span className="text-sm text-[hsl(var(--foreground))] capitalize">
              {user.invitation?.status.toLowerCase() || "Accepted"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
