import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EmailTemplate } from "../../types";

interface DeleteTemplateDialogProps {
  template: EmailTemplate | null;
  onClose: () => void;
}

export function DeleteTemplateDialog({ template, onClose }: DeleteTemplateDialogProps) {
  if (!template) return null;

  return (
    <Dialog open={!!template} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Template</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the template <strong>{template.name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onClose}>Delete Template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
