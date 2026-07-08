"use client";

import * as React from "react";

import { RbacRole } from "./types";
import { RoleHero } from "./components/editor/role-hero";
import { BasicInformation } from "./components/editor/basic-information";
import { PermissionSummary } from "./components/editor/permission-summary";
import { PermissionMatrix } from "./components/editor/permission-matrix";
import { WorkspaceAccess } from "./components/editor/workspace-access";
import { InheritancePanel } from "./components/editor/inheritance-panel";
import { AssignedUsers } from "./components/editor/assigned-users";
import { AccessPolicies } from "./components/policies/access-policies";
import { PolicyConflicts } from "./components/policies/policy-conflicts";
import { PermissionAudit } from "./components/audit/permission-audit";
import { ChangeHistory } from "./components/audit/change-history";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockPermissionTemplates } from "./mock/rbac.mock";

interface AdminRoleWorkspaceProps {
  role: RbacRole;
}

export function AdminRoleWorkspace({ role }: AdminRoleWorkspaceProps) {
  const [activeTab, setActiveTab] = React.useState("permissions");
  
  const template = role.baseTemplateId 
    ? mockPermissionTemplates.find(t => t.id === role.baseTemplateId) || null 
    : null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6 pb-20">
      <div className="space-y-6">
        <RoleHero role={role} isDirty={false} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-transparent border-b border-[hsl(var(--border))] rounded-none h-auto p-0 justify-start w-full">
            <TabsTrigger 
              value="permissions" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--primary))] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4"
            >
              Permissions Matrix
            </TabsTrigger>
            <TabsTrigger 
              value="access" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--primary))] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4"
            >
              Access Policies
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--primary))] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4"
            >
              Assigned Users
            </TabsTrigger>
            <TabsTrigger 
              value="audit" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--primary))] data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4"
            >
              Audit & History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="permissions" className="mt-0 space-y-6 outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <PermissionSummary role={role} template={template} />
                <PolicyConflicts />
                <PermissionMatrix role={role} template={template} />
              </div>
              <div className="space-y-6">
                <BasicInformation role={role} />
                <InheritancePanel role={role} template={template} />
                <WorkspaceAccess role={role} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="access" className="mt-0 outline-none">
            <div className="max-w-4xl mx-auto space-y-6">
              <AccessPolicies role={role} />
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-0 outline-none">
            <div className="max-w-4xl mx-auto space-y-6">
              <AssignedUsers role={role} />
            </div>
          </TabsContent>

          <TabsContent value="audit" className="mt-0 outline-none">
            <div className="max-w-4xl mx-auto space-y-6">
              <PermissionAudit role={role} />
              <ChangeHistory />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
