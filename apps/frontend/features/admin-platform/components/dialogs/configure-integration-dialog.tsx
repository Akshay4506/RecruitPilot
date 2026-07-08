import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfigureIntegrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  integrationName?: string;
}

export function ConfigureIntegrationDialog({ isOpen, onClose, integrationName }: ConfigureIntegrationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure {integrationName || "Integration"}</DialogTitle>
          <DialogDescription>
            Set up authentication and synchronization preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">OAuth / Configuration form goes here.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} disabled>Save Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
