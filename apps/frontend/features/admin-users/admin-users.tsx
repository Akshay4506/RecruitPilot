"use client";

import * as React from "react";
import { AdminUsersHero } from "./components/overview/admin-users-hero";
import { UserMetrics } from "./components/overview/user-metrics";
import { UserStatistics } from "./components/overview/user-statistics";
import { UserSearch } from "./components/search/user-search";
import { UserFilters } from "./components/search/user-filters";
import { UserTable } from "./components/directory/user-table";
import { UserPreviewDrawer } from "./components/directory/user-preview-drawer";
import { BulkToolbar } from "./components/directory/bulk-toolbar";
import { InviteUserDialog } from "./components/dialogs/invite-user-dialog";
import { mockUsers, mockUserMetrics, mockUserStatistics } from "./mock/users.mock";
import { User } from "./types";
import { useRouter } from "next/navigation";

export function AdminUsers() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [isInviteOpen, setIsInviteOpen] = React.useState(false);
  
  // Future state for table selection
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsPreviewOpen(true);
  };

  const handleViewDetails = (user: User) => {
    setIsPreviewOpen(false);
    router.push(`/admin/users/${user.id}`);
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      <AdminUsersHero />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <UserMetrics metrics={mockUserMetrics} />
        </div>
        <div className="xl:col-span-1">
          <UserStatistics stats={mockUserStatistics} />
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-4 border-t border-[hsl(var(--border))]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <UserSearch />
          <UserFilters />
        </div>
        
        <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <UserTable 
            users={mockUsers} 
            onRowClick={handleRowClick}
            onSelect={setSelectedUserIds}
          />
        </div>
      </div>

      <UserPreviewDrawer 
        user={selectedUser} 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)}
        onViewDetails={handleViewDetails}
      />
      
      <InviteUserDialog 
        isOpen={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)} 
      />

      <BulkToolbar 
        selectedCount={selectedUserIds.length} 
        onClear={() => setSelectedUserIds([])} 
      />
    </div>
  );
}
