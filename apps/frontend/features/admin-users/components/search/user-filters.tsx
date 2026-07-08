"use client";

import * as React from "react";
import { MultiSelectFilter } from "@/components/filters/multi-select-filter";

export function UserFilters() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <MultiSelectFilter
        title="Role"
        options={[
          { label: "Admin", value: "ADMIN" },
          { label: "Recruiter", value: "RECRUITER" },
          { label: "Hiring Manager", value: "HIRING_MANAGER" },
          { label: "Candidate", value: "CANDIDATE" }
        ]}
        selectedValues={new Set()}
        onSelectionChange={() => {}}
      />
      <MultiSelectFilter
        title="Status"
        options={[
          { label: "Active", value: "ACTIVE" },
          { label: "Inactive", value: "INACTIVE" },
          { label: "Disabled", value: "DISABLED" },
          { label: "Locked", value: "LOCKED" }
        ]}
        selectedValues={new Set()}
        onSelectionChange={() => {}}
      />
      <MultiSelectFilter
        title="Department"
        options={[
          { label: "Human Resources", value: "hr" },
          { label: "Engineering", value: "eng" },
          { label: "Product", value: "prod" }
        ]}
        selectedValues={new Set()}
        onSelectionChange={() => {}}
      />
    </div>
  );
}
