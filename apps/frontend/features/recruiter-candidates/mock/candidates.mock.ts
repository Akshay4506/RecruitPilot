import { RecruiterCandidate } from "../types";

export const mockCandidates: RecruiterCandidate[] = [
  {
    id: "cand-1",
    status: "ACTIVE",
    experienceYears: 6,
    personalInfo: {
      name: "Alex Rivera",
      email: "alex.r@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      avatarUrl: "https://i.pravatar.cc/150?u=alex",
      headline: "Senior Frontend Engineer | Next.js & React Specialist",
      summary: "Passionate frontend engineer with 6+ years of experience building scalable, high-performance web applications. Strong focus on UX, accessibility, and modern React architectures.",
      availability: "Available to start in 2 weeks",
      noticePeriod: "2 weeks",
      currentSalary: "$130,000",
      expectedSalary: "$150,000",
      linkedinUrl: "https://linkedin.com/in/alexrivera",
      githubUrl: "https://github.com/alexr",
      portfolioUrl: "https://alexrivera.dev",
    },
    experience: [
      {
        id: "exp-1",
        title: "Senior Frontend Engineer",
        company: "TechFlow Inc.",
        location: "San Francisco, CA",
        startDate: "2021-03-01",
        current: true,
        description: "Lead the frontend architecture migration to Next.js App Router. Improved core web vitals by 40% and mentored a team of 4 junior developers."
      },
      {
        id: "exp-2",
        title: "Frontend Developer",
        company: "WebSolutions LLC",
        location: "Austin, TX",
        startDate: "2018-06-01",
        endDate: "2021-02-28",
        current: false,
        description: "Built responsive e-commerce dashboards using React and Redux. Integrated complex payment gateways."
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "B.S. Computer Science",
        institution: "UC Berkeley",
        location: "Berkeley, CA",
        startDate: "2014-08-01",
        endDate: "2018-05-01",
        current: false,
        fieldOfStudy: "Computer Science"
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "E-Commerce Platform Redesign",
        description: "A complete rewrite of the client-facing store using Next.js and Tailwind CSS.",
        url: "https://github.com/alexr/ecommerce",
        technologies: ["Next.js", "React", "Tailwind", "TypeScript"]
      }
    ],
    skills: [
      { id: "sk-1", name: "React", level: "Expert", yearsOfExperience: 5 },
      { id: "sk-2", name: "TypeScript", level: "Expert", yearsOfExperience: 4 },
      { id: "sk-3", name: "Next.js", level: "Advanced", yearsOfExperience: 3 },
      { id: "sk-4", name: "Tailwind CSS", level: "Advanced", yearsOfExperience: 3 },
    ],
    languages: ["English (Native)", "Spanish (Conversational)"],
    certifications: ["AWS Certified Cloud Practitioner"],
    applications: [
      {
        id: "app-1",
        jobId: "job-1",
        jobTitle: "Senior Frontend Engineer",
        appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: "NEW",
        stage: "Screening",
        matchScore: 92
      }
    ],
    interviews: [],
    documents: [
      {
        id: "doc-1",
        type: "RESUME",
        name: "Alex_Rivera_Resume.pdf",
        url: "#",
        uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        version: "v1.2"
      }
    ],
    timeline: [
      { id: "tl-1", type: "APPLICATION_SUBMITTED", title: "Applied to Senior Frontend Engineer", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "CANDIDATE", name: "Alex Rivera" } },
      { id: "tl-2", type: "DOCUMENT_UPLOADED", title: "Uploaded Resume v1.2", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "CANDIDATE", name: "Alex Rivera" } },
      { id: "tl-3", type: "AI_INSIGHT", title: "AI Generated Profile Match", description: "Candidate scored 92% match based on key technologies.", timestamp: new Date(Date.now() - 1.9 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "AI" } }
    ],
    notes: [
      {
        id: "n-1",
        author: { id: "u-1", name: "Sarah Chen", role: "Recruiter" },
        content: "Looks like a great fit for the frontend role. We should schedule a quick intro call.",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        visibility: "SHARED",
        pinned: true
      }
    ],
    tags: [
      { id: "t-1", label: "Strong React", color: "blue" },
      { id: "t-2", label: "Local", color: "green" }
    ],
    assignment: {
      recruiter: { id: "u-1", name: "Sarah Chen", avatarUrl: "https://i.pravatar.cc/150?u=sarah" }
    },
    health: {
      profileCompleteness: 95,
      responseRate: 100,
      interviewSuccessRate: 0,
      resumeQualityScore: 92,
      overallHealth: "EXCELLENT"
    },
    insights: {
      overallScore: 92,
      topStrengths: ["Deep Next.js experience", "Strong portfolio", "Local candidate"],
      skillGaps: ["GraphQL"],
      jobMatchScore: 95,
      cultureMatchScore: 88,
      experienceMatchScore: 90,
      careerGrowthPotential: "HIGH",
      riskLevel: "LOW",
      riskFactors: [],
      recommendation: "Proceed to Recruiter Screen immediately."
    },
    metadata: {
      priority: "HIGH",
      source: "Careers Page",
      assignedRecruiterId: "u-1",
      createdBy: "System",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      lastContactAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: "cand-2",
    status: "INTERVIEWING",
    experienceYears: 8,
    personalInfo: {
      name: "Jamie Lin",
      email: "jamie.l@example.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      avatarUrl: "https://i.pravatar.cc/150?u=jamie",
      headline: "Backend Engineer | Distributed Systems",
      summary: "Experienced backend engineer focused on microservices and high-throughput systems using Java and AWS.",
      availability: "4 weeks notice",
      noticePeriod: "4 weeks",
      currentSalary: "$160,000",
      expectedSalary: "$180,000",
      linkedinUrl: "https://linkedin.com/in/jamielin",
      githubUrl: "https://github.com/jamiel",
    },
    experience: [
      {
        id: "exp-3",
        title: "Backend Engineer",
        company: "FinTech Global",
        location: "New York, NY",
        startDate: "2019-01-01",
        current: true,
        description: "Designed and implemented microservices handling millions of transactions daily."
      }
    ],
    education: [
      {
        id: "edu-2",
        degree: "M.S. Software Engineering",
        institution: "NYU",
        location: "New York, NY",
        startDate: "2013-08-01",
        endDate: "2015-05-01",
        current: false,
        fieldOfStudy: "Software Engineering"
      }
    ],
    projects: [],
    skills: [
      { id: "sk-5", name: "Java", level: "Expert", yearsOfExperience: 8 },
      { id: "sk-6", name: "Spring Boot", level: "Advanced", yearsOfExperience: 5 },
      { id: "sk-7", name: "AWS", level: "Advanced", yearsOfExperience: 4 },
      { id: "sk-8", name: "Kubernetes", level: "Intermediate", yearsOfExperience: 2 },
    ],
    languages: ["English (Native)"],
    certifications: ["AWS Certified Solutions Architect"],
    applications: [
      {
        id: "app-2",
        jobId: "job-2",
        jobTitle: "Backend Engineer",
        appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        status: "INTERVIEW_SCHEDULED",
        stage: "Technical Interview",
        matchScore: 96
      }
    ],
    interviews: [
      {
        id: "int-1",
        applicationId: "app-2",
        jobTitle: "Backend Engineer",
        title: "Technical Interview",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        interviewer: "Michael Rodriguez",
        status: "SCHEDULED",
        feedbackSubmitted: false
      }
    ],
    documents: [
      {
        id: "doc-2",
        type: "RESUME",
        name: "Jamie_Lin_Resume.pdf",
        url: "#",
        uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        version: "v1.0"
      }
    ],
    timeline: [
      { id: "tl-4", type: "APPLICATION_SUBMITTED", title: "Applied to Backend Engineer", timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "CANDIDATE", name: "Jamie Lin" } },
      { id: "tl-5", type: "STAGE_CHANGE", title: "Moved to Technical Interview", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "RECRUITER", name: "Sarah Chen" } },
      { id: "tl-6", type: "INTERVIEW_SCHEDULED", title: "Technical Interview Scheduled", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), actor: { type: "SYSTEM" } }
    ],
    notes: [
      {
        id: "n-2",
        author: { id: "u-1", name: "Sarah Chen", role: "Recruiter" },
        content: "Passed the initial phone screen. Strong system design background.",
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
      profileCompleteness: 85,
      responseRate: 90,
      interviewSuccessRate: 100,
      resumeQualityScore: 88,
      overallHealth: "GOOD"
    },
    insights: {
      overallScore: 96,
      topStrengths: ["Extensive distributed systems experience", "AWS Architecture", "Leadership"],
      skillGaps: [],
      jobMatchScore: 98,
      cultureMatchScore: 92,
      experienceMatchScore: 95,
      careerGrowthPotential: "HIGH",
      riskLevel: "LOW",
      riskFactors: [],
      recommendation: "Strong hire potential."
    },
    metadata: {
      priority: "CRITICAL",
      source: "LinkedIn Sourcing",
      assignedRecruiterId: "u-1",
      createdBy: "Sarah Chen",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      lastContactAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      lastUpdatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  }
];
