"use client";

import * as React from "react";

import { RbacHero } from "./components/overview/rbac-hero";
import { RbacMetrics } from "./components/overview/rbac-metrics";
import { SecurityOverview } from "./components/overview/security-overview";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/loaders/skeleton";

const RoleDistribution = dynamic(() => import("./components/analytics/role-distribution").then(mod => mod.RoleDistribution), { ssr: false, loading: () => <Skeleton className="w-full h-[300px] rounded-xl" /> });
import { RoleSearch } from "./components/search/role-search";
import { RoleFilters } from "./components/search/role-filters";
import { RolesTable } from "./components/directory/roles-table";
import { RoleCard } from "./components/directory/role-card";
import { RolePreviewDrawer } from "./components/directory/role-preview-drawer";
import { BulkToolbar } from "./components/directory/bulk-toolbar";
import { mockRoles } from "./mock/rbac.mock";
import { RbacRole } from "./types";
import { useRouter } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";

export function AdminRbac() {
  const router = useRouter();
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [selectedRoles, setSelectedRoles] = React.useState<RbacRole[]>([]);
  const [previewRole, setPreviewRole] = React.useState<RbacRole | null>(null);

  const handleViewRole = (role: RbacRole) => {
    router.push(`/admin/roles/${role.id}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6 pb-20">
      <div className="space-y-6">
        <RbacHero />
        
        <RbacMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RoleDistribution />
          </div>
          <div>
            <SecurityOverview />
          </div>
        </div>

        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[600px]">
          <div className="p-4 border-b border-[hsl(var(--border))] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <RoleSearch />
            <div className="flex items-center gap-4 w-full md:w-auto">
              <RoleFilters />
              <div className="flex items-center border border-[hsl(var(--border))] rounded-md p-1 bg-[hsl(var(--muted))]">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-[hsl(var(--background))] shadow-sm text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"}`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-[hsl(var(--background))] shadow-sm text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 bg-[hsl(var(--background))]">
            {viewMode === "list" ? (
              <RolesTable 
                roles={mockRoles} 
                onViewRole={(role) => setPreviewRole(role)} 
                onSelect={(roles) => setSelectedRoles(roles)} 
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockRoles.map(role => (
                  <RoleCard 
                    key={role.id} 
                    role={role} 
                    onClick={() => setPreviewRole(role)}
                    selected={selectedRoles.some(r => r.id === role.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <RolePreviewDrawer 
        role={previewRole} 
        isOpen={!!previewRole} 
        onClose={() => setPreviewRole(null)} 
        onViewDetails={(role) => handleViewRole(role)}
      />

      <BulkToolbar 
        selectedCount={selectedRoles.length} 
        onClear={() => setSelectedRoles([])} 
      />
    </div>
  );
}
