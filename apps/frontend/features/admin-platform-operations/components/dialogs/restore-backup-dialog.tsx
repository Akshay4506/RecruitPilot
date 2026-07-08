import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Backup } from "../../types";
import { AlertTriangle } from "lucide-react";

interface RestoreBackupDialogProps {
  backup: Backup | null;
  onClose: () => void;
}

export function RestoreBackupDialog({ backup, onClose }: RestoreBackupDialogProps) {
  if (!backup) return null;

  return (
    <Dialog open={!!backup} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Restore System Backup</DialogTitle>
          <DialogDescription>
            You are about to initiate a system restore from backup <span className="font-mono text-xs">{backup.id}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-[hsl(var(--destructive)/0.1)] border border-[hsl(var(--destructive)/0.2)] p-4 rounded-lg flex gap-3 my-4">
          <AlertTriangle className="h-5 w-5 text-[hsl(var(--destructive))] shrink-0" />
          <div className="flex flex-col gap-1 text-sm text-[hsl(var(--destructive))]">
            <span className="font-semibold">Warning: Destructive Action</span>
            <span>Restoring this backup will overwrite all current system data with the state captured on {new Date(backup.createdAt).toLocaleString()}. Active sessions will be terminated.</span>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onClose}>Proceed with Restore</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
