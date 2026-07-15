import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";

interface ImportPolicyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportPolicyDialog({ isOpen, onClose }: ImportPolicyDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import Access Policy</DialogTitle>
          <DialogDescription>
            Upload a JSON policy definition file to bulk update roles and permissions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <FileUpload 
            accept=".json,application/json" 
            maxSize={2 * 1024 * 1024} 
            onFilesSelected={(files: File[]) => void 0}
            description="Upload JSON definition (max 2MB)"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} disabled>Import Policy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
