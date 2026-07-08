import * as React from "react";
import { RbacRole } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDepartments } from "../../../admin-shared/mock";
import { RISK_LEVEL_LABELS } from "../../../admin-shared/constants/risk-levels";

interface BasicInformationProps {
  role: RbacRole;
}

export function BasicInformation({ role }: BasicInformationProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Role Name</label>
            <Input defaultValue={role.name} readOnly={role.type === "SYSTEM"} className={role.type === "SYSTEM" ? "bg-[hsl(var(--muted))]" : ""} />
            {role.type === "SYSTEM" && (
              <p className="text-xs text-[hsl(var(--muted-foreground))]">System roles cannot be renamed.</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Status</label>
            <Select defaultValue={role.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="DISABLED">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Description</label>
          <textarea 
            className="flex min-h-[80px] w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))] disabled:cursor-not-allowed disabled:opacity-50 resize-y"
            defaultValue={role.description}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Department Assignment (Optional)</label>
            <Select defaultValue={role.departmentId || "unassigned"}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">None</SelectItem>
                {mockDepartments.map((dept: any) => (
                  <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Risk Level</label>
            <Select defaultValue={role.riskLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(RISK_LEVEL_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
