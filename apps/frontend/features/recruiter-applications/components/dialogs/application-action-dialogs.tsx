import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogsProps {
  activeDialog: string | null;
  onClose: () => void;
  candidateName: string;
}

export function ApplicationActionDialogs({ activeDialog, onClose, candidateName }: DialogsProps) {
  return (
    <>
      <Dialog open={activeDialog === "reject"} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Candidate</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject {candidateName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="destructive" onClick={onClose}>Reject Candidate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "shortlist"} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Shortlist Candidate</DialogTitle>
            <DialogDescription>
              Shortlist {candidateName} for the next stage? The hiring team will be notified.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Shortlist Candidate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={activeDialog === "schedule"} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              Schedule an interview with {candidateName}. (Integration with Scheduling Engine required).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Continue to Scheduler</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "move_stage"} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move Stage</DialogTitle>
            <DialogDescription>
              Select the next stage for {candidateName}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <select className="w-full h-10 px-3 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
              <option>Recruiter Screen</option>
              <option>Technical Interview</option>
              <option>Culture Fit</option>
              <option>Offer</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Update Stage</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={activeDialog === "assign"} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Recruiter</DialogTitle>
            <DialogDescription>
              Assign a recruiter to manage {candidateName}'s application.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={activeDialog === "request_info"} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Information</DialogTitle>
            <DialogDescription>
              Send an email to {candidateName} requesting additional information or documents.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
