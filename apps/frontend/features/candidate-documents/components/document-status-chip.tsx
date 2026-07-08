import * as React from "react";
import { StatusChip } from "@/components/display/status-chip";
import { DocumentStatus } from "../types";

export function DocumentStatusChip({ status }: { status: DocumentStatus }) {
  const map: Record<DocumentStatus, React.ComponentProps<typeof StatusChip>["variant"]> = {
    UPLOADED: "neutral",
    PROCESSING: "pending",
    OCR_COMPLETE: "info",
    VIRUS_CLEAN: "success",
    AI_PARSED: "success",
    DELETED: "rejected",
    ERROR: "error",
  };
  
  const label: Record<DocumentStatus, string> = {
    UPLOADED: "Uploaded",
    PROCESSING: "Processing",
    OCR_COMPLETE: "OCR Complete",
    VIRUS_CLEAN: "Virus Clean",
    AI_PARSED: "AI Parsed",
    DELETED: "Deleted",
    ERROR: "Error",
  };
  
  return <StatusChip variant={map[status]}>{label[status]}</StatusChip>;
}
