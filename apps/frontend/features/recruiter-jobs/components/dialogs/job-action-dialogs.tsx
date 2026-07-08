import * as React from "react";
import { Job } from "../../types";
import { ConfirmDialog } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/primitives";

interface ActionDialogProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function PublishJobDialog({ job, isOpen, onClose, onConfirm }: ActionDialogProps) {
  if (!job) return null;
  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Publish Job"
      description={`Are you sure you want to publish "${job.title}"? It will become visible according to its visibility settings.`}
      confirmLabel="Publish"
      cancelLabel="Cancel"
      onConfirm={onConfirm}
    />
  );
}

export function PauseJobDialog({ job, isOpen, onClose, onConfirm }: ActionDialogProps) {
  if (!job) return null;
  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Pause Job"
      description={`Are you sure you want to pause "${job.title}"? Candidates will no longer be able to apply, but existing applications remain.`}
      confirmLabel="Pause"
      cancelLabel="Cancel"
      onConfirm={onConfirm}
    />
  );
}

export function CloseJobDialog({ job, isOpen, onClose, onConfirm }: ActionDialogProps) {
  if (!job) return null;
  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Close Job"
      description={`Are you sure you want to close "${job.title}"? This indicates hiring is complete.`}
      confirmLabel="Close Job"
      cancelLabel="Cancel"
      onConfirm={onConfirm}
    />
  );
}

export function ReopenJobDialog({ job, isOpen, onClose, onConfirm }: ActionDialogProps) {
  if (!job) return null;
  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Reopen Job"
      description={`Are you sure you want to reopen "${job.title}"?`}
      confirmLabel="Reopen"
      cancelLabel="Cancel"
      onConfirm={onConfirm}
    />
  );
}

export function ArchiveJobDialog({ job, isOpen, onClose, onConfirm }: ActionDialogProps) {
  if (!job) return null;
  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Archive Job"
      description={`Are you sure you want to archive "${job.title}"? This will hide it from your active lists.`}
      confirmLabel="Archive"
      cancelLabel="Cancel"
      onConfirm={onConfirm}
      variant="destructive"
    />
  );
}

export function DeleteJobDialog({ job, isOpen, onClose, onConfirm }: ActionDialogProps) {
  if (!job) return null;
  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Delete Job"
      description={`Are you sure you want to completely delete "${job.title}"? This action cannot be undone and will delete all associated data.`}
      confirmLabel="Delete"
      cancelLabel="Cancel"
      onConfirm={onConfirm}
      variant="destructive"
    />
  );
}

export function DuplicateJobDialog({ job, isOpen, onClose, onConfirm }: ActionDialogProps) {
  const [title, setTitle] = React.useState(job?.title ? `${job.title} (Copy)` : "");
  
  React.useEffect(() => {
    if (job) {
      setTimeout(() => setTitle(`${job.title} (Copy)`), 0);
    }
  }, [job]);

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Duplicate Job</DialogTitle>
          <DialogDescription>
            Create a draft copy of &quot;{job.title}&quot;.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>New Job Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Duplicate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ShareJobDialog({ job, isOpen, onClose, onConfirm }: ActionDialogProps) {
  const [email, setEmail] = React.useState("");

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Job</DialogTitle>
          <DialogDescription>
            Share &quot;{job.title}&quot; with a team member or externally.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input type="email" placeholder="colleague@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Share</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
