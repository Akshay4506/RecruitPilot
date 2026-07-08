import { PipelineBoard, PipelineCandidate } from "../types";

export const mockCandidates: PipelineCandidate[] = [
  {
    id: "cand-1",
    name: "Alex Rivera",
    avatarUrl: "https://i.pravatar.cc/150?u=alex",
    role: "Senior Frontend Engineer",
    jobId: "job-1",
    matchScore: 92,
    priority: "HIGH",
    risk: "LOW",
    stage: "TECHNICAL",
    skills: ["React", "TypeScript", "Next.js"],
    experienceYears: 6,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    assignedRecruiter: { id: "rec-1", name: "Sarah Chen", avatarUrl: "https://i.pravatar.cc/150?u=sarah" }
  },
  {
    id: "cand-2",
    name: "Jamie Lin",
    avatarUrl: "https://i.pravatar.cc/150?u=jamie",
    role: "Backend Engineer",
    jobId: "job-2",
    matchScore: 96,
    priority: "CRITICAL",
    risk: "LOW",
    stage: "MANAGER",
    skills: ["Java", "Spring Boot", "AWS"],
    experienceYears: 8,
    lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    assignedRecruiter: { id: "rec-1", name: "Sarah Chen", avatarUrl: "https://i.pravatar.cc/150?u=sarah" }
  },
  {
    id: "cand-3",
    name: "Taylor Smith",
    avatarUrl: "https://i.pravatar.cc/150?u=taylor",
    role: "Fullstack Engineer",
    jobId: "job-1",
    matchScore: 85,
    priority: "MEDIUM",
    risk: "MEDIUM",
    stage: "APPLIED",
    skills: ["React", "Node.js", "MongoDB"],
    experienceYears: 3,
    lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "cand-4",
    name: "Jordan Lee",
    avatarUrl: "https://i.pravatar.cc/150?u=jordan",
    role: "DevOps Engineer",
    jobId: "job-3",
    matchScore: 88,
    priority: "MEDIUM",
    risk: "LOW",
    stage: "SCREENING",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    experienceYears: 5,
    lastActivity: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    assignedRecruiter: { id: "rec-2", name: "Michael Ross" }
  },
  {
    id: "cand-5",
    name: "Casey Patel",
    avatarUrl: "https://i.pravatar.cc/150?u=casey",
    role: "Frontend Engineer",
    jobId: "job-1",
    matchScore: 75,
    priority: "LOW",
    risk: "HIGH",
    stage: "ASSESSMENT",
    skills: ["Vue", "JavaScript", "CSS"],
    experienceYears: 2,
    lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "cand-6",
    name: "Morgan Davis",
    role: "Engineering Manager",
    jobId: "job-4",
    matchScore: 98,
    priority: "CRITICAL",
    risk: "LOW",
    stage: "OFFER",
    skills: ["Leadership", "System Design", "Agile"],
    experienceYears: 12,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    assignedRecruiter: { id: "rec-1", name: "Sarah Chen", avatarUrl: "https://i.pravatar.cc/150?u=sarah" }
  }
];

export const mockPipelines: PipelineBoard[] = [
  {
    id: "board-engineering",
    name: "Engineering Hiring",
    department: "Engineering",
    metrics: {
      velocity: 14,
      conversionPercent: 12,
      timeToHireDays: 28,
      interviewRatePercent: 45,
      offerRatePercent: 20
    },
    columns: [
      { id: "APPLIED", title: "Applied", health: "ACTIVE", averageDays: 2 },
      { id: "SCREENING", title: "Screening", health: "WARNING", capacity: 10, averageDays: 4 },
      { id: "ASSESSMENT", title: "Assessment", health: "ACTIVE", averageDays: 5 },
      { id: "TECHNICAL", title: "Technical Round", health: "CRITICAL", averageDays: 8 },
      { id: "MANAGER", title: "Manager Round", health: "ACTIVE", averageDays: 4 },
      { id: "HR", title: "HR Round", health: "ACTIVE", averageDays: 2 },
      { id: "OFFER", title: "Offer", health: "ACTIVE", averageDays: 3 },
      { id: "HIRED", title: "Hired", health: "ACTIVE" }
    ],
    candidates: mockCandidates
  },
  {
    id: "board-design",
    name: "Design & Product",
    department: "Design",
    metrics: {
      velocity: 8,
      conversionPercent: 8,
      timeToHireDays: 35,
      interviewRatePercent: 30,
      offerRatePercent: 15
    },
    columns: [
      { id: "APPLIED", title: "Applied", health: "ACTIVE" },
      { id: "PORTFOLIO", title: "Portfolio Review", health: "WARNING" },
      { id: "SCREENING", title: "Screening", health: "ACTIVE" },
      { id: "DESIGN_CHALLENGE", title: "Design Challenge", health: "ACTIVE" },
      { id: "TEAM_INTERVIEW", title: "Team Interview", health: "ACTIVE" },
      { id: "OFFER", title: "Offer", health: "ACTIVE" },
      { id: "HIRED", title: "Hired", health: "ACTIVE" }
    ],
    candidates: []
  }
];
