"use client";

import * as React from "react";
import { AdminDashboardHero } from "./components/overview/admin-dashboard-hero";
import { AdminMetrics } from "./components/overview/admin-metrics";
import { PlatformSummary } from "./components/overview/platform-summary";
import { RecentActivity } from "./components/activity/recent-activity";
import { AdminSidebar } from "./components/sidebar/admin-sidebar";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/loaders/skeleton";

// Lazy loaded heavy components
const OrganizationGrowth = dynamic(() => import("./components/analytics/organization-growth").then(mod => mod.OrganizationGrowth), { ssr: false, loading: () => <Skeleton className="w-full h-[300px] rounded-xl" /> });
const UserDistribution = dynamic(() => import("./components/analytics/user-distribution").then(mod => mod.UserDistribution), { ssr: false, loading: () => <Skeleton className="w-full h-[300px] rounded-xl" /> });
const WorkspaceActivity = dynamic(() => import("./components/analytics/workspace-activity").then(mod => mod.WorkspaceActivity), { ssr: false, loading: () => <Skeleton className="w-full h-[300px] rounded-xl" /> });
const PendingApprovals = dynamic(() => import("./components/approvals/pending-approvals").then(mod => mod.PendingApprovals), { ssr: false, loading: () => <Skeleton className="w-full h-[300px] rounded-xl" /> });
const AIPlatformInsights = dynamic(() => import("./components/system/ai-platform-insights").then(mod => mod.AIPlatformInsights), { ssr: false, loading: () => <Skeleton className="w-full h-[300px] rounded-xl" /> });

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
