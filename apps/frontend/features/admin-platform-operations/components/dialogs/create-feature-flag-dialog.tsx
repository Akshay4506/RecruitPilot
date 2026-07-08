import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateFeatureFlagDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateFeatureFlagDialog({ open, onClose }: CreateFeatureFlagDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Feature Flag</DialogTitle>
          <DialogDescription>
            Define a new feature toggle for staged rollouts.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Flag Name</label>
            <Input placeholder="e.g. New AI Parsing" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Flag Key</label>
            <Input placeholder="e.g. NEW_AI_PARSING" className="font-mono text-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Environment</label>
            <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <option>DEVELOPMENT</option>
              <option>STAGING</option>
              <option>PRODUCTION</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Create Flag</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
