import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateOfficeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateOfficeDialog({ isOpen, onClose }: CreateOfficeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Office Location</DialogTitle>
          <DialogDescription>
            Create a new physical or virtual office location.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Office Name</label>
            <Input placeholder="e.g. London HQ" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Region</label>
            <Input placeholder="e.g. EMEA" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">City</label>
            <Input placeholder="e.g. London" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Add Office</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
