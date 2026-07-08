import * as React from "react";
import { Interview } from "../../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/primitives";

interface RescheduleDialogProps {
  interview: Interview | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: string, reason: string) => void;
}

export function RescheduleDialog({ interview, isOpen, onClose, onSubmit }: RescheduleDialogProps) {
  const [date, setDate] = React.useState("");
  const [reason, setReason] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !reason) return;
    onSubmit(date, reason);
    onClose();
    setDate("");
    setReason("");
  };

  if (!interview) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Reschedule</DialogTitle>
          <DialogDescription>
            Submit a request to reschedule your interview for {interview.jobTitle} at {interview.companyName}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="preferredDate">Preferred Date & Time</Label>
            <Input
              id="preferredDate"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Rescheduling</Label>
            <Textarea
              id="reason"
              placeholder="Please briefly explain why you need to reschedule..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
