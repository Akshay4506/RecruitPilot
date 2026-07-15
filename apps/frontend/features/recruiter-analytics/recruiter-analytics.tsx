"use client";

import * as React from "react";
import { RecruiterAnalyticsHero } from "./components/overview/recruiter-analytics-hero";
import { AnalyticsMetrics } from "./components/overview/analytics-metrics";
import { AIInsights } from "./components/insights/ai-insights";
import { BenchmarkPanel } from "./components/insights/benchmark-panel";
import { AnalyticsSidebar } from "./components/sidebar/analytics-sidebar";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/loaders/skeleton";

// Lazy loaded Recharts components
const PipelineFunnelCard = dynamic(() => import("./components/dashboard/pipeline-funnel-card").then(mod => mod.PipelineFunnelCard), { ssr: false, loading: () => <Skeleton className="w-full h-[350px] rounded-xl" /> });
const ApplicationsTrendCard = dynamic(() => import("./components/dashboard/applications-trend-card").then(mod => mod.ApplicationsTrendCard), { ssr: false, loading: () => <Skeleton className="w-full h-[350px] rounded-xl" /> });
const SourcePerformanceCard = dynamic(() => import("./components/dashboard/source-performance-card").then(mod => mod.SourcePerformanceCard), { ssr: false, loading: () => <Skeleton className="w-full h-[350px] rounded-xl" /> });
const TimeToHireCard = dynamic(() => import("./components/dashboard/time-to-hire-card").then(mod => mod.TimeToHireCard), { ssr: false, loading: () => <Skeleton className="w-full h-[350px] rounded-xl" /> });
const OfferRateCard = dynamic(() => import("./components/dashboard/offer-rate-card").then(mod => mod.OfferRateCard), { ssr: false, loading: () => <Skeleton className="w-full h-[350px] rounded-xl" /> });
const RecruiterPerformanceCard = dynamic(() => import("./components/dashboard/recruiter-performance-card").then(mod => mod.RecruiterPerformanceCard), { ssr: false, loading: () => <Skeleton className="w-full h-[350px] rounded-xl" /> });
const DepartmentPerformanceCard = dynamic(() => import("./components/dashboard/department-performance-card").then(mod => mod.DepartmentPerformanceCard), { ssr: false, loading: () => <Skeleton className="w-full h-[350px] rounded-xl" /> });
const DiversityAnalyticsCard = dynamic(() => import("./components/dashboard/diversity-analytics-card").then(mod => mod.DiversityAnalyticsCard), { ssr: false, loading: () => <Skeleton className="w-full h-[350px] rounded-xl" /> });
const SLADashboardCard = dynamic(() => import("./components/dashboard/sla-dashboard-card").then(mod => mod.SLADashboardCard), { ssr: false, loading: () => <Skeleton className="w-full h-[350px] rounded-xl" /> });

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
