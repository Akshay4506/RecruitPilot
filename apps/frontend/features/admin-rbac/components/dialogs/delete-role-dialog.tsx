import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RbacRole } from "../../types";
import { AlertTriangle } from "lucide-react";

interface DeleteRoleDialogProps {
  role: RbacRole | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteRoleDialog({ role, isOpen, onClose }: DeleteRoleDialogProps) {
  if (!role) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[hsl(var(--destructive))]">
            <AlertTriangle className="h-5 w-5" />
            Delete Role
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{role.name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        {role.assignedUsersCount > 0 && (
          <div className="py-4">
            <div className="p-3 bg-[hsl(var(--destructive)/0.1)] border border-[hsl(var(--destructive)/0.2)] rounded-lg text-sm text-[hsl(var(--destructive))]">
              <strong>Warning:</strong> There are {role.assignedUsersCount} users assigned to this role. You must reassign them before deleting this role.
            </div>
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive)/0.9)]" disabled={role.assignedUsersCount > 0} onClick={onClose}>
            Delete Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
