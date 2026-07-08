import { Application } from "../types";
import { subDays, addDays, subHours } from "date-fns";

const now = new Date();

export const mockApplications: Application[] = [
  {
    id: "app-2026-00021",
    applicationNumber: "APP-2026-00021",
    candidateId: "cand-123",
    jobId: "job-101",
    companyId: "comp-1",
    
    jobTitle: "Senior Backend Engineer",
    companyName: "Microsoft",
    companyLogoUrl: "https://logo.clearbit.com/microsoft.com",
    location: "Redmond, WA (Remote)",
    
    status: "ACTIVE",
    stage: "INTERVIEW",
    progressPercentage: 65,
    
    resume: {
      id: "res-4",
      name: "Resume_v4.pdf",
      version: "v4",
      uploadedAt: subDays(now, 10).toISOString(),
    },
    
    supportingDocuments: [],
    
    screeningAnswers: [
      {
        id: "q-1",
        question: "How many years of Node.js experience do you have?",
        answer: "6 years",
        type: "TEXT",
        isRequired: true
      },
      {
        id: "q-2",
        question: "Are you authorized to work in the US?",
        answer: "Yes",
        type: "BOOLEAN",
        isRequired: true
      }
    ],
    
    candidateSnapshot: {
      currentRole: "Software Engineer",
      yearsOfExperience: 4,
      topSkills: ["React", "Node", "AWS"],
      resumeVersion: "v4"
    },
    
    jobSnapshot: {
      jobTitle: "Senior Backend Engineer",
      department: "Cloud Services",
      requirements: ["5+ years Node.js", "AWS Cloud", "Distributed Systems"],
      salaryRange: "$150k - $200k",
      hiringManager: "Alex Turner",
      version: "v1.2"
    },
    
    assignedRecruiter: {
      id: "rec-1",
      name: "Sarah Jenkins",
      role: "Technical Recruiter",
      department: "Talent Acquisition",
      responseTime: "Usually responds within 24 hours"
    },
    
    source: "LinkedIn",
    appliedAt: subDays(now, 12).toISOString(),
    lastActivityAt: subHours(now, 2).toISOString(),
    priority: "HIGH",
    
    timeline: [
      {
        id: "t-1",
        title: "Application Submitted",
        timestamp: subDays(now, 12).toISOString(),
        actor: "CANDIDATE"
      },
      {
        id: "t-2",
        title: "Application Viewed",
        description: "Sarah Jenkins viewed your application.",
        timestamp: subDays(now, 10).toISOString(),
        actor: "RECRUITER"
      },
      {
        id: "t-3",
        title: "Moved to Under Review",
        timestamp: subDays(now, 9).toISOString(),
        actor: "SYSTEM"
      },
      {
        id: "t-4",
        title: "Shortlisted",
        description: "Your profile was matched strongly for this role.",
        timestamp: subDays(now, 5).toISOString(),
        actor: "AI"
      },
      {
        id: "t-5",
        title: "Interview Scheduled",
        description: "Technical screen scheduled for tomorrow.",
        timestamp: subDays(now, 2).toISOString(),
        actor: "RECRUITER"
      }
    ],
    
    interviews: [
      {
        id: "int-1",
        title: "Technical Screen",
        date: addDays(now, 1).toISOString(),
        durationMinutes: 45,
        type: "VIDEO",
        status: "UPCOMING",
        meetingLink: "https://zoom.us/j/123456789"
      }
    ],
    
    insights: {
      matchScore: 92,
      resumeMatchScore: 94,
      profileCompletionScore: 100,
      missingSkills: ["GraphQL"],
      nextExpectedStage: "System Design Interview",
      probabilityScore: 82,
      estimatedNextUpdateDays: 2,
      competitionLevel: "HIGH",
      recruiterActivity: "ACTIVE"
    },
    
    createdAt: subDays(now, 12).toISOString(),
    updatedAt: subHours(now, 2).toISOString()
  },
  {
    id: "app-2026-00022",
    applicationNumber: "APP-2026-00022",
    candidateId: "cand-123",
    jobId: "job-102",
    companyId: "comp-2",
    
    jobTitle: "Frontend Developer",
    companyName: "Vercel",
    companyLogoUrl: "https://logo.clearbit.com/vercel.com",
    location: "Remote",
    
    status: "ACTIVE",
    stage: "UNDER_REVIEW",
    progressPercentage: 25,
    
    resume: {
      id: "res-4",
      name: "Resume_v4.pdf",
      version: "v4",
      uploadedAt: subDays(now, 10).toISOString(),
    },
    
    supportingDocuments: [],
    screeningAnswers: [],
    
    candidateSnapshot: {
      currentRole: "Software Engineer",
      yearsOfExperience: 4,
      topSkills: ["React", "Next.js", "TypeScript"],
      resumeVersion: "v4"
    },
    
    jobSnapshot: {
      jobTitle: "Frontend Developer",
      department: "Engineering",
      requirements: ["React", "Next.js", "Web Performance"],
      salaryRange: "$120k - $160k",
      hiringManager: "Jane Doe",
      version: "v1.0"
    },
    
    source: "Direct",
    appliedAt: subDays(now, 2).toISOString(),
    lastActivityAt: subDays(now, 1).toISOString(),
    priority: "MEDIUM",
    
    timeline: [
      {
        id: "t-1",
        title: "Application Submitted",
        timestamp: subDays(now, 2).toISOString(),
        actor: "CANDIDATE"
      },
      {
        id: "t-2",
        title: "Application Viewed",
        timestamp: subDays(now, 1).toISOString(),
        actor: "RECRUITER"
      }
    ],
    
    interviews: [],
    
    insights: {
      matchScore: 85,
      resumeMatchScore: 88,
      profileCompletionScore: 100,
      missingSkills: ["Framer Motion"],
      nextExpectedStage: "Initial Screen",
      probabilityScore: 65,
      estimatedNextUpdateDays: 3,
      competitionLevel: "MEDIUM",
      recruiterActivity: "MODERATE"
    },
    
    createdAt: subDays(now, 2).toISOString(),
    updatedAt: subDays(now, 1).toISOString()
  },
  {
    id: "app-2026-00015",
    applicationNumber: "APP-2026-00015",
    candidateId: "cand-123",
    jobId: "job-089",
    companyId: "comp-3",
    
    jobTitle: "Full Stack Engineer",
    companyName: "Stripe",
    companyLogoUrl: "https://logo.clearbit.com/stripe.com",
    location: "San Francisco, CA",
    
    status: "REJECTED",
    stage: "INTERVIEW",
    progressPercentage: 100,
    
    resume: {
      id: "res-3",
      name: "Resume_v3.pdf",
      version: "v3",
      uploadedAt: subDays(now, 45).toISOString(),
    },
    
    supportingDocuments: [],
    screeningAnswers: [],
    
    candidateSnapshot: {
      currentRole: "Backend Developer",
      yearsOfExperience: 3,
      topSkills: ["Node", "SQL", "Stripe API"],
      resumeVersion: "v3"
    },
    
    jobSnapshot: {
      jobTitle: "Full Stack Engineer",
      department: "Payments",
      requirements: ["Ruby", "React", "Systems Design"],
      salaryRange: "$160k - $210k",
      hiringManager: "Mark Smith",
      version: "v1.1"
    },
    
    source: "Referral",
    appliedAt: subDays(now, 40).toISOString(),
    rejectedAt: subDays(now, 15).toISOString(),
    lastActivityAt: subDays(now, 15).toISOString(),
    priority: "MEDIUM",
    
    timeline: [
      {
        id: "t-1",
        title: "Application Submitted",
        timestamp: subDays(now, 40).toISOString(),
        actor: "CANDIDATE"
      },
      {
        id: "t-2",
        title: "Technical Screen",
        description: "Completed technical interview with engineering team.",
        timestamp: subDays(now, 20).toISOString(),
        actor: "SYSTEM"
      },
      {
        id: "t-3",
        title: "Not Selected",
        description: "We decided to move forward with other candidates at this time.",
        timestamp: subDays(now, 15).toISOString(),
        actor: "RECRUITER"
      }
    ],
    
    interviews: [
      {
        id: "int-old",
        title: "Technical Screen",
        date: subDays(now, 20).toISOString(),
        durationMinutes: 60,
        type: "VIDEO",
        status: "COMPLETED"
      }
    ],
    
    insights: {
      matchScore: 72,
      resumeMatchScore: 70,
      profileCompletionScore: 90,
      missingSkills: ["Ruby", "Ruby on Rails"],
      nextExpectedStage: "N/A",
      competitionLevel: "HIGH",
      recruiterActivity: "INACTIVE"
    },
    
    createdAt: subDays(now, 40).toISOString(),
    updatedAt: subDays(now, 15).toISOString()
  }
];
