"use client";

import * as React from "react";
import { AdminDashboardHero } from "./components/overview/admin-dashboard-hero";
import { AdminMetrics } from "./components/overview/admin-metrics";
import { PlatformSummary } from "./components/overview/platform-summary";
import { OrganizationGrowth } from "./components/analytics/organization-growth";
import { UserDistribution } from "./components/analytics/user-distribution";
import { WorkspaceActivity } from "./components/analytics/workspace-activity";
import { PendingApprovals } from "./components/approvals/pending-approvals";
import { RecentActivity } from "./components/activity/recent-activity";
import { AIPlatformInsights } from "./components/system/ai-platform-insights";
import { AdminSidebar } from "./components/sidebar/admin-sidebar";

import { 
  mockAdminMetrics,
  mockGrowthData,
  mockUserDistribution,
  mockActivityTimeline,
  mockPendingApprovals,
  mockInsights
} from "./mock/dashboard.mock";

export function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-24">
      <AdminDashboardHero />
      <AdminMetrics metrics={mockAdminMetrics} />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OrganizationGrowth data={mockGrowthData} />
            <UserDistribution data={mockUserDistribution} />
            <WorkspaceActivity data={mockGrowthData} />
            <PlatformSummary metrics={mockAdminMetrics} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PendingApprovals approvals={mockPendingApprovals} />
            <RecentActivity activities={mockActivityTimeline} />
          </div>

          <div>
            <AIPlatformInsights insights={mockInsights} />
          </div>
        </div>

        <div className="xl:col-span-1 hidden xl:block">
          <AdminSidebar />
        </div>
      </div>
    </div>
  );
}
