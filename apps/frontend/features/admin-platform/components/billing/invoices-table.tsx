"use client";

import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Invoice } from "../../types";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { StatusChip } from "@/components/display/status-chip";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface InvoicesTableProps {
  invoices: Invoice[];
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  const columns: ColumnDef<Invoice>[] = React.useMemo(
    () => [
      {
        id: "number",
        header: "Invoice Number",
        accessorKey: "number",
        cell: (invoice: Invoice) => (
          <span className="font-medium text-[hsl(var(--foreground))]">{invoice.number}</span>
        ),
      },
      {
        id: "date",
        header: "Date",
        accessorKey: "createdDate",
        cell: (invoice: Invoice) => (
          <span className="text-sm text-[hsl(var(--muted-foreground))]">
            {new Date(invoice.createdDate).toLocaleDateString()}
          </span>
        ),
      },
      {
        id: "dueDate",
        header: "Due Date",
        accessorKey: "dueDate",
        cell: (invoice: Invoice) => (
          <span className="text-sm text-[hsl(var(--muted-foreground))]">
            {new Date(invoice.dueDate).toLocaleDateString()}
          </span>
        ),
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: "amountPaid",
        cell: (invoice: Invoice) => (
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">${invoice.amountPaid.toFixed(2)}</span>
        ),
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (invoice: Invoice) => {
          let variant: "success" | "warning" | "error" | "neutral" = "neutral";
          if (invoice.status === "PAID") variant = "success";
          if (invoice.status === "OPEN") variant = "warning";
          if (invoice.status === "VOID" || invoice.status === "UNCOLLECTIBLE") variant = "error";
          
          return <StatusChip variant={variant} label={invoice.status} showIcon />;
        },
      },
      {
        id: "actions",
        header: "",
        accessorKey: "id",
        cell: (invoice: Invoice) => (
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Download</span>
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <SettingsSection 
      title="Invoices & Billing History" 
      description="View and download past invoices."
    >
      <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden">
        <DataTable data={invoices} columns={columns} keyField="id" />
      </div>
    </SettingsSection>
  );
}
