"use client";

import * as React from "react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { RbacRole } from "../../types";
import { StatusChip } from "@/components/display/status-chip";
import { formatDate } from "@/lib/utils";
import { RISK_LEVEL_LABELS } from "../../../admin-shared/constants/risk-levels";
import { Badge } from "@/components/ui/badge";

interface RolesTableProps {
  roles: RbacRole[];
  onSelect?: (roles: RbacRole[]) => void;
  onViewRole?: (role: RbacRole) => void;
}

export function RolesTable({ roles, onViewRole, onSelect }: RolesTableProps) {
  const columns: ColumnDef<RbacRole>[] = [
    {
      id: "name",
      header: "Role Name",
      accessor: "name",
      cell: (row: RbacRole) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm text-[hsl(var(--foreground))]">{row.name}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))] truncate max-w-[200px]">{row.description}</span>
        </div>
      )
    },
    {
      id: "type",
      header: "Type",
      accessor: "type",
      cell: (row: RbacRole) => (
        <Badge variant="outline" className="text-xs font-medium">
          {row.type}
        </Badge>
      )
    },
    {
      id: "riskLevel",
      header: "Risk",
      accessor: "riskLevel",
      cell: (row: RbacRole) => {
        let color = "text-[hsl(var(--foreground))]";
        if (row.riskLevel === "CRITICAL") color = "text-[hsl(var(--destructive))]";
        if (row.riskLevel === "HIGH") color = "text-[hsl(var(--warning))]";
        
        return <span className={`text-xs font-medium ${color}`}>{RISK_LEVEL_LABELS[row.riskLevel]}</span>;
      }
    },
    {
      id: "assignedUsersCount",
      header: "Users",
      accessor: "assignedUsersCount",
      cell: (row: RbacRole) => (
        <span className="text-sm text-[hsl(var(--foreground))]">{row.assignedUsersCount}</span>
      )
    },
    {
      id: "permissions",
      header: "Permissions",
      accessor: "permissions",
      cell: (row: RbacRole) => (
        <span className="text-sm text-[hsl(var(--muted-foreground))]">{row.permissions.length}</span>
      )
    },
    {
      id: "updatedAt",
      header: "Last Modified",
      accessor: "updatedAt",
      cell: (row: RbacRole) => (
        <span className="text-xs text-[hsl(var(--muted-foreground))]">{formatDate(row.updatedAt)}</span>
      )
    },
    {
      id: "status",
      header: "Status",
      accessor: "status",
      cell: (row: RbacRole) => (
        <StatusChip 
          label={row.status} 
          variant={row.status === "ACTIVE" ? "success" : "neutral"} 
        />
      )
    }
  ];

  const rowActions = onViewRole ? [{
    label: "View Role",
    onClick: onViewRole
  }] : undefined;

  return (
    <DataTable 
      data={roles} 
      columns={columns} 
      keyField="id" 
      rowActions={rowActions}
      onSelectionChange={onSelect}
      selectable={!!onSelect}
    />
  );
}
