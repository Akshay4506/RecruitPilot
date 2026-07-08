import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ScheduleActionDialogsProps {
  dialogType: 'RESCHEDULE' | 'CANCEL' | 'SYNC' | null;
  onClose: () => void;
}

export function ScheduleActionDialogs({ dialogType, onClose }: ScheduleActionDialogsProps) {
  if (!dialogType) return null;

  return (
    <Dialog open={!!dialogType} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {dialogType === 'RESCHEDULE' && "Reschedule Interview"}
            {dialogType === 'CANCEL' && "Cancel Interview"}
            {dialogType === 'SYNC' && "Sync Calendar"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-6 text-[hsl(var(--muted-foreground))]">
          {dialogType === 'RESCHEDULE' && "Select a new date and time from the availability matrix."}
          {dialogType === 'CANCEL' && "Are you sure you want to cancel? This will send a cancellation notice to the candidate and panel."}
          {dialogType === 'SYNC' && "Connect your Google or Outlook calendar to sync availability instantly."}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          {dialogType !== 'SYNC' && <Button onClick={onClose} variant={dialogType === 'CANCEL' ? 'destructive' : 'primary'}>Confirm</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
