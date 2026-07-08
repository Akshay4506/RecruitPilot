import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PipelineActionDialogsProps {
  dialogType: 'MOVE' | 'REJECT' | 'ASSIGN' | 'SCHEDULE' | null;
  onClose: () => void;
}

export function PipelineActionDialogs({ dialogType, onClose }: PipelineActionDialogsProps) {
  if (!dialogType) return null;

  return (
    <Dialog open={!!dialogType} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {dialogType === 'MOVE' && "Move Candidate"}
            {dialogType === 'REJECT' && "Reject Candidate"}
            {dialogType === 'ASSIGN' && "Assign Recruiter"}
            {dialogType === 'SCHEDULE' && "Schedule Interview"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-6 text-[hsl(var(--muted-foreground))]">
          {dialogType === 'MOVE' && "Select a new stage for this candidate."}
          {dialogType === 'REJECT' && "Select a rejection reason to send to the candidate."}
          {dialogType === 'ASSIGN' && "Select a team member to assign."}
          {dialogType === 'SCHEDULE' && "Connect your calendar to schedule an interview."}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
