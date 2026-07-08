"use client";

import * as React from "react";
import { Tag } from "lucide-react";
import { MultiSelectFilter } from "./multi-select-filter";

export interface TagFilterProps {
  title?: string;
  tags: string[];
  selectedTags: Set<string>;
  onSelectionChange: (tags: Set<string>) => void;
  className?: string;
}

function TagFilter({
  title = "Tags",
  tags,
  selectedTags,
  onSelectionChange,
  className,
}: TagFilterProps) {
  const options = tags.map((t) => ({
    value: t,
    label: t,
    icon: <Tag className="h-3.5 w-3.5" />,
  }));

  return (
    <MultiSelectFilter
      title={title}
      options={options}
      selectedValues={selectedTags}
      onSelectionChange={onSelectionChange}
      className={className}
    />
  );
}

export { TagFilter };
