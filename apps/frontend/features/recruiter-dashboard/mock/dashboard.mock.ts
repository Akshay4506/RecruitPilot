import { RecruiterDashboard } from "../types";

export const mockDashboard: RecruiterDashboard = {
  recruiterName: "Sarah Connor",
  companyName: "Acme Corp",
  metrics: {
    openJobs: 14,
    applicationsReceived: 342,
    pendingReviews: 87,
    interviewsToday: 5,
    offersSent: 12,
    hires: 4,
    hiringVelocityDays: 24,
    timeToHireDays: 45,
  },
  hiringGoal: {
    targetHires: 20,
    currentHires: 4,
    month: "July",
  },
  insights: [
    {
      id: "ins-1",
      title: "High Rejection Rate",
      description: "Frontend Engineer position has a 92% rejection rate at initial screening.",
      severity: "WARNING",
      type: "REJECTION_RATE",
      actionLabel: "Review Screening Rules",
    },
    {
      id: "ins-2",
      title: "Job Aging Alert",
      description: "Senior Product Manager role has been open for 65 days.",
      severity: "CRITICAL",
      type: "JOB_AGING",
      actionLabel: "View Job",
    },
    {
      id: "ins-3",
      title: "Healthy Pipeline",
      description: "Backend Engineer pipeline has 4 candidates at offer stage.",
      severity: "INFO",
      type: "PIPELINE_HEALTH",
      actionLabel: "View Pipeline",
    }
  ],
  assignedJobs: [
    {
      id: "job-1",
      title: "Senior Frontend Engineer",
      department: "Engineering",
      applicationsCount: 145,
      hiringManager: "John Smith",
      daysOpen: 12,
      status: "PUBLISHED",
      progressPercentage: 65,
    },
    {
      id: "job-2",
      title: "Product Designer",
      department: "Design",
      applicationsCount: 89,
      hiringManager: "Emma Davis",
      daysOpen: 34,
      status: "PUBLISHED",
      progressPercentage: 40,
    },
    {
      id: "job-3",
      title: "Engineering Manager",
      department: "Engineering",
      applicationsCount: 42,
      hiringManager: "Mike Johnson",
      daysOpen: 5,
      status: "PUBLISHED",
      progressPercentage: 15,
    }
  ],
  recentApplications: [
    {
      id: "app-1",
      candidateName: "Alex Turner",
      jobTitle: "Senior Frontend Engineer",
      jobId: "job-1",
      status: "NEW",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      matchScore: 94,
    },
    {
      id: "app-2",
      candidateName: "Jamie Lee",
      jobTitle: "Product Designer",
      jobId: "job-2",
      status: "REVIEWING",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      matchScore: 88,
    },
    {
      id: "app-3",
      candidateName: "Morgan Smith",
      jobTitle: "Senior Frontend Engineer",
      jobId: "job-1",
      status: "SHORTLISTED",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
      matchScore: 97,
    }
  ],
  upcomingInterviews: [
    {
      id: "int-1",
      candidateName: "Jordan Davis",
      jobTitle: "Engineering Manager",
      type: "SYSTEM_DESIGN",
      date: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // In 2 hours
      panelCount: 3,
      meetingPlatform: "VIDEO",
      joinUrl: "https://zoom.us/j/123456789",
    },
    {
      id: "int-2",
      candidateName: "Casey Wilson",
      jobTitle: "Senior Frontend Engineer",
      type: "TECHNICAL",
      date: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(), // In 5 hours
      panelCount: 2,
      meetingPlatform: "VIDEO",
      joinUrl: "https://zoom.us/j/987654321",
    }
  ],
  pipeline: [
    { stage: "SUBMITTED", count: 342, conversionRateFromPrevious: 100 },
    { stage: "UNDER_REVIEW", count: 156, conversionRateFromPrevious: 45.6 },
    { stage: "SHORTLISTED", count: 48, conversionRateFromPrevious: 30.7 },
    { stage: "INTERVIEW", count: 24, conversionRateFromPrevious: 50.0 },
    { stage: "OFFER", count: 12, conversionRateFromPrevious: 50.0 },
    { stage: "HIRED", count: 4, conversionRateFromPrevious: 33.3 },
  ],
  notifications: [
    {
      id: "notif-1",
      title: "New Application Received",
      description: "Alex Turner applied for Senior Frontend Engineer",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      type: "APPLICATION",
      read: false,
    },
    {
      id: "notif-2",
      title: "Interview Accepted",
      description: "Jordan Davis accepted the System Design interview",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      type: "INTERVIEW",
      read: true,
    },
    {
      id: "notif-3",
      title: "Offer Signed",
      description: "Taylor Swift signed the offer letter for Data Scientist",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      type: "OFFER",
      read: true,
    }
  ],
  activityTimeline: [
    {
      id: "evt-1",
      title: "AI Candidate Matching Complete",
      description: "Scanned 145 applications for Senior Frontend Engineer.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      actor: "AI",
    },
    {
      id: "evt-2",
      title: "Interview Scheduled",
      description: "You scheduled a Technical Interview with Casey Wilson.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      actor: "RECRUITER",
    },
    {
      id: "evt-3",
      title: "New Job Published",
      description: "Engineering Manager role is now live on the career site.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      actor: "SYSTEM",
    },
    {
      id: "evt-4",
      title: "Application Received",
      description: "Morgan Smith applied for Senior Frontend Engineer.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      actor: "CANDIDATE",
    }
  ]
};
