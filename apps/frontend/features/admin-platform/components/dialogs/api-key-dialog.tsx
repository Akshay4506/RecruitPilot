import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ApiKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApiKeyDialog({ isOpen, onClose }: ApiKeyDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate API Key</DialogTitle>
          <DialogDescription>
            Create a new programmatic access key. Store it securely.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Key Name</label>
            <Input placeholder="e.g. Zapier Integration" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Scopes</label>
            <Input placeholder="e.g. read:candidates, write:jobs" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Generate Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
