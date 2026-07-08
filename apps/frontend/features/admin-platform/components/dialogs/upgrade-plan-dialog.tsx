import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UpgradePlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradePlanDialog({ isOpen, onClose }: UpgradePlanDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upgrade Subscription Plan</DialogTitle>
          <DialogDescription>
            Choose a new plan to unlock more seats and features.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Plan selection UI will go here.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} disabled>Continue to Checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
