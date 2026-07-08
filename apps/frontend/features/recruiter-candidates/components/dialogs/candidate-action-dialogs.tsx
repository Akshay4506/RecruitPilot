import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogsProps {
  activeDialog: string | null;
  onClose: () => void;
  candidateName: string;
}

export function CandidateActionDialogs({ activeDialog, onClose, candidateName }: DialogsProps) {
  return (
    <>
      <Dialog open={activeDialog === "archive"} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Candidate</DialogTitle>
            <DialogDescription>
              Are you sure you want to archive {candidateName}? They will be removed from active pipelines but their data will be preserved.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="destructive" onClick={onClose}>Archive</Button>
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
            <Button variant="primary" onClick={onClose}>Continue to Scheduler</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "request_docs"} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Documents</DialogTitle>
            <DialogDescription>
              Send an email to {candidateName} requesting additional information or documents.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={onClose}>Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={activeDialog === "assign"} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Recruiter</DialogTitle>
            <DialogDescription>
              Assign a recruiter to manage {candidateName}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={onClose}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "share"} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Candidate Profile</DialogTitle>
            <DialogDescription>
              Generate a shareable link for {candidateName} to send to hiring managers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={onClose}>Copy Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={activeDialog === "merge"} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Merge Candidate</DialogTitle>
            <DialogDescription>
              Merge {candidateName} with another duplicate profile. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="destructive" onClick={onClose}>Merge Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
