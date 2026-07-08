"use client";

import * as React from "react";
import { mockDashboard } from "./mock/dashboard.mock";

// Components
import { DashboardHero } from "./components/overview/dashboard-hero";
import { KpiMetrics } from "./components/overview/kpi-metrics";
import { HiringGoals } from "./components/overview/hiring-goals";
import { WorkloadWidget } from "./components/overview/workload-widget";

import { RecruitmentFunnel } from "./components/analytics/recruitment-funnel";
import { RecruitmentInsights } from "./components/analytics/recruitment-insights";
import { MiniAnalytics } from "./components/analytics/mini-analytics";

import { RecruiterActivityTimeline } from "./components/activity/recruiter-activity-timeline";
import { RecentNotifications } from "./components/activity/recent-notifications";

import { AssignedJobsTable } from "./components/jobs/assigned-jobs-table";
import { RecentApplicationsList } from "./components/applications/recent-applications-list";
import { UpcomingInterviews } from "./components/interviews/upcoming-interviews";

import { QuickActionsCard } from "./components/actions/quick-actions-card";

export function RecruiterDashboard() {
  const dashboard = mockDashboard;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Hero Section */}
      <DashboardHero dashboard={dashboard} />

      {/* KPI Metrics row */}
      <KpiMetrics metrics={dashboard.metrics} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols) - Main Content */}
        <div className="lg:col-span-8 space-y-8">
          
          <MiniAnalytics />
          
          <RecruitmentFunnel pipeline={dashboard.pipeline} />
          
          <AssignedJobsTable jobs={dashboard.assignedJobs} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RecentApplicationsList applications={dashboard.recentApplications} />
            <RecruiterActivityTimeline events={dashboard.activityTimeline} />
          </div>

        </div>

        {/* Right Column (4 cols) - Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-6">
          <HiringGoals goal={dashboard.hiringGoal} />
          <WorkloadWidget metrics={dashboard.metrics} />
          <RecruitmentInsights insights={dashboard.insights} />
          <UpcomingInterviews interviews={dashboard.upcomingInterviews} />
          <RecentNotifications notifications={dashboard.notifications} />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
}
