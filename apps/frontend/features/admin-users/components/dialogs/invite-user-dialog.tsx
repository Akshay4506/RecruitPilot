"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelectFilter } from "@/components/filters/multi-select-filter";

interface InviteUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteUserDialog({ isOpen, onClose }: InviteUserDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-[hsl(var(--border))] bg-[hsl(var(--background))]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[hsl(var(--foreground))]">Invite New User</DialogTitle>
          <DialogDescription className="text-sm text-[hsl(var(--muted-foreground))]">
            Send an invitation link for them to set up their account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Email Address</label>
            <Input type="email" placeholder="e.g. alex.rivera@acme.corp" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Role</label>
            <MultiSelectFilter
              title="Select Role"
              options={[
                { label: "Admin", value: "ADMIN" },
                { label: "Recruiter", value: "RECRUITER" },
                { label: "Hiring Manager", value: "HIRING_MANAGER" },
                { label: "Candidate", value: "CANDIDATE" }
              ]}
              selectedValues={new Set()}
              onSelectionChange={() => {}}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Send Invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
