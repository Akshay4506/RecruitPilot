import * as React from "react";
import { User } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX, KeyRound, Mail, LogOut, ShieldAlert } from "lucide-react";

interface QuickActionsProps {
  user: User;
}

export function QuickActions({ user }: QuickActionsProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex flex-col gap-2">
        <Button variant="outline" className="justify-start gap-2 h-9 w-full">
          <KeyRound className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> Reset Password
        </Button>
        <Button variant="outline" className="justify-start gap-2 h-9 w-full">
          <Mail className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> Resend Invitation
        </Button>
        <Button variant="outline" className="justify-start gap-2 h-9 w-full">
          <LogOut className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> Terminate Sessions
        </Button>
        
        <div className="w-full h-px bg-[hsl(var(--border))] my-2" />
        
        {user.status === "ACTIVE" ? (
          <Button variant="outline" className="justify-start gap-2 h-9 w-full text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.3)] hover:bg-[hsl(var(--warning)/0.1)] hover:text-[hsl(var(--warning))]">
            <UserX className="h-4 w-4" /> Disable Account
          </Button>
        ) : (
          <Button variant="outline" className="justify-start gap-2 h-9 w-full text-[hsl(var(--success))] border-[hsl(var(--success)/0.3)] hover:bg-[hsl(var(--success)/0.1)] hover:text-[hsl(var(--success))]">
            <UserCheck className="h-4 w-4" /> Enable Account
          </Button>
        )}
        
        <Button variant="outline" className="justify-start gap-2 h-9 w-full text-[hsl(var(--destructive))] border-[hsl(var(--destructive)/0.3)] hover:bg-[hsl(var(--destructive)/0.1)] hover:text-[hsl(var(--destructive))]">
          <ShieldAlert className="h-4 w-4" /> Delete Account
        </Button>
      </CardContent>
    </Card>
  );
}
