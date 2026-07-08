import { Application } from "../types";

export const mockApplications: Application[] = [
  {
    id: "app-1",
    candidate: {
      id: "cand-1",
      name: "Alex Rivera",
      email: "alex.r@example.com",
      phone: "+1 (555) 123-4567",
      avatarUrl: "https://i.pravatar.cc/150?u=alex",
      location: "San Francisco, CA",
      experienceYears: 6,
      education: "B.S. Computer Science, UC Berkeley",
      skills: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS"],
      projects: [
        { name: "E-Commerce Platform", description: "Built a high-performance e-commerce frontend using Next.js and Tailwind.", url: "https://github.com/alexr/ecommerce" }
      ],
      resumeUrl: "#",
      resumeVersion: "v1.2",
      portfolioUrl: "https://alexrivera.dev",
      githubUrl: "https://github.com/alexr",
      linkedinUrl: "https://linkedin.com/in/alexrivera",
      availability: "2 weeks",
      currentSalary: "$130,000",
      expectedSalary: "$150,000",
      noticePeriod: "2 weeks",
    },
    job: {
      id: "job-1",
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      workMode: "Hybrid"
    },
    status: "NEW",
    stage: "Screening",
    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "HIGH",
    matchScore: 92,
    screeningAnswers: [
      { id: "sa-1", question: "Why are you interested in this role?", answer: "I love building scalable React applications and your tech stack aligns perfectly with my background.", score: 90, flags: ["Strong fit"] },
      { id: "sa-2", question: "Describe your experience with Next.js", answer: "I've used Next.js for the last 3 years, building enterprise platforms with App Router.", score: 95 }
    ],
    timeline: [
      { id: "tl-1", type: "SYSTEM_LOG", title: "Application Submitted", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "CANDIDATE", name: "Alex Rivera" } },
      { id: "tl-2", type: "AI_INSIGHT", title: "AI Match Score Generated", description: "Candidate matched 92% based on required skills.", timestamp: new Date(Date.now() - 1.9 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "AI" } }
    ],
    notes: [],
    tags: [
      { id: "t-1", label: "Strong React", color: "blue" },
      { id: "t-2", label: "Local", color: "green" }
    ],
    assignment: {
      recruiter: { id: "u-1", name: "Sarah Chen", avatarUrl: "https://i.pravatar.cc/150?u=sarah" }
    },
    health: {
      lastActivityAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      daysInStage: 2,
      totalAgeDays: 2,
      responseTimeHours: 0,
      riskLevel: "LOW",
      riskFactors: [],
      expectedNextStage: "Recruiter Screen"
    },
    recommendation: {
      overallMatchScore: 92,
      technicalMatchScore: 95,
      cultureMatchScore: 88,
      strengths: ["Deep Next.js experience", "Strong portfolio", "Local candidate"],
      weaknesses: ["No backend experience listed"],
      missingSkills: ["GraphQL"],
      recommendedNextAction: "Schedule Recruiter Screen",
      confidence: "HIGH"
    },
    interviews: [],
    analytics: {
      views: 3,
      resumeDownloads: 1,
      emailsSent: 0,
      timeToReview: 24
    }
  },
  {
    id: "app-2",
    candidate: {
      id: "cand-2",
      name: "Jamie Lin",
      email: "jamie.l@example.com",
      phone: "+1 (555) 987-6543",
      avatarUrl: "https://i.pravatar.cc/150?u=jamie",
      location: "New York, NY",
      experienceYears: 8,
      education: "M.S. Software Engineering, NYU",
      skills: ["Java", "Spring Boot", "Microservices", "AWS", "Kubernetes"],
      projects: [],
      resumeUrl: "#",
      resumeVersion: "v1.0",
      githubUrl: "https://github.com/jamiel",
      linkedinUrl: "https://linkedin.com/in/jamielin",
      availability: "4 weeks",
      currentSalary: "$160,000",
      expectedSalary: "$180,000",
      noticePeriod: "4 weeks",
    },
    job: {
      id: "job-2",
      title: "Backend Engineer",
      department: "Engineering",
      location: "New York, NY",
      workMode: "On-site"
    },
    status: "INTERVIEW_SCHEDULED",
    stage: "Technical Interview",
    appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "CRITICAL",
    matchScore: 96,
    screeningAnswers: [],
    timeline: [
      { id: "tl-3", type: "SYSTEM_LOG", title: "Application Submitted", timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "CANDIDATE", name: "Jamie Lin" } },
      { id: "tl-4", type: "STAGE_CHANGE", title: "Moved to Technical Interview", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "RECRUITER", name: "Sarah Chen" } },
      { id: "tl-5", type: "INTERVIEW_SCHEDULED", title: "Technical Interview Scheduled", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "SYSTEM" } }
    ],
    notes: [
      {
        id: "n-1",
        author: { id: "u-1", name: "Sarah Chen", role: "Recruiter" },
        content: "Passed the initial phone screen with flying colors. Strong system design background.",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        visibility: "SHARED"
      }
    ],
    tags: [
      { id: "t-3", label: "Top Tier", color: "purple" },
      { id: "t-4", label: "AWS Certified", color: "orange" }
    ],
    assignment: {
      recruiter: { id: "u-1", name: "Sarah Chen", avatarUrl: "https://i.pravatar.cc/150?u=sarah" },
      hiringManager: { id: "u-2", name: "Michael Rodriguez" }
    },
    health: {
      lastActivityAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      daysInStage: 2,
      totalAgeDays: 10,
      responseTimeHours: 12,
      riskLevel: "LOW",
      riskFactors: [],
      expectedNextStage: "Culture Fit"
    },
    recommendation: {
      overallMatchScore: 96,
      technicalMatchScore: 98,
      cultureMatchScore: 92,
      strengths: ["Extensive distributed systems experience", "AWS Architecture", "Leadership"],
      weaknesses: [],
      missingSkills: [],
      recommendedNextAction: "Conduct Technical Interview",
      confidence: "HIGH"
    },
    interviews: [
      { id: "int-1", title: "Technical Interview", date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), interviewer: "Michael Rodriguez", overallScore: 0, feedback: "", status: "SCHEDULED" }
    ],
    analytics: {
      views: 12,
      resumeDownloads: 4,
      emailsSent: 3,
      timeToReview: 4
    }
  },
  {
    id: "app-3",
    candidate: {
      id: "cand-3",
      name: "Sam Taylor",
      email: "sam.t@example.com",
      phone: "+1 (555) 444-5555",
      avatarUrl: "https://i.pravatar.cc/150?u=sam",
      location: "Austin, TX",
      experienceYears: 3,
      education: "Bootcamp Graduate",
      skills: ["Figma", "UI/UX", "CSS", "HTML"],
      projects: [],
      resumeUrl: "#",
      resumeVersion: "v1.0",
      portfolioUrl: "https://samtaylor.design",
    },
    job: {
      id: "job-3",
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      workMode: "Remote"
    },
    status: "REJECTED",
    stage: "Portfolio Review",
    appliedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), 
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "LOW",
    matchScore: 65,
    screeningAnswers: [],
    timeline: [
      { id: "tl-6", type: "SYSTEM_LOG", title: "Application Submitted", timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "CANDIDATE", name: "Sam Taylor" } },
      { id: "tl-7", type: "STATUS_CHANGE", title: "Application Rejected", timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "RECRUITER", name: "Sarah Chen" } },
    ],
    notes: [
      {
        id: "n-2",
        author: { id: "u-1", name: "Sarah Chen", role: "Recruiter" },
        content: "Portfolio lacks enterprise web application examples. Passed on for now.",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        visibility: "PRIVATE"
      }
    ],
    tags: [
      { id: "t-5", label: "Junior", color: "slate" }
    ],
    assignment: {
      recruiter: { id: "u-1", name: "Sarah Chen" }
    },
    health: {
      lastActivityAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      daysInStage: 10,
      totalAgeDays: 15,
      riskLevel: "HIGH",
      riskFactors: ["Rejected"],
    },
    recommendation: {
      overallMatchScore: 65,
      technicalMatchScore: 60,
      cultureMatchScore: 80,
      strengths: ["Good visual design"],
      weaknesses: ["Lacks enterprise experience", "Junior level"],
      missingSkills: ["Prototyping", "User Research"],
      recommendedNextAction: "Reject",
      confidence: "HIGH"
    },
    interviews: [],
    analytics: {
      views: 2,
      resumeDownloads: 1,
      emailsSent: 1,
      timeToReview: 240
    }
  }
];
