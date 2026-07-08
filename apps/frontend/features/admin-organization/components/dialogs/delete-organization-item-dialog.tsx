import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteOrganizationItemDialogProps {
  itemType: "Office" | "Department" | "Business Unit";
  itemName: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteOrganizationItemDialog({ itemType, itemName, isOpen, onClose }: DeleteOrganizationItemDialogProps) {
  if (!itemName) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[hsl(var(--destructive))]">
            <AlertTriangle className="h-5 w-5" />
            Delete {itemType}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the {itemType.toLowerCase()} <strong>{itemName}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="p-3 bg-[hsl(var(--destructive)/0.1)] border border-[hsl(var(--destructive)/0.2)] rounded-lg text-sm text-[hsl(var(--destructive))]">
            <strong>Warning:</strong> Ensure all active users and jobs have been reassigned before proceeding.
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive)/0.9)]" onClick={onClose}>
            Delete {itemType}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
