import * as React from "react";
import { JobStatus } from "../../types";
import { Badge } from "@/components/ui/badge";

interface JobStatusChipProps {
  status: JobStatus;
  className?: string;
}

export function JobStatusChip({ status, className }: JobStatusChipProps) {
  let variant: "default" | "neutral" | "success" | "warning" | "destructive" | "outline" = "outline";
  const label = status.replace("_", " ");

  switch (status) {
    case "PUBLISHED":
      variant = "success";
      break;
    case "DRAFT":
      variant = "neutral";
      break;
    case "PAUSED":
      variant = "warning";
      break;
    case "CLOSED":
      variant = "outline";
      break;
    case "ARCHIVED":
      variant = "destructive";
      break;
  }

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
