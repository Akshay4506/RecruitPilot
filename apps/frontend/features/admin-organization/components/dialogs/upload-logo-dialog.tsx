import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";

interface UploadLogoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadLogoDialog({ isOpen, onClose }: UploadLogoDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Company Logo</DialogTitle>
          <DialogDescription>
            Select a high-resolution image for your organization.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <FileUpload 
            accept="image/png,image/jpeg,image/svg+xml" 
            maxSize={2 * 1024 * 1024} 
            onFilesSelected={(files: File[]) => void 0}
            description="Upload PNG, JPG, or SVG (max 2MB)"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose} disabled>Apply Logo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
