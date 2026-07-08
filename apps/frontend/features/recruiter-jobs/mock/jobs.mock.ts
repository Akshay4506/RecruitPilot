import { Job } from "../types";

export const mockJobs: Job[] = [
  {
    id: "job-1",
    slug: "senior-frontend-engineer-react",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    team: "Core Platform",
    summary: "We are looking for a Senior Frontend Engineer to lead the development of our next-generation web platform using React, Next.js, and TypeScript.",
    
    employmentType: "FULL_TIME",
    workMode: "REMOTE",
    status: "PUBLISHED",
    visibility: "PUBLIC",
    experienceLevel: "SENIOR",
    
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
      isRemote: true
    },
    
    salary: {
      min: 140000,
      max: 180000,
      currency: "USD",
      interval: "YEARLY",
      hideSalary: false
    },
    
    benefits: [
      { id: "b1", title: "Comprehensive Health", description: "100% covered health, dental, and vision insurance." },
      { id: "b2", title: "Remote Work Stipend", description: "$1,000 to set up your home office." },
      { id: "b3", title: "Flexible PTO", description: "Take the time you need, when you need it." }
    ],
    
    requirements: [
      { id: "r1", content: "5+ years of experience with modern React", isMandatory: true },
      { id: "r2", content: "Deep understanding of TypeScript", isMandatory: true },
      { id: "r3", content: "Experience with Next.js App Router", isMandatory: false }
    ],
    
    responsibilities: [
      "Architect and build responsive, accessible frontend features.",
      "Mentor junior engineers and lead code reviews.",
      "Collaborate with design and product teams to define UX."
    ],
    
    qualifications: [
      "Bachelor's degree in Computer Science or equivalent experience."
    ],
    
    skills: [
      { name: "React", type: "MANDATORY" },
      { name: "TypeScript", type: "MANDATORY" },
      { name: "Next.js", type: "PREFERRED" },
      { name: "Tailwind CSS", type: "PREFERRED" }
    ],
    
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    
    hiringTeam: [
      { id: "ht1", name: "Sarah Chen", role: "Hiring Manager", department: "Engineering", avatarUrl: "https://i.pravatar.cc/150?u=sarah" },
      { id: "ht2", name: "Michael Rodriguez", role: "Recruiter", department: "People", avatarUrl: "https://i.pravatar.cc/150?u=michael" }
    ],
    
    attachments: [
      { id: "a1", name: "Architecture_Guidelines.pdf", size: 1024500, type: "application/pdf", url: "#", uploadedAt: "2024-01-15T09:00:00Z", uploadedBy: "Sarah Chen" }
    ],
    
    publishedAt: "2024-01-16T10:30:00Z",
    closingDate: "2024-03-01T23:59:59Z",
    
    analytics: {
      viewsCount: 1250,
      applicationsCount: 125,
      savesCount: 45,
      interviewsCount: 18,
      offersCount: 3,
      hiresCount: 0,
      conversionRate: 10.0,
      avgTimeToHireDays: undefined,
      avgTimeToFillDays: undefined
    },
    
    pipeline: {
      applied: 45,
      screening: 32,
      technical: 18,
      manager: 8,
      hr: 3,
      offer: 1,
      hired: 0,
      totalActive: 107
    },
    
    publishingHistory: [
      { id: "ph1", status: "DRAFT", timestamp: "2024-01-15T14:20:00Z", changedBy: "Michael Rodriguez" },
      { id: "ph2", status: "PUBLISHED", timestamp: "2024-01-16T10:30:00Z", changedBy: "Sarah Chen", notes: "Approved for publishing." }
    ],
    
    health: {
      status: "HEALTHY",
      reasons: ["High application velocity", "Strong conversion to technical interview"]
    },
    
    createdAt: "2024-01-15T14:20:00Z",
    updatedAt: "2024-01-20T08:15:00Z"
  },
  {
    id: "job-2",
    slug: "product-designer-design-system",
    title: "Product Designer",
    department: "Design",
    team: "Design Systems",
    summary: "Help shape the visual language of our products. We need a detail-oriented designer to evolve our core design system.",
    
    employmentType: "FULL_TIME",
    workMode: "HYBRID",
    status: "PAUSED",
    visibility: "PUBLIC",
    experienceLevel: "MID",
    
    location: {
      city: "New York",
      state: "NY",
      country: "USA",
      isRemote: false
    },
    office: "HQ - Manhattan",
    
    salary: {
      min: 110000,
      max: 140000,
      currency: "USD",
      interval: "YEARLY",
      hideSalary: false
    },
    
    benefits: [
      { id: "b1", title: "Comprehensive Health", description: "100% covered health, dental, and vision insurance." },
      { id: "b4", title: "Commuter Benefits", description: "Pre-tax transit accounts." }
    ],
    
    requirements: [
      { id: "r4", content: "3+ years of product design experience", isMandatory: true },
      { id: "r5", content: "Experience building and maintaining design systems", isMandatory: true }
    ],
    
    responsibilities: [
      "Maintain and evolve the Figma UI kit.",
      "Document design tokens and component usage."
    ],
    
    qualifications: [],
    
    skills: [
      { name: "Figma", type: "MANDATORY" },
      { name: "Design Systems", type: "MANDATORY" }
    ],
    
    technologies: ["Figma", "Storybook", "CSS"],
    
    hiringTeam: [
      { id: "ht3", name: "Elena Rostova", role: "Design Lead", department: "Design", avatarUrl: "https://i.pravatar.cc/150?u=elena" }
    ],
    
    attachments: [],
    
    publishedAt: "2023-11-01T09:00:00Z",
    
    analytics: {
      viewsCount: 3200,
      applicationsCount: 410,
      savesCount: 120,
      interviewsCount: 45,
      offersCount: 2,
      hiresCount: 1,
      conversionRate: 12.8,
      avgTimeToHireDays: 24,
      avgTimeToFillDays: 30
    },
    
    pipeline: {
      applied: 0,
      screening: 0,
      technical: 0,
      manager: 0,
      hr: 0,
      offer: 1,
      hired: 1,
      totalActive: 1
    },
    
    publishingHistory: [
      { id: "ph3", status: "PUBLISHED", timestamp: "2023-11-01T09:00:00Z", changedBy: "Michael Rodriguez" },
      { id: "ph4", status: "PAUSED", timestamp: "2023-12-15T16:00:00Z", changedBy: "Elena Rostova", notes: "Offer accepted by top candidate, pausing while background check clears." }
    ],
    
    health: {
      status: "HEALTHY",
      reasons: ["Offer accepted"]
    },
    
    createdAt: "2023-10-25T11:00:00Z",
    updatedAt: "2023-12-15T16:00:00Z"
  },
  {
    id: "job-3",
    slug: "backend-engineer-go",
    title: "Backend Engineer",
    department: "Engineering",
    team: "Infrastructure",
    summary: "Scale our microservices architecture using Go and Kubernetes.",
    
    employmentType: "CONTRACT",
    workMode: "REMOTE",
    status: "DRAFT",
    visibility: "INTERNAL",
    experienceLevel: "MID",
    
    location: {
      city: "Austin",
      state: "TX",
      country: "USA",
      isRemote: true
    },
    
    salary: {
      min: 80,
      max: 120,
      currency: "USD",
      interval: "HOURLY",
      hideSalary: true
    },
    
    benefits: [],
    requirements: [
      { id: "r6", content: "Strong Go programming skills", isMandatory: true }
    ],
    responsibilities: [
      "Optimize core APIs for performance."
    ],
    qualifications: [],
    skills: [
      { name: "Go", type: "MANDATORY" },
      { name: "Kubernetes", type: "PREFERRED" }
    ],
    technologies: ["Go", "Kubernetes", "PostgreSQL", "Redis"],
    
    hiringTeam: [
      { id: "ht4", name: "David Kim", role: "VP Engineering", department: "Engineering", avatarUrl: "https://i.pravatar.cc/150?u=david" }
    ],
    
    attachments: [],
    
    analytics: {
      viewsCount: 0,
      applicationsCount: 0,
      savesCount: 0,
      interviewsCount: 0,
      offersCount: 0,
      hiresCount: 0,
      conversionRate: 0,
    },
    
    pipeline: {
      applied: 0,
      screening: 0,
      technical: 0,
      manager: 0,
      hr: 0,
      offer: 0,
      hired: 0,
      totalActive: 0
    },
    
    publishingHistory: [
      { id: "ph5", status: "DRAFT", timestamp: "2024-02-10T08:00:00Z", changedBy: "David Kim" }
    ],
    
    health: {
      status: "HEALTHY",
      reasons: ["New draft"]
    },
    
    createdAt: "2024-02-10T08:00:00Z",
    updatedAt: "2024-02-10T08:00:00Z"
  },
  {
    id: "job-4",
    slug: "customer-success-manager",
    title: "Customer Success Manager",
    department: "Customer Success",
    summary: "Ensure our enterprise clients get the maximum value from our platform.",
    
    employmentType: "FULL_TIME",
    workMode: "REMOTE",
    status: "PUBLISHED",
    visibility: "PUBLIC",
    experienceLevel: "MID",
    
    location: {
      city: "London",
      country: "UK",
      isRemote: true
    },
    
    salary: {
      min: 60000,
      max: 80000,
      currency: "GBP",
      interval: "YEARLY",
      hideSalary: false
    },
    
    benefits: [
      { id: "b5", title: "Pension", description: "5% match." }
    ],
    requirements: [
      { id: "r7", content: "2+ years in B2B SaaS Customer Success", isMandatory: true }
    ],
    responsibilities: [
      "Manage a book of 40 enterprise accounts."
    ],
    qualifications: [],
    skills: [
      { name: "Account Management", type: "MANDATORY" },
      { name: "Salesforce", type: "PREFERRED" }
    ],
    technologies: ["Salesforce", "Zendesk"],
    
    hiringTeam: [
      { id: "ht2", name: "Michael Rodriguez", role: "Recruiter", department: "People", avatarUrl: "https://i.pravatar.cc/150?u=michael" }
    ],
    
    attachments: [],
    publishedAt: "2023-08-01T10:00:00Z",
    
    analytics: {
      viewsCount: 840,
      applicationsCount: 42,
      savesCount: 15,
      interviewsCount: 4,
      offersCount: 0,
      hiresCount: 0,
      conversionRate: 5.0,
    },
    
    pipeline: {
      applied: 38,
      screening: 4,
      technical: 0,
      manager: 0,
      hr: 0,
      offer: 0,
      hired: 0,
      totalActive: 42
    },
    
    publishingHistory: [
      { id: "ph6", status: "PUBLISHED", timestamp: "2023-08-01T10:00:00Z", changedBy: "Michael Rodriguez" }
    ],
    
    health: {
      status: "AGING",
      reasons: ["Open for > 180 days", "Low conversion to interview"]
    },
    
    createdAt: "2023-07-20T09:00:00Z",
    updatedAt: "2023-08-01T10:00:00Z"
  }
];
