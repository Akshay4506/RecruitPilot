import {
  AdminMetrics,
  SystemHealthNode,
  PendingApproval,
  ActivityTimelineItem,
  PlatformInsight,
  SubscriptionSummary,
  TimeSeriesData,
  PieData,
  StorageDistribution
} from "../types";

export const mockAdminMetrics: AdminMetrics = {
  totalUsers: 1420,
  recruiters: 120,
  hiringManagers: 300,
  candidates: 1000,
  jobs: 245,
  applications: 15420,
  interviews: 840,
  companies: 1, // Enterprise single tenant assumed for this mock
  activeSessions: 42,
  storageUsedGb: 845,
  storageLimitGb: 2048,
};

export const mockSystemHealth: SystemHealthNode[] = [
  { id: "h1", name: "Database", status: "HEALTHY", latencyMs: 34, uptimePercentage: 99.99, lastChecked: "2 min ago" },
  { id: "h2", name: "Storage", status: "HEALTHY", latencyMs: 120, uptimePercentage: 99.95, lastChecked: "1 min ago" },
  { id: "h3", name: "Email Queue", status: "DEGRADED", latencyMs: 450, uptimePercentage: 98.2, lastChecked: "Just now" },
  { id: "h4", name: "Authentication", status: "HEALTHY", latencyMs: 45, uptimePercentage: 99.99, lastChecked: "5 min ago" },
];

export const mockPendingApprovals: PendingApproval[] = [
  { id: "a1", type: "User Invite", title: "Invite: alex.rivera@example.com", requester: "Sarah Connor", requestedAt: "1 hour ago", status: "PENDING" },
  { id: "a2", type: "Department", title: "Create Dept: Data Science", requester: "John Smith", requestedAt: "3 hours ago", status: "PENDING" },
  { id: "a3", type: "Integration", title: "Enable Workday Sync", requester: "System", requestedAt: "1 day ago", status: "PENDING" },
  { id: "a4", type: "Domain", title: "Verify: europe.acme.corp", requester: "IT Admin", requestedAt: "2 days ago", status: "PENDING" },
];

export const mockActivityTimeline: ActivityTimelineItem[] = [
  { id: "t1", type: "USER", title: "User invited", timestamp: "2026-07-08T09:12:00Z", actor: "Admin" },
  { id: "t2", type: "JOB", title: "Job published: Sr. Frontend Eng", timestamp: "2026-07-08T09:15:00Z", actor: "Sarah Connor" },
  { id: "t3", type: "SYSTEM", title: "Interview scheduled", timestamp: "2026-07-08T09:22:00Z", actor: "System" },
  { id: "t4", type: "SYSTEM", title: "SSO Configured", timestamp: "2026-07-08T09:31:00Z", actor: "Admin" },
  { id: "t5", type: "BILLING", title: "Subscription renewed", timestamp: "2026-07-08T09:40:00Z", actor: "System" },
];

export const mockInsights: PlatformInsight[] = [
  { id: "i1", title: "High recruiter workload", description: "Engineering recruiters have exceeded recommended workload by 18%.", severity: "WARNING" },
  { id: "i2", title: "Storage limit approaching", description: "Storage usage has reached 41%. Consider archiving older applications.", severity: "INFO" },
  { id: "i3", title: "Unused Licenses", description: "You have 15 unassigned recruiter seats available on your current plan.", severity: "INFO" },
];

export const mockSubscription: SubscriptionSummary = {
  planName: "Enterprise Plus",
  status: "ACTIVE",
  billingCycle: "Annual",
  nextBillingDate: "2027-01-15",
  amount: 45000,
  seatsUsed: 120,
  seatsTotal: 150,
};

export const mockGrowthData: TimeSeriesData[] = [
  { date: "Jan", users: 1200, jobs: 180, applications: 8500 },
  { date: "Feb", users: 1250, jobs: 200, applications: 9200 },
  { date: "Mar", users: 1300, jobs: 215, applications: 11000 },
  { date: "Apr", users: 1350, jobs: 220, applications: 12500 },
  { date: "May", users: 1380, jobs: 240, applications: 14000 },
  { date: "Jun", users: 1420, jobs: 245, applications: 15420 },
];

export const mockUserDistribution: PieData[] = [
  { name: "Candidates", value: 1000 },
  { name: "Hiring Managers", value: 300 },
  { name: "Recruiters", value: 120 },
];

export const mockStorageDistribution: StorageDistribution[] = [
  { name: "Documents", sizeGb: 520 },
  { name: "Database", sizeGb: 150 },
  { name: "Media", sizeGb: 175 },
];
