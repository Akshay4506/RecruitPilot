"use client";

import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { EmailTemplate } from "../../types";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { StatusChip } from "@/components/display/status-chip";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EmailTemplateListProps {
  templates: EmailTemplate[];
  onEdit: (template: EmailTemplate) => void;
  onPreview: (template: EmailTemplate) => void;
}

export function EmailTemplateList({ templates, onEdit, onPreview }: EmailTemplateListProps) {
  const columns: ColumnDef<EmailTemplate>[] = React.useMemo(
    () => [
      {
        id: "name",
        header: "Template Name",
        accessorKey: "name",
        cell: (tpl: EmailTemplate) => (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sm text-[hsl(var(--foreground))]">{tpl.name}</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))] truncate max-w-[200px]">{tpl.subject}</span>
          </div>
        ),
      },
      {
        id: "variables",
        header: "Variables",
        accessorKey: "variables",
        cell: (tpl: EmailTemplate) => (
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {tpl.variables.slice(0, 2).map((v: string) => (
              <Badge key={v} variant="outline" className="text-[10px] bg-[hsl(var(--muted)/0.5)]">{v}</Badge>
            ))}
            {tpl.variables.length > 2 && (
              <Badge variant="outline" className="text-[10px] bg-[hsl(var(--muted)/0.5)]">+{tpl.variables.length - 2}</Badge>
            )}
          </div>
        ),
      },
      {
        id: "version",
        header: "Version",
        accessorKey: "version",
        cell: (tpl: EmailTemplate) => (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-mono text-[hsl(var(--foreground))]">{tpl.version}</span>
            <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
              {new Date(tpl.lastModified).toLocaleDateString()}
            </span>
          </div>
        ),
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (tpl: EmailTemplate) => (
          <StatusChip 
            variant={tpl.status === "PUBLISHED" ? "success" : "neutral"} 
            label={tpl.status} 
          />
        ),
      },
      {
        id: "actions",
        header: "",
        accessorKey: "id",
        cell: (tpl: EmailTemplate) => (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon" onClick={() => onPreview(tpl)} title="Send Test Email">
              <Send className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(tpl)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onPreview]
  );

  return (
    <SettingsSection 
      title="Email Templates" 
      description="Manage transactional and marketing email templates sent to candidates and users."
      footer={
        <div className="flex justify-end w-full">
          <Button className="gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
            <Plus className="h-4 w-4" />
            New Template
          </Button>
        </div>
      }
    >
      <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden">
        <DataTable data={templates} columns={columns} keyField="id" />
      </div>
    </SettingsSection>
  );
}
