"use client";

import * as React from "react";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { User } from "../../types";
import { Avatar } from "@/components/ui/avatar";
import { StatusChip } from "@/components/display/status-chip";
import { formatDate } from "@/lib/utils";
import { ROLE_LABELS } from "@/features/admin-shared/constants";

interface UserTableProps {
  users: User[];
  onSelect?: (userIds: string[]) => void;
  onRowClick?: (user: User) => void;
}

export function UserTable({ users, onSelect, onRowClick }: UserTableProps) {
  const columns: ColumnDef<User>[] = [
    {
      id: "name",
      header: "User",
      cell: (row: User) => {
        const user = row;
        return (
          <div className="flex items-center gap-3">
            <Avatar 
              src={user.profile.avatarSrc} 
              name={`${user.profile.firstName} ${user.profile.lastName}`}
              className="h-8 w-8"
            />
            <div className="flex flex-col">
              <span className="font-medium text-[hsl(var(--foreground))]">{user.profile.firstName} {user.profile.lastName}</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{user.email}</span>
            </div>
          </div>
        );
      }
    },
    {
      id: "role",
      header: "Role",
      accessor: "role",
      cell: (row: User) => {
        return <span className="capitalize text-xs font-medium">{ROLE_LABELS[row.role]}</span>;
      }
    },
    {
      id: "department",
      header: "Department",
      accessor: "department",
      cell: (row: User) => {
        const dept = row.department?.name || "-";
        return <span className="text-sm text-[hsl(var(--muted-foreground))]">{dept}</span>;
      }
    },
    {
      id: "status",
      header: "Status",
      accessor: "status",
      cell: (row: User) => {
        const status = row.status;
        let variant: "success" | "neutral" | "warning" | "error" = "neutral";
        if (status === "ACTIVE") variant = "success";
        if (status === "INACTIVE") variant = "warning";
        if (status === "DISABLED" || status === "LOCKED") variant = "error";
        
        return <StatusChip label={status} variant={variant} />;
      }
    },
    {
      id: "lastLoginAt",
      header: "Last Login",
      cell: (row: User) => {
        const date = row.security.lastLoginAt;
        return <span className="text-xs text-[hsl(var(--muted-foreground))]">{formatDate(date)}</span>;
      }
    },
    {
      id: "createdAt",
      header: "Created",
      accessor: "createdAt",
      cell: (row: User) => {
        const date = row.createdAt;
        return <span className="text-xs text-[hsl(var(--muted-foreground))]">{formatDate(date)}</span>;
      }
    }
  ];

  const rowActions = onRowClick ? [{
    label: "View User",
    onClick: onRowClick
  }] : undefined;

  return (
    <DataTable
      columns={columns}
      data={users}
      keyField="id"
      rowActions={rowActions}
    />
  );
}
