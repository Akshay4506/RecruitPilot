import * as React from "react";
import { Interview } from "../../types";
import { ConfirmDialog } from "@/components/ui/dialog";

interface ConfirmationDialogProps {
  interview: Interview | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mode: "confirm" | "decline";
}

export function ConfirmationDialog({ interview, isOpen, onClose, onConfirm, mode }: ConfirmationDialogProps) {
  
  if (!interview) return null;

  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onClose}
      title={mode === "confirm" ? "Confirm Attendance" : "Decline Interview"}
      description={
        mode === "confirm"
          ? `Are you sure you want to confirm your attendance for the ${interview.jobTitle} interview at ${interview.companyName}?`
          : `Are you sure you want to decline the ${interview.jobTitle} interview at ${interview.companyName}? This action cannot be undone.`
      }
      confirmLabel={mode === "confirm" ? "Confirm" : "Decline"}
      cancelLabel="Cancel"
      onConfirm={onConfirm}
      variant={mode === "decline" ? "destructive" : "default"}
    />
  );
}
