"use client";

import * as React from "react";
import { MultiSelectFilter } from "@/components/filters/multi-select-filter";

export function RoleFilters() {
  const [selectedTypes, setSelectedTypes] = React.useState<Set<string>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<string>>(new Set());
  const [selectedRiskLevels, setSelectedRiskLevels] = React.useState<Set<string>>(new Set());

  return (
    <div className="flex flex-wrap items-center gap-2">
      <MultiSelectFilter
        title="Type"
        options={[
          { label: "System", value: "SYSTEM" },
          { label: "Custom", value: "CUSTOM" },
        ]}
        selectedValues={selectedTypes}
        onSelectionChange={setSelectedTypes}
      />
      
      <MultiSelectFilter
        title="Status"
        options={[
          { label: "Active", value: "ACTIVE" },
          { label: "Disabled", value: "DISABLED" },
        ]}
        selectedValues={selectedStatuses}
        onSelectionChange={setSelectedStatuses}
      />

      <MultiSelectFilter
        title="Risk Level"
        options={[
          { label: "Low", value: "LOW" },
          { label: "Medium", value: "MEDIUM" },
          { label: "High", value: "HIGH" },
          { label: "Critical", value: "CRITICAL" },
        ]}
        selectedValues={selectedRiskLevels}
        onSelectionChange={setSelectedRiskLevels}
      />
    </div>
  );
}
