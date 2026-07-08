"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "../../types";
import { KeyRound } from "lucide-react";

interface ResetPasswordDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ResetPasswordDialog({ user, isOpen, onClose }: ResetPasswordDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-[hsl(var(--border))] bg-[hsl(var(--background))]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)] mb-4">
            <KeyRound className="h-6 w-6 text-[hsl(var(--primary))]" />
          </div>
          <DialogTitle className="text-xl font-semibold text-center text-[hsl(var(--foreground))]">
            Reset Password
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-[hsl(var(--muted-foreground))]">
            Send a password reset email to <strong>{user.email}</strong>. 
            Their current active sessions will not be terminated.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0 sm:justify-center pt-4">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">Cancel</Button>
          <Button className="w-full sm:w-auto">Send Reset Link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
