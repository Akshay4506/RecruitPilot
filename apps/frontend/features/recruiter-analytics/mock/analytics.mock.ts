import { 
  DashboardMetrics, 
  HiringFunnel, 
  TimeSeriesData, 
  SourceAnalytics, 
  RecruiterPerformance, 
  AIInsight,
  ExportJob,
  ReportDefinition
} from "../types";
import { subDays, subHours } from "date-fns";

const now = new Date();

export const mockDashboardMetrics: DashboardMetrics = {
  openJobs: 42,
  totalApplications: 1250,
  conversionRate: 18.5,
  offersExtended: 24,
  offerAcceptanceRate: 85,
  hiringVelocity: 1.2,
  pipelineHealthScore: 88,
  avgTimeToHire: 28,
  avgTimeToFill: 45
};

export const mockHiringFunnel: HiringFunnel = {
  totalDropoffRate: 98.5,
  stages: [
    { stage: "Applied", count: 1250, conversionFromPrevious: 100 },
    { stage: "Screening", count: 450, conversionFromPrevious: 36 },
    { stage: "Interview", count: 120, conversionFromPrevious: 26 },
    { stage: "Offer", count: 24, conversionFromPrevious: 20 },
    { stage: "Hired", count: 19, conversionFromPrevious: 79 }
  ]
};

export const mockApplicationsTrend: TimeSeriesData[] = [
  { date: "Jan", value: 120 },
  { date: "Feb", value: 180 },
  { date: "Mar", value: 250 },
  { date: "Apr", value: 210 },
  { date: "May", value: 290 },
  { date: "Jun", value: 200 }
];

export const mockTimeToHireTrend: TimeSeriesData[] = [
  { date: "Jan", value: 35 },
  { date: "Feb", value: 32 },
  { date: "Mar", value: 30 },
  { date: "Apr", value: 29 },
  { date: "May", value: 28 },
  { date: "Jun", value: 28 }
];

export const mockSources: SourceAnalytics[] = [
  { source: "LinkedIn", count: 580, conversionRate: 12 },
  { source: "Website", count: 320, conversionRate: 8 },
  { source: "Referral", count: 150, conversionRate: 35 },
  { source: "Agency", count: 90, conversionRate: 25 },
  { source: "Indeed", count: 110, conversionRate: 4 }
];

export const mockRecruiterPerformance: RecruiterPerformance[] = [
  { recruiterId: "r1", name: "Sarah Connor", activeJobs: 12, candidatesProcessed: 450, timeToHireAvg: 25, offerAcceptanceRate: 92 },
  { recruiterId: "r2", name: "John Smith", activeJobs: 8, candidatesProcessed: 320, timeToHireAvg: 29, offerAcceptanceRate: 81 },
  { recruiterId: "r3", name: "Emily Chen", activeJobs: 15, candidatesProcessed: 510, timeToHireAvg: 31, offerAcceptanceRate: 78 }
];

export const mockInsights: AIInsight[] = [
  { id: "i1", severity: "WARNING", title: "Engineering Pipeline Slowdown", description: "Time-to-interview for Backend roles has increased by 4 days compared to last month.", suggestedAction: "Review screening SLA with hiring manager." },
  { id: "i2", severity: "SUCCESS", title: "Referral Program Success", description: "Referrals are converting at 35%, which is 3x higher than your company average." },
  { id: "i3", severity: "CRITICAL", title: "High Offer Rejection Rate", description: "Design roles are experiencing a 40% offer rejection rate, primarily citing compensation." }
];

export const mockOfferRates: TimeSeriesData[] = [
  { date: "Jan", value: 85 },
  { date: "Feb", value: 88 },
  { date: "Mar", value: 82 },
  { date: "Apr", value: 90 },
  { date: "May", value: 86 },
  { date: "Jun", value: 89 }
];

export const mockDiversityData = [
  { name: "Female", value: 45 },
  { name: "Male", value: 50 },
  { name: "Non-binary", value: 3 },
  { name: "Not Disclosed", value: 2 }
];

export const mockSLAViolations = [
  { metric: "Time to First Response", value: 24, target: 48, status: "SUCCESS" },
  { metric: "Time to Interview Feedback", value: 72, target: 48, status: "FAILED" },
  { metric: "Time to Offer Generation", value: 24, target: 72, status: "SUCCESS" }
];

export const mockExportJobs: ExportJob[] = [
  { id: "e1", name: "Q2 Executive Summary", format: "PDF", status: "COMPLETED", requestedAt: subHours(now, 2).toISOString(), completedAt: subHours(now, 1.9).toISOString(), url: "#" },
  { id: "e2", name: "Diversity Pipeline Data", format: "CSV", status: "RUNNING", requestedAt: subHours(now, 0.1).toISOString() },
  { id: "e3", name: "Failed Export Log", format: "EXCEL", status: "FAILED", requestedAt: subDays(now, 1).toISOString() },
  { id: "e4", name: "SLA Breakdown", format: "PPT", status: "QUEUED", requestedAt: now.toISOString() }
];

export const mockReportPresets: ReportDefinition[] = [
  { id: "p1", name: "Executive Dashboard", description: "High-level metrics for leadership.", type: "DASHBOARD", isPreset: true },
  { id: "p2", name: "Recruiter Performance", description: "Individual output and SLA tracking.", type: "PERFORMANCE", isPreset: true },
  { id: "p3", name: "Source Analytics", description: "ROI on job boards and agencies.", type: "ROI", isPreset: true }
];
