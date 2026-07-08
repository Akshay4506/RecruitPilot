export type CandidateStatus = "ACTIVE" | "PASSIVE" | "INTERVIEWING" | "OFFERED" | "HIRED" | "REJECTED" | "ARCHIVED";

export interface CandidateExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface CandidateEducation {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  fieldOfStudy: string;
}

export interface CandidateProject {
  id: string;
  name: string;
  description: string;
  url?: string;
  technologies: string[];
}

export interface CandidateSkill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience: number;
}

export interface CandidateApplicationSummary {
  id: string;
  jobId: string;
  jobTitle: string;
  appliedAt: string;
  status: string;
  stage: string;
  matchScore: number;
}

export interface CandidateInterviewSummary {
  id: string;
  applicationId: string;
  jobTitle: string;
  title: string;
  date: string;
  interviewer: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  feedbackSubmitted: boolean;
}

export interface CandidateDocument {
  id: string;
  type: "RESUME" | "COVER_LETTER" | "PORTFOLIO" | "CERTIFICATE" | "OTHER";
  name: string;
  url: string;
  uploadedAt: string;
  version?: string;
}

export interface RecruiterNote {
  id: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
    role: string;
  };
  content: string;
  timestamp: string;
  visibility: "PRIVATE" | "SHARED" | "HIRING_MANAGER_ONLY";
  mentions?: string[];
  pinned?: boolean;
}

export interface CandidateTag {
  id: string;
  label: string;
  color?: string;
}

export interface CandidateAssignment {
  recruiter?: { id: string; name: string; avatarUrl?: string };
  hiringManager?: { id: string; name: string; avatarUrl?: string };
  coordinator?: { id: string; name: string; avatarUrl?: string };
}

export interface CandidateHealth {
  profileCompleteness: number;
  responseRate: number; // percentage
  interviewSuccessRate: number; // percentage
  resumeQualityScore: number; // 0-100
  overallHealth: "POOR" | "FAIR" | "GOOD" | "EXCELLENT";
}

export interface CandidateInsight {
  overallScore: number;
  topStrengths: string[];
  skillGaps: string[];
  jobMatchScore: number;
  cultureMatchScore: number;
  experienceMatchScore: number;
  careerGrowthPotential: "LOW" | "MEDIUM" | "HIGH";
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  riskFactors: string[];
  recommendation: string;
}

export interface UnifiedTimelineEvent {
  id: string;
  type: "APPLICATION_SUBMITTED" | "RESUME_UPDATED" | "INTERVIEW_SCHEDULED" | "INTERVIEW_RESCHEDULED" | "NOTE_ADDED" | "DOCUMENT_UPLOADED" | "OFFER_SENT" | "OFFER_ACCEPTED" | "STAGE_CHANGE" | "STATUS_CHANGE" | "EMAIL_SENT" | "AI_INSIGHT";
  title: string;
  description?: string;
  timestamp: string;
  actor: {
    type: "CANDIDATE" | "RECRUITER" | "SYSTEM" | "AI";
    name?: string;
    avatarUrl?: string;
  };
  metadata?: Record<string, string | number | boolean>;
}

export interface InternalRecruiterMetadata {
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  source: string;
  assignedRecruiterId?: string;
  createdBy: string;
  createdAt: string;
  lastContactAt: string;
  lastUpdatedAt: string;
}

export interface RecruiterCandidate {
  id: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatarUrl?: string;
    headline: string;
    summary: string;
    availability: string;
    noticePeriod: string;
    currentSalary?: string;
    expectedSalary?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
  };
  
  status: CandidateStatus;
  experienceYears: number;
  
  experience: CandidateExperience[];
  education: CandidateEducation[];
  projects: CandidateProject[];
  skills: CandidateSkill[];
  languages: string[];
  certifications: string[];

  applications: CandidateApplicationSummary[];
  interviews: CandidateInterviewSummary[];
  documents: CandidateDocument[];
  timeline: UnifiedTimelineEvent[];
  notes: RecruiterNote[];
  tags: CandidateTag[];
  
  assignment: CandidateAssignment;
  health: CandidateHealth;
  insights: CandidateInsight;
  metadata: InternalRecruiterMetadata;
}
