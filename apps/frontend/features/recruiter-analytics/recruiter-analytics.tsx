"use client";

import * as React from "react";
import { RecruiterAnalyticsHero } from "./components/overview/recruiter-analytics-hero";
import { AnalyticsMetrics } from "./components/overview/analytics-metrics";
import { PipelineFunnelCard } from "./components/dashboard/pipeline-funnel-card";
import { ApplicationsTrendCard } from "./components/dashboard/applications-trend-card";
import { SourcePerformanceCard } from "./components/dashboard/source-performance-card";
import { TimeToHireCard } from "./components/dashboard/time-to-hire-card";
import { OfferRateCard } from "./components/dashboard/offer-rate-card";
import { RecruiterPerformanceCard } from "./components/dashboard/recruiter-performance-card";
import { DepartmentPerformanceCard } from "./components/dashboard/department-performance-card";
import { DiversityAnalyticsCard } from "./components/dashboard/diversity-analytics-card";
import { SLADashboardCard } from "./components/dashboard/sla-dashboard-card";
import { AIInsights } from "./components/insights/ai-insights";
import { BenchmarkPanel } from "./components/insights/benchmark-panel";
import { AnalyticsSidebar } from "./components/sidebar/analytics-sidebar";
import { 
  mockDashboardMetrics, 
  mockHiringFunnel, 
  mockApplicationsTrend,
  mockSources,
  mockTimeToHireTrend,
  mockOfferRates,
  mockRecruiterPerformance,
  mockDiversityData,
  mockSLAViolations,
  mockInsights
} from "./mock/analytics.mock";

export function RecruiterAnalytics() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-24">
      <RecruiterAnalyticsHero />
      <AnalyticsMetrics metrics={mockDashboardMetrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PipelineFunnelCard funnel={mockHiringFunnel} />
            <ApplicationsTrendCard data={mockApplicationsTrend} />
            <SourcePerformanceCard sources={mockSources} />
            <TimeToHireCard data={mockTimeToHireTrend} />
            <OfferRateCard data={mockOfferRates} />
            <DiversityAnalyticsCard data={mockDiversityData} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <RecruiterPerformanceCard performance={mockRecruiterPerformance} />
            <DepartmentPerformanceCard />
            <SLADashboardCard data={mockSLAViolations} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">AI Recommendations</h3>
              <AIInsights insights={mockInsights} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">Company Benchmarks</h3>
              <BenchmarkPanel />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 border-l border-[hsl(var(--border))] pl-6 hidden lg:block">
          <AnalyticsSidebar />
        </div>
      </div>
    </div>
  );
}
