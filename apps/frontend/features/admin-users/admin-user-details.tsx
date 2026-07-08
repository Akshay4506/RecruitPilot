"use client";

import * as React from "react";
import { UserHero } from "./components/details/user-hero";
import { AccountInformation } from "./components/details/account-information";
import { SecuritySummary } from "./components/details/security-summary";
import { ActivityTimeline } from "./components/details/activity-timeline";
import { AssignedWorkspaces } from "./components/details/assigned-workspaces";
import { ActiveSessions } from "./components/details/active-sessions";
import { QuickActions } from "./components/details/quick-actions";
import { DisableUserDialog } from "./components/dialogs/disable-user-dialog";
import { ResetPasswordDialog } from "./components/dialogs/reset-password-dialog";
import { mockUsers } from "./mock/users.mock";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { notFound } from "next/navigation";

interface AdminUserDetailsProps {
  userId: string;
}

export function AdminUserDetails({ userId }: AdminUserDetailsProps) {
  // Replace with data fetching later
  const user = mockUsers.find(u => u.id === userId);
  
  const [isDisableOpen, setIsDisableOpen] = React.useState(false);
  const [isResetPassOpen, setIsResetPassOpen] = React.useState(false);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <UserHero user={user} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b border-[hsl(var(--border))] rounded-none bg-transparent p-0 mb-6 h-auto">
              <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] rounded-none px-4 py-2 text-sm">Overview</TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] rounded-none px-4 py-2 text-sm">Security</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] rounded-none px-4 py-2 text-sm">Activity</TabsTrigger>
              <TabsTrigger value="assignments" className="data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] rounded-none px-4 py-2 text-sm">Assignments</TabsTrigger>
              <TabsTrigger value="sessions" className="data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--primary))] rounded-none px-4 py-2 text-sm">Sessions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0 space-y-6">
              <AccountInformation user={user} />
            </TabsContent>
            
            <TabsContent value="security" className="mt-0 space-y-6">
              <SecuritySummary user={user} />
            </TabsContent>

            <TabsContent value="activity" className="mt-0">
              <ActivityTimeline user={user} />
            </TabsContent>

            <TabsContent value="assignments" className="mt-0 space-y-6">
              <AssignedWorkspaces user={user} />
            </TabsContent>

            <TabsContent value="sessions" className="mt-0">
              <ActiveSessions user={user} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <QuickActions user={user} />
        </div>
      </div>
      
      <DisableUserDialog user={user} isOpen={isDisableOpen} onClose={() => setIsDisableOpen(false)} />
      <ResetPasswordDialog user={user} isOpen={isResetPassOpen} onClose={() => setIsResetPassOpen(false)} />
    </div>
  );
}
