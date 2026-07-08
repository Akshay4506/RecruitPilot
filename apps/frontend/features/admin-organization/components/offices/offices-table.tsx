"use client";

import * as React from "react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Office } from "../../types";
import { StatusChip } from "@/components/display/status-chip";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface OfficesTableProps {
  offices: Office[];
  onSelect?: (offices: Office[]) => void;
  onEdit?: (office: Office) => void;
}

export function OfficesTable({ offices, onSelect, onEdit }: OfficesTableProps) {
  const columns: ColumnDef<Office>[] = [
    {
      id: "name",
      header: "Office",
      accessor: "name",
      sortable: true,
      cell: (row) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[hsl(var(--foreground))]">{row.name}</span>
            {row.isHeadquarters && <Badge variant="default" className="text-[8px] h-4 px-1.5 py-0 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">HQ</Badge>}
          </div>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-[hsl(var(--muted-foreground))] truncate max-w-[250px]">
            <MapPin className="h-3 w-3" />
            <span>{row.address.city}, {row.address.country}</span>
          </div>
        </div>
      )
    },
    {
      id: "region",
      header: "Region",
      accessor: "region",
      sortable: true,
    },
    {
      id: "capacity",
      header: "Capacity",
      accessor: "capacity",
      sortable: true,
      cell: (row) => (
        <Badge variant="outline" className="font-mono">{row.capacity}</Badge>
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
    label: "Edit Office",
    onClick: onEdit
  }] : undefined;

  return (
    <div className="border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))] overflow-hidden">
      <DataTable 
        data={offices} 
        columns={columns} 
        keyField="id" 
        rowActions={rowActions}
        onSelectionChange={onSelect}
        selectable={!!onSelect}
      />
    </div>
  );
}
