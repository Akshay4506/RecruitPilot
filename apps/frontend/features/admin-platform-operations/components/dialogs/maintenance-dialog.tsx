import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MaintenanceDialogProps {
  open: boolean;
  onClose: () => void;
}

export function MaintenanceDialog({ open, onClose }: MaintenanceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Maintenance</DialogTitle>
          <DialogDescription>
            Schedule a future downtime window. Users will be notified in advance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Event Title</label>
            <Input placeholder="e.g. Database Upgrade" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Start Time (UTC)</label>
            <Input type="datetime-local" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">End Time (UTC)</label>
            <Input type="datetime-local" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
