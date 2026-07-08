import { Interview, DashboardMetrics, Scorecard, InterviewTemplate } from "../types";
import { addHours, subDays, subHours } from "date-fns";

const now = new Date();

export const mockDashboardMetrics: DashboardMetrics = {
  averageDurationMins: 45,
  feedbackCompletionPercent: 82,
  panelUtilizationPercent: 65,
  timeToDecisionDays: 3.5,
  upcomingCount: 12,
  completedCount: 45
};

export const mockInterviews: Interview[] = [
  {
    id: "int-1",
    candidate: {
      id: "cand-1",
      name: "Jamie Lin",
      jobId: "job-1",
      jobTitle: "Senior Backend Engineer"
    },
    type: "SYSTEM_DESIGN",
    status: "SCHEDULED",
    round: 3,
    totalRounds: 4,
    scheduledAt: addHours(now, 2).toISOString(),
    durationMinutes: 60,
    timezone: "America/Los_Angeles",
    panel: [
      { id: "user-1", name: "Alex Rivera", role: "LEAD", department: "Engineering", title: "Engineering Manager" },
      { id: "user-2", name: "Taylor Swift", role: "OBSERVER", department: "Engineering", title: "Senior Engineer" }
    ],
    meetingDetails: {
      platform: "GOOGLE_MEET",
      url: "https://meet.google.com/abc-defg-hij"
    },
    createdAt: subDays(now, 2).toISOString(),
    updatedAt: subHours(now, 5).toISOString()
  },
  {
    id: "int-2",
    candidate: {
      id: "cand-2",
      name: "Morgan Davis",
      jobId: "job-2",
      jobTitle: "Frontend Developer"
    },
    type: "TECHNICAL",
    status: "PENDING_FEEDBACK",
    round: 2,
    totalRounds: 3,
    scheduledAt: subHours(now, 1).toISOString(),
    durationMinutes: 45,
    timezone: "America/New_York",
    panel: [
      { id: "user-3", name: "Jordan Lee", role: "LEAD", department: "Engineering", title: "Frontend Lead" }
    ],
    meetingDetails: {
      platform: "ZOOM",
      url: "https://zoom.us/j/123456789"
    },
    createdAt: subDays(now, 5).toISOString(),
    updatedAt: now.toISOString()
  },
  {
    id: "int-3",
    candidate: {
      id: "cand-3",
      name: "Sam Smith",
      jobId: "job-1",
      jobTitle: "Senior Backend Engineer"
    },
    type: "MANAGER",
    status: "NEEDS_DISCUSSION",
    round: 4,
    totalRounds: 4,
    scheduledAt: subDays(now, 1).toISOString(),
    durationMinutes: 60,
    timezone: "America/Chicago",
    panel: [
      { id: "user-4", name: "Chris Evans", role: "LEAD", department: "Engineering", title: "VP of Engineering" }
    ],
    createdAt: subDays(now, 10).toISOString(),
    updatedAt: subDays(now, 1).toISOString()
  }
];

export const mockScorecards: Scorecard[] = [
  {
    id: "score-1",
    interviewId: "int-2",
    panelMemberId: "user-3",
    status: "SUBMITTED",
    competencies: [
      { competencyId: "comp-1", name: "React Knowledge", weight: 1.5, score: 4, evidence: "Strong understanding of hooks." },
      { competencyId: "comp-2", name: "CSS/Styling", weight: 1.0, score: 3, evidence: "Good, but missed some modern CSS Grid features." }
    ],
    questions: [
      { questionId: "q-1", competencyId: "comp-1", question: "Explain useEffect", notes: "Answered perfectly.", rating: 5 }
    ],
    recommendation: "LEAN_HIRE",
    overallComments: "Good technical skills, a bit hesitant on styling architecture.",
    submittedAt: subHours(now, 0.5).toISOString()
  }
];

export const mockTemplates: InterviewTemplate[] = [
  {
    id: "tpl-1",
    name: "Standard Backend Technical",
    type: "TECHNICAL",
    description: "60-minute deep dive into algorithms and data structures.",
    durationMinutes: 60,
    competencies: [
      { id: "comp-ds", name: "Data Structures", weight: 1.5 },
      { id: "comp-alg", name: "Algorithms", weight: 1.5 },
      { id: "comp-comms", name: "Communication", weight: 1.0 }
    ],
    defaultQuestions: [
      { id: "q-1", competencyId: "comp-ds", question: "How would you design a rate limiter?" },
      { id: "q-2", competencyId: "comp-alg", question: "Implement a thread-safe cache." }
    ]
  },
  {
    id: "tpl-2",
    name: "Frontend UI Build",
    type: "TECHNICAL",
    description: "45-minute practical pairing session.",
    durationMinutes: 45,
    competencies: [
      { id: "comp-react", name: "React Ecosystem", weight: 2.0 },
      { id: "comp-css", name: "CSS Architecture", weight: 1.0 }
    ],
    defaultQuestions: []
  }
];
