import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RbacRole } from "../../types";

interface CloneRoleDialogProps {
  role: RbacRole | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CloneRoleDialog({ role, isOpen, onClose }: CloneRoleDialogProps) {
  if (!role) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Clone Role</DialogTitle>
          <DialogDescription>
            Create a copy of <strong>{role.name}</strong> with all its permissions and settings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">New Role Name</label>
            <Input defaultValue={`${role.name} (Copy)`} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Clone Role</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
