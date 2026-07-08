"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "../../types";
import { AlertTriangle } from "lucide-react";

interface DisableUserDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DisableUserDialog({ user, isOpen, onClose }: DisableUserDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-[hsl(var(--warning)/0.2)] bg-[hsl(var(--background))]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--warning)/0.1)] mb-4">
            <AlertTriangle className="h-6 w-6 text-[hsl(var(--warning))]" />
          </div>
          <DialogTitle className="text-xl font-semibold text-center text-[hsl(var(--foreground))]">
            Disable User Account
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-[hsl(var(--muted-foreground))]">
            Are you sure you want to disable access for <strong>{user.profile.firstName} {user.profile.lastName}</strong>? 
            They will immediately be logged out and cannot access the platform until re-enabled.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0 sm:justify-center pt-4">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">Cancel</Button>
          <Button className="w-full sm:w-auto bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] hover:bg-[hsl(var(--warning)/0.9)]">
            Disable Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
