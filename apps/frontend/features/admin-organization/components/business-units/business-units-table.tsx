"use client";

import * as React from "react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { BusinessUnit } from "../../types";
import { StatusChip } from "@/components/display/status-chip";
import { Badge } from "@/components/ui/badge";

interface BusinessUnitsTableProps {
  businessUnits: BusinessUnit[];
  onSelect?: (businessUnits: BusinessUnit[]) => void;
  onEdit?: (businessUnit: BusinessUnit) => void;
}

export function BusinessUnitsTable({ businessUnits, onSelect, onEdit }: BusinessUnitsTableProps) {
  const columns: ColumnDef<BusinessUnit>[] = [
    {
      id: "name",
      header: "Business Unit",
      accessor: "name",
      sortable: true,
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-[hsl(var(--foreground))]">{row.name}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))] truncate max-w-[200px]">{row.description}</span>
        </div>
      )
    },
    {
      id: "departments",
      header: "Departments",
      accessor: "departments",
      cell: (row) => (
        <Badge variant="neutral" className="font-mono">{row.departments.length}</Badge>
      )
    },
    {
      id: "status",
      header: "Status",
      accessor: "status",
      sortable: true,
      cell: (row) => {
        const v = row.status === "ACTIVE" ? "active" : row.status === "INACTIVE" ? "inactive" : "neutral";
        return <StatusChip variant={v} label={row.status} />;
      }
    }
  ];

  const rowActions = onEdit ? [{
    label: "Edit Business Unit",
    onClick: onEdit
  }] : undefined;

  return (
    <div className="border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))] overflow-hidden">
      <DataTable 
        data={businessUnits} 
        columns={columns} 
        keyField="id" 
        rowActions={rowActions}
        onSelectionChange={onSelect}
        selectable={!!onSelect}
      />
    </div>
  );
}
