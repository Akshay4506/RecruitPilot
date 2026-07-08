import { Interview } from "../types";
import { addDays, subDays, subHours } from "date-fns";

const now = new Date();

export const mockInterviews: Interview[] = [
  {
    id: "int-2026-001",
    interviewNumber: "INT-2026-001",
    applicationId: "app-2026-00021",
    candidateId: "cand-123",
    jobId: "job-101",
    companyId: "comp-1",
    
    jobTitle: "Senior Backend Engineer",
    companyName: "Microsoft",
    companyLogoUrl: "https://logo.clearbit.com/microsoft.com",
    
    round: "Technical Screen",
    type: "TECHNICAL",
    status: "SCHEDULED",
    confirmationStatus: "PENDING",
    
    date: addDays(now, 2).toISOString(),
    durationMinutes: 60,
    timezone: "America/Los_Angeles",
    
    meeting: {
      platform: "TEAMS",
      joinUrl: "https://teams.microsoft.com/l/meetup-join/19...",
      meetingId: "123 456 789",
      passcode: "MSFT26",
      organizerName: "Sarah Jenkins",
      language: "English",
      accessibilityNotes: "Closed captioning is enabled by default."
    },
    
    panel: [
      {
        id: "pnl-1",
        name: "Alex Turner",
        role: "Principal Engineer",
        department: "Cloud Services",
        companyName: "Microsoft"
      }
    ],
    
    preparation: {
      agenda: [
        "10 mins: Introductions & Background",
        "40 mins: System Design & Coding (Node.js/AWS)",
        "10 mins: Q&A"
      ],
      preparationNotes: "Please have a stable internet connection and be prepared to share your screen. You will use CoderPad for the technical portion.",
      requiredDocuments: ["Valid ID"],
      tips: [
        "Review highly scalable architecture patterns.",
        "Be ready to discuss past challenges with distributed systems."
      ],
      expectedDurationMinutes: 60
    },
    
    insights: {
      preparationScore: 75,
      profileMatchScore: 92,
      interviewReadiness: "MEDIUM",
      documentsReady: true,
      reminderStatus: "Sent 24h ago"
    },
    
    applicationStage: "INTERVIEW",
    applicationStatus: "ACTIVE",
    appliedAt: subDays(now, 15).toISOString(),
    resumeUsed: {
      name: "Resume_v4.pdf",
      version: "v4"
    },
    
    timeline: [
      {
        id: "t-1",
        title: "Interview Scheduled",
        description: "Sarah Jenkins scheduled your technical screen.",
        timestamp: subDays(now, 3).toISOString(),
        actor: "RECRUITER"
      },
      {
        id: "t-2",
        title: "Reminder Sent",
        description: "Please confirm your attendance.",
        timestamp: subHours(now, 24).toISOString(),
        actor: "SYSTEM"
      }
    ],
    
    createdAt: subDays(now, 3).toISOString(),
    updatedAt: subHours(now, 24).toISOString()
  },
  {
    id: "int-2026-002",
    interviewNumber: "INT-2026-002",
    applicationId: "app-2026-00022",
    candidateId: "cand-123",
    jobId: "job-102",
    companyId: "comp-2",
    
    jobTitle: "Frontend Developer",
    companyName: "Vercel",
    companyLogoUrl: "https://logo.clearbit.com/vercel.com",
    
    round: "Initial Screen",
    type: "INITIAL_SCREEN",
    status: "CONFIRMED",
    confirmationStatus: "CONFIRMED",
    
    date: addDays(now, 1).toISOString(),
    durationMinutes: 30,
    timezone: "America/New_York",
    
    meeting: {
      platform: "ZOOM",
      joinUrl: "https://zoom.us/j/987654321",
      meetingId: "987 654 321",
      passcode: "VERCEL",
      organizerName: "Jane Doe",
      language: "English"
    },
    
    panel: [
      {
        id: "pnl-2",
        name: "Jane Doe",
        role: "Recruiting Coordinator",
        department: "Talent",
        companyName: "Vercel"
      }
    ],
    
    preparation: {
      agenda: [
        "15 mins: Recruiter Screen",
        "15 mins: Q&A"
      ],
      preparationNotes: "A casual chat to align on expectations and tell you more about Vercel.",
      requiredDocuments: [],
      tips: [
        "Come with questions about the team and culture."
      ],
      expectedDurationMinutes: 30
    },
    
    insights: {
      preparationScore: 100,
      profileMatchScore: 88,
      interviewReadiness: "HIGH",
      documentsReady: true,
      reminderStatus: "Up to date"
    },
    
    applicationStage: "INTERVIEW",
    applicationStatus: "ACTIVE",
    appliedAt: subDays(now, 10).toISOString(),
    resumeUsed: {
      name: "Resume_v4.pdf",
      version: "v4"
    },
    
    timeline: [
      {
        id: "t-1",
        title: "Interview Scheduled",
        timestamp: subDays(now, 2).toISOString(),
        actor: "SYSTEM"
      },
      {
        id: "t-2",
        title: "Attendance Confirmed",
        timestamp: subDays(now, 1).toISOString(),
        actor: "CANDIDATE"
      }
    ],
    
    createdAt: subDays(now, 2).toISOString(),
    updatedAt: subDays(now, 1).toISOString()
  },
  {
    id: "int-2026-003",
    interviewNumber: "INT-2026-003",
    applicationId: "app-2026-00015",
    candidateId: "cand-123",
    jobId: "job-089",
    companyId: "comp-3",
    
    jobTitle: "Full Stack Engineer",
    companyName: "Stripe",
    companyLogoUrl: "https://logo.clearbit.com/stripe.com",
    
    round: "System Design",
    type: "SYSTEM_DESIGN",
    status: "COMPLETED",
    confirmationStatus: "CONFIRMED",
    
    date: subDays(now, 5).toISOString(),
    durationMinutes: 60,
    timezone: "America/Los_Angeles",
    
    meeting: {
      platform: "GOOGLE_MEET",
      organizerName: "Mark Smith",
      language: "English"
    },
    
    panel: [
      {
        id: "pnl-3",
        name: "David Chen",
        role: "Staff Engineer",
        department: "Payments",
        companyName: "Stripe"
      }
    ],
    
    preparation: {
      agenda: [],
      preparationNotes: "",
      requiredDocuments: [],
      tips: [],
      expectedDurationMinutes: 60
    },
    
    insights: {
      preparationScore: 90,
      profileMatchScore: 72,
      interviewReadiness: "HIGH",
      documentsReady: true,
      reminderStatus: "N/A"
    },
    
    applicationStage: "INTERVIEW",
    applicationStatus: "REJECTED",
    appliedAt: subDays(now, 45).toISOString(),
    resumeUsed: {
      name: "Resume_v3.pdf",
      version: "v3"
    },
    
    timeline: [
      {
        id: "t-1",
        title: "Interview Completed",
        timestamp: subDays(now, 5).toISOString(),
        actor: "SYSTEM"
      }
    ],
    
    createdAt: subDays(now, 10).toISOString(),
    updatedAt: subDays(now, 5).toISOString()
  }
];
