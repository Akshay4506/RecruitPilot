import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentMethodDialog({ isOpen, onClose }: PaymentMethodDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>
            Securely add a new credit card or bank account.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Stripe Elements UI will go here.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} disabled>Save Payment Method</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
