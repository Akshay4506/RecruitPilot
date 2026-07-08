import { CandidateProfile } from "../types";

export const mockCandidateProfile: CandidateProfile = {
  id: "cand_123",
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  userId: "user_123",
  firstName: "Alex",
  lastName: "Chen",
  fullName: "Alex Chen",
  email: "alex.chen@example.com",
  phone: "+1 (555) 123-4567",
  avatarUrl: "https://i.pravatar.cc/150?u=alex",
  headline: "Senior Frontend Engineer | React & Next.js Expert",
  summary: "Passionate about building accessible, performant, and delightful web experiences. 6+ years of experience in modern JavaScript ecosystems.",
  status: "ACTIVE",
  resumeUrl: "https://example.com/resume.pdf",
  linkedinUrl: "https://linkedin.com/in/alexc",
  portfolioUrl: "https://alexchen.dev",
  location: "San Francisco, CA",
  isOpenToRelocation: false,
  expectedSalary: 140000,
  expectedSalaryCurrency: "USD",
  healthScore: 85,
  profileCompletion: 90,
  experience: [
    {
      id: "exp_1",
      company: "TechNova",
      title: "Senior Frontend Engineer",
      startDate: "2021-03-01",
      isCurrent: true,
      description: "Led the frontend architecture migration to Next.js App Router.",
      achievements: [
        "Reduced initial load time by 45% utilizing server components.",
        "Mentored 4 junior developers to full-stack proficiency."
      ],
      responsibilities: [
        "Architect scalable front-end solutions.",
        "Collaborate with product and design teams."
      ],
      skillsUsed: ["Leadership", "System Design", "Agile"],
      technologiesUsed: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "exp_2",
      company: "WebSolutions Inc",
      title: "Frontend Developer",
      startDate: "2018-06-01",
      endDate: "2021-02-28",
      isCurrent: false,
      description: "Developed and maintained multiple client-facing applications.",
      achievements: [
        "Delivered 12+ projects on time and under budget."
      ],
      responsibilities: [
        "Implement responsive UI components.",
        "Integrate RESTful APIs."
      ],
      skillsUsed: ["Communication", "Problem Solving"],
      technologiesUsed: ["React", "JavaScript", "SASS", "Redux"],
    },
  ],
  education: [
    {
      id: "edu_1",
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2014-09-01",
      endDate: "2018-05-30",
      gpa: 3.8,
      achievements: ["Dean's List 2016-2018"],
      activities: ["Computer Science Club President"],
    }
  ],
  skills: [
    {
      id: "sk_1",
      name: "Frontend Architecture",
      type: "PRIMARY",
      proficiency: "EXPERT",
      yearsOfExperience: 6,
      isVerified: true,
    },
    {
      id: "sk_2",
      name: "UI/UX Design",
      type: "SECONDARY",
      proficiency: "INTERMEDIATE",
      yearsOfExperience: 3,
      isVerified: false,
    },
    {
      id: "sk_3",
      name: "Team Leadership",
      type: "PRIMARY",
      proficiency: "ADVANCED",
      yearsOfExperience: 4,
      isVerified: true,
    },
  ],
  projects: [
    {
      id: "proj_1",
      title: "RecruitPilot Frontend",
      description: "An enterprise AI recruitment platform built with modern web technologies.",
      role: "Lead Frontend Engineer",
      startDate: "2023-01-15",
      isCurrent: true,
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/alexchen/recruitpilot",
      liveUrl: "https://recruitpilot.app",
    },
    {
      id: "proj_2",
      title: "Open Source Component Library",
      description: "A highly accessible component library for React applications.",
      role: "Maintainer",
      startDate: "2020-05-01",
      endDate: "2022-12-31",
      isCurrent: false,
      technologies: ["React", "Radix UI", "Storybook"],
      githubUrl: "https://github.com/alexchen/ui-lib",
    }
  ],
  certifications: [
    {
      id: "cert_1",
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      issueDate: "2022-08-15",
      expiryDate: "2025-08-15",
      credentialId: "AWS-DEV-12345",
      credentialUrl: "https://aws.amazon.com/verification",
    }
  ],
  languages: [
    {
      id: "lang_1",
      name: "English",
      reading: "NATIVE",
      writing: "NATIVE",
      speaking: "NATIVE",
      isNative: true,
    },
    {
      id: "lang_2",
      name: "Spanish",
      reading: "PROFESSIONAL",
      writing: "FLUENT",
      speaking: "CONVERSATIONAL",
      isNative: false,
    }
  ],
  references: [
    {
      id: "ref_1",
      name: "Sarah Jenkins",
      company: "TechNova",
      title: "VP of Engineering",
      relationship: "Former Manager",
      email: "sarah.jenkins@technova.com",
      status: "VERIFIED",
    }
  ],
  technologies: [
    {
      id: "tech_1",
      name: "React",
      proficiency: "EXPERT",
      yearsOfExperience: 6,
      projectsUsedCount: 15,
      isVerified: true,
    },
    {
      id: "tech_2",
      name: "TypeScript",
      proficiency: "ADVANCED",
      yearsOfExperience: 5,
      projectsUsedCount: 10,
      isVerified: true,
    },
    {
      id: "tech_3",
      name: "Node.js",
      proficiency: "INTERMEDIATE",
      yearsOfExperience: 3,
      projectsUsedCount: 5,
      isVerified: false,
    }
  ],
  socialProfiles: [
    { network: "GitHub", url: "https://github.com/alexc", username: "alexc" },
    { network: "LinkedIn", url: "https://linkedin.com/in/alexc", username: "alexc" },
    { network: "Portfolio", url: "https://alexchen.dev" },
  ],
  preferences: {
    preferredRoles: ["Frontend Engineer", "Full Stack Engineer", "Engineering Manager"],
    preferredLocations: ["San Francisco, CA", "New York, NY", "Remote"],
    employmentTypes: ["FULL_TIME", "CONTRACT"],
    expectedSalary: { min: 140000, max: 180000, currency: "USD" },
    noticePeriod: "2 Weeks",
    remotePreference: "REMOTE",
    isOpenToRelocation: false,
    requiresVisaSponsorship: false,
  }
};
