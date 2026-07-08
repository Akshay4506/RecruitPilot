import * as React from "react";
import { RbacRole, PermissionTemplate } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Network } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockPermissionTemplates } from "../../mock/rbac.mock";

interface InheritancePanelProps {
  role: RbacRole;
  template: PermissionTemplate | null;
}

export function InheritancePanel({ role, template }: InheritancePanelProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Template Inheritance</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        
        <div className="flex items-start gap-4 p-4 rounded-lg bg-[hsl(var(--secondary)/0.3)] border border-[hsl(var(--border))]">
          <Network className="h-5 w-5 text-[hsl(var(--muted-foreground))] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">Base Template</h4>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Inheriting from a template ensures this role automatically receives new base permissions when the template is updated. Explicit overrides will always take precedence.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Select Base Template</label>
          <Select defaultValue={role.baseTemplateId || "none"}>
            <SelectTrigger>
              <SelectValue placeholder="No template selected" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No template (Standalone Role)</SelectItem>
              {mockPermissionTemplates.map(tpl => (
                <SelectItem key={tpl.id} value={tpl.id}>{tpl.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {template && (
          <div className="pt-4 border-t border-[hsl(var(--border))]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Template Status: </span>
              <span className="text-xs font-semibold text-[hsl(var(--success))]">Synced</span>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              This role is currently inheriting {template.permissions.length} permissions from <strong>{template.name}</strong>.
            </p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
