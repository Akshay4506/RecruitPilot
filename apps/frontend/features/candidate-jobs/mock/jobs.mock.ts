import { Job, CompanyInfo, HiringTeamMember } from "../types";
import { subDays, addDays } from "date-fns";

const now = new Date();

export const mockCompanyTechNova: CompanyInfo = {
  id: "comp-1",
  name: "TechNova Systems",
  industry: "Enterprise Software",
  size: "1000-5000",
  website: "https://technova.example.com",
  headquarters: "San Francisco, CA",
  about: "TechNova Systems is a leading provider of cloud-based enterprise solutions. We build scalable, secure, and innovative software that empowers businesses to thrive in the digital age.",
  hiringInsights: {
    averageResponseTimeDays: 3,
    hiringVelocity: "FAST",
    interviewDifficulty: "MEDIUM",
    candidatesApplied: 214
  }
};

export const mockCompanyAcme: CompanyInfo = {
  id: "comp-2",
  name: "Acme Analytics",
  industry: "Data & AI",
  size: "50-200",
  website: "https://acme.example.com",
  headquarters: "New York, NY",
  about: "Acme Analytics transforms raw data into actionable insights. Our AI-driven platform helps retail and finance sectors predict market trends with unprecedented accuracy.",
  hiringInsights: {
    averageResponseTimeDays: 5,
    hiringVelocity: "MEDIUM",
    interviewDifficulty: "HARD",
    candidatesApplied: 85
  }
};

export const mockHiringTeam: HiringTeamMember[] = [
  { id: "ht-1", name: "Sarah Chen", role: "Engineering Manager" },
  { id: "ht-2", name: "Marcus Johnson", role: "Senior Recruiter" },
  { id: "ht-3", name: "Elena Rodriguez", role: "Staff Engineer" }
];

