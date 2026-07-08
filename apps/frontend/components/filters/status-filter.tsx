"use client";

import * as React from "react";
import { MultiSelectFilter } from "./multi-select-filter";
import { Circle, CheckCircle2, Clock, XCircle, PlayCircle, PauseCircle } from "lucide-react";

// Standard status presets
const STATUS_PRESETS = [
  { value: "ACTIVE", label: "Active", icon: <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" /> },
  { value: "INACTIVE", label: "Inactive", icon: <Circle className="h-4 w-4" /> },
  { value: "PENDING", label: "Pending", icon: <Clock className="h-4 w-4 text-[hsl(var(--warning))]" /> },
  { value: "COMPLETED", label: "Completed", icon: <CheckCircle2 className="h-4 w-4 text-[hsl(var(--primary))]" /> },
  { value: "CANCELLED", label: "Cancelled", icon: <XCircle className="h-4 w-4 text-[hsl(var(--danger))]" /> },
  { value: "DRAFT", label: "Draft", icon: <PauseCircle className="h-4 w-4" /> },
  { value: "PUBLISHED", label: "Published", icon: <PlayCircle className="h-4 w-4 text-[hsl(var(--success))]" /> },
];

export interface StatusFilterProps {
  title?: string;
  statuses?: { value: string; label: string; icon?: React.ReactNode }[];
  selectedStatuses: Set<string>;
  onSelectionChange: (statuses: Set<string>) => void;
  className?: string;
}

function StatusFilter({
  title = "Status",
  statuses = STATUS_PRESETS,
  selectedStatuses,
  onSelectionChange,
  className,
}: StatusFilterProps) {
  return (
    <MultiSelectFilter
      title={title}
      options={statuses}
      selectedValues={selectedStatuses}
      onSelectionChange={onSelectionChange}
      className={className}
    />
  );
}

export { StatusFilter };
