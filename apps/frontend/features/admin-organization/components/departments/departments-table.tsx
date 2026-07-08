"use client";

import * as React from "react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Department } from "../../types";
import { StatusChip } from "@/components/display/status-chip";
import { Badge } from "@/components/ui/badge";

interface DepartmentsTableProps {
  departments: Department[];
  onSelect?: (departments: Department[]) => void;
  onEdit?: (department: Department) => void;
}

export function DepartmentsTable({ departments, onSelect, onEdit }: DepartmentsTableProps) {
  const columns: ColumnDef<Department>[] = [
    {
      id: "name",
      header: "Department",
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
      id: "users",
      header: "Users",
      accessor: "userCount",
      sortable: true,
      cell: (row) => (
        <Badge variant="neutral" className="font-mono">{row.userCount}</Badge>
      )
    },
    {
      id: "jobs",
      header: "Open Jobs",
      accessor: "openJobsCount",
      sortable: true,
      cell: (row) => (
        <Badge variant="outline" className="font-mono">{row.openJobsCount}</Badge>
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
    label: "Edit Department",
    onClick: onEdit
  }] : undefined;

  return (
    <div className="border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))] overflow-hidden">
      <DataTable 
        data={departments} 
        columns={columns} 
        keyField="id" 
        rowActions={rowActions}
        onSelectionChange={onSelect}
        selectable={!!onSelect}
      />
    </div>
  );
}