export const mockJobs: Job[] = [
  {
    id: "job-101",
    slug: "senior-frontend-engineer-technova",
    title: "Senior Frontend Engineer (React/Next.js)",
    company: mockCompanyTechNova,
    department: "Engineering",
    team: "Core Platform",
    summary: "Join our Core Platform team to architect and build the next generation of our enterprise dashboard. You'll lead UI initiatives, mentor junior developers, and drive our migration to Next.js App Router.",
    
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
      min: 150000,
      max: 190000,
      currency: "USD",
      interval: "YEARLY",
      hideSalary: false
    },
    
    benefits: [
      "100% remote work globally",
      "Unlimited PTO (Minimum 20 days required)",
      "Comprehensive health/dental/vision coverage",
      "$2,000 annual learning stipend",
      "Home office setup budget"
    ],
    
    requirements: [
      "5+ years of experience building complex web applications",
      "Deep expertise in React, TypeScript, and modern state management",
      "Experience with Next.js (SSR, SSG, App Router)",
      "Strong understanding of web accessibility (WCAG) and performance optimization"
    ],
    
    responsibilities: [
      "Architect and implement scalable frontend solutions",
      "Collaborate with UX designers to deliver pixel-perfect interfaces",
      "Establish and enforce frontend coding standards",
      "Mentor mid-level and junior engineers"
    ],
    
    skills: [
      { name: "React", type: "MANDATORY" },
      { name: "TypeScript", type: "MANDATORY" },
      { name: "Next.js", type: "MANDATORY" },
      { name: "Tailwind CSS", type: "PREFERRED" },
      { name: "GraphQL", type: "PREFERRED" }
    ],
    
    technologies: ["React", "TypeScript", "Next.js", "Framer Motion", "Jest", "Cypress"],
    
    hiringTeam: mockHiringTeam,
    
    publishedAt: subDays(now, 2).toISOString(),
    closingDate: addDays(now, 30).toISOString(),
    
    analytics: {
      viewsCount: 1245,
      applicationsCount: 89,
      savesCount: 340
    },
    
    searchMetadata: {
      matchScore: 92,
      matchedSkills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      missingSkills: ["GraphQL"],
      experienceMatch: true,
      educationMatch: true
    },
    
    isApplied: false,
    createdAt: subDays(now, 2).toISOString(),
    updatedAt: now.toISOString()
  },
  {
    id: "job-102",
    slug: "data-visualization-engineer-acme",
    title: "Data Visualization Engineer",
    company: mockCompanyAcme,
    department: "Data Engineering",
    summary: "Build interactive, high-performance data visualizations that help our clients understand massive datasets. You'll work heavily with D3.js, WebGL, and React.",
    
    employmentType: "FULL_TIME",
    workMode: "HYBRID",
    status: "PUBLISHED",
    visibility: "PUBLIC",
    experienceLevel: "MID",
    
    location: {
      city: "New York",
      state: "NY",
      country: "USA",
      isRemote: false
    },
    office: "Manhattan HQ (3 days/week)",
    
    salary: {
      min: 130000,
      max: 160000,
      currency: "USD",
      interval: "YEARLY",
      hideSalary: false
    },
    
    benefits: [
      "Competitive equity package",
      "Premium health insurance",
      "Catered lunches on office days",
      "Gym membership reimbursement"
    ],
    
    requirements: [
      "3+ years experience in frontend development",
      "Strong proficiency in D3.js and SVG manipulation",
      "Experience rendering large datasets (Canvas/WebGL)",
      "Solid React foundation"
    ],
    
    responsibilities: [
      "Design and build complex interactive charts and graphs",
      "Optimize rendering performance for large datasets",
      "Work closely with data scientists to translate models into visuals"
    ],
    
    skills: [
      { name: "React", type: "MANDATORY" },
      { name: "D3.js", type: "MANDATORY" },
      { name: "TypeScript", type: "MANDATORY" },
      { name: "WebGL", type: "PREFERRED" }
    ],
    
    technologies: ["React", "D3.js", "TypeScript", "Three.js", "Canvas API"],
    
    hiringTeam: [ mockHiringTeam[0] ], // Just Sarah
    
    publishedAt: subDays(now, 10).toISOString(),
    closingDate: addDays(now, 14).toISOString(),
    
    analytics: {
      viewsCount: 890,
      applicationsCount: 45,
      savesCount: 120
    },
    
    searchMetadata: {
      matchScore: 68,
      matchedSkills: ["React", "TypeScript"],
      missingSkills: ["D3.js", "WebGL"],
      experienceMatch: true,
      educationMatch: true
    },
    
    isApplied: false,
    createdAt: subDays(now, 10).toISOString(),
    updatedAt: now.toISOString()
  },
  {
    id: "job-103",
    slug: "staff-ui-engineer-technova",
    title: "Staff UI Engineer, Design Systems",
    company: mockCompanyTechNova,
    department: "Design",
    team: "Design Systems",
    summary: "Lead the technical implementation of our new multi-brand design system. You will bridge the gap between design and engineering, ensuring consistency across dozens of applications.",
    
    employmentType: "FULL_TIME",
    workMode: "REMOTE",
    status: "PUBLISHED",
    visibility: "PUBLIC",
    experienceLevel: "LEAD",
    
    location: {
      city: "Austin",
      state: "TX",
      country: "USA",
      isRemote: true
    },
    
    salary: {
      min: 180000,
      max: 230000,
      currency: "USD",
      interval: "YEARLY",
      hideSalary: false
    },
    
    benefits: [
      "100% remote work globally",
      "Unlimited PTO",
      "Comprehensive health/dental/vision coverage",
      "Annual retreat"
    ],
    
    requirements: [
      "8+ years of frontend experience",
      "Proven track record of building and maintaining enterprise design systems",
      "Expert-level CSS/SASS and CSS-in-JS knowledge",
      "Experience with Storybook and accessibility testing"
    ],
    
    responsibilities: [
      "Architect the core component library",
      "Define design tokens architecture",
      "Support product teams adopting the system",
      "Advocate for accessibility best practices"
    ],
    
    skills: [
      { name: "React", type: "MANDATORY" },
      { name: "Design Systems", type: "MANDATORY" },
      { name: "TypeScript", type: "MANDATORY" },
      { name: "Storybook", type: "MANDATORY" },
      { name: "Figma", type: "PREFERRED" }
    ],
    
    technologies: ["React", "TypeScript", "Storybook", "Tailwind CSS", "Radix UI"],
    
    hiringTeam: mockHiringTeam,
    
    publishedAt: subDays(now, 1).toISOString(),
    
    analytics: {
      viewsCount: 450,
      applicationsCount: 12,
      savesCount: 89
    },
    
    searchMetadata: {
      matchScore: 85,
      matchedSkills: ["React", "TypeScript", "Tailwind CSS"],
      missingSkills: ["Storybook", "Design Systems"],
      experienceMatch: false, // Maybe candidate is Mid/Senior, this is Lead
      educationMatch: true
    },
    
    isApplied: true,
    createdAt: subDays(now, 1).toISOString(),
    updatedAt: now.toISOString()
  }
];

export const mockSavedJobs = mockJobs.filter(j => j.isSaved);
export const mockAppliedJobs = mockJobs.filter(j => j.isApplied);
export const mockRecommendedJobs = mockJobs.slice(0, 2);
export const mockRecentlyViewed = mockJobs;
