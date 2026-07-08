import { User, UserMetrics, UserStatistics } from "../types";

export const mockUserMetrics: UserMetrics = {
  totalUsers: 1420,
  recruiters: 120,
  hiringManagers: 300,
  candidates: 1000,
  activeSessions: 42,
  pendingInvitations: 18
};

export const mockUserStatistics: UserStatistics = {
  newUsers30d: 84,
  invitedUsers: 18,
  lockedAccounts: 3,
  mfaEnabled: 1140,
  inactiveUsers30d: 45
};

export const mockUsers: User[] = [
  {
    id: "usr_101",
    email: "sarah.connor@acme.corp",
    employeeId: "EMP-0012",
    role: "ADMIN",
    status: "ACTIVE",
    profile: {
      firstName: "Sarah",
      lastName: "Connor",
      title: "VP of Talent",
      location: "San Francisco, CA",
      timezone: "America/Los_Angeles"
    },
    department: { id: "dept_hr", name: "Human Resources" },
    team: { id: "team_leadership", name: "HR Leadership" },
    security: {
      mfaEnabled: true,
      passwordChangedAt: "2026-06-15T10:00:00Z",
      lastLoginAt: "2026-07-08T08:30:00Z",
      accountState: "VERIFIED"
    },
    preferences: {
      theme: "SYSTEM",
      emailNotifications: true,
      slackNotifications: true
    },
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2026-07-08T08:30:00Z",
    workspaces: ["Global", "North America"]
  },
  {
    id: "usr_102",
    email: "john.smith@acme.corp",
    employeeId: "EMP-0145",
    role: "RECRUITER",
    status: "ACTIVE",
    profile: {
      firstName: "John",
      lastName: "Smith",
      title: "Senior Technical Recruiter",
      location: "Austin, TX",
      timezone: "America/Chicago"
    },
    department: { id: "dept_hr", name: "Human Resources" },
    team: { id: "team_tech", name: "Technical Recruiting" },
    security: {
      mfaEnabled: true,
      passwordChangedAt: "2026-05-20T14:22:00Z",
      lastLoginAt: "2026-07-07T16:45:00Z",
      accountState: "VERIFIED"
    },
    preferences: {
      theme: "DARK",
      emailNotifications: true,
      slackNotifications: false
    },
    createdAt: "2025-03-12T11:30:00Z",
    updatedAt: "2026-07-07T16:45:00Z",
    workspaces: ["North America"]
  },
  {
    id: "usr_103",
    email: "alex.rivera@acme.corp",
    employeeId: "EMP-0492",
    role: "HIRING_MANAGER",
    status: "ACTIVE",
    profile: {
      firstName: "Alex",
      lastName: "Rivera",
      title: "Engineering Manager",
      location: "New York, NY",
      timezone: "America/New_York"
    },
    department: { id: "dept_eng", name: "Engineering" },
    team: { id: "team_eng_frontend", name: "Frontend Platform" },
    security: {
      mfaEnabled: true,
      passwordChangedAt: "2025-11-05T09:15:00Z",
      lastLoginAt: "2026-07-08T09:05:00Z",
      accountState: "VERIFIED"
    },
    preferences: {
      theme: "LIGHT",
      emailNotifications: false,
      slackNotifications: true
    },
    createdAt: "2024-08-22T10:10:00Z",
    updatedAt: "2026-07-08T09:05:00Z",
    workspaces: ["Global"]
  },
  {
    id: "usr_104",
    email: "michael.chang@acme.corp",
    employeeId: "EMP-0833",
    role: "RECRUITER",
    status: "DISABLED",
    profile: {
      firstName: "Michael",
      lastName: "Chang",
      title: "Recruiting Coordinator",
      location: "London, UK",
      timezone: "Europe/London"
    },
    department: { id: "dept_hr", name: "Human Resources" },
    team: { id: "team_coord", name: "Coordination" },
    security: {
      mfaEnabled: false,
      passwordChangedAt: "2025-01-10T11:00:00Z",
      lastLoginAt: "2026-06-01T14:20:00Z",
      accountState: "SUSPENDED"
    },
    preferences: {
      theme: "SYSTEM",
      emailNotifications: true,
      slackNotifications: true
    },
    createdAt: "2025-01-10T11:00:00Z",
    updatedAt: "2026-06-02T10:00:00Z",
    workspaces: ["EMEA"]
  },
  {
    id: "usr_105",
    email: "emily.chen@acme.corp",
    role: "HIRING_MANAGER",
    status: "INACTIVE",
    profile: {
      firstName: "Emily",
      lastName: "Chen",
      title: "Product Lead",
      location: "Seattle, WA",
      timezone: "America/Los_Angeles"
    },
    department: { id: "dept_prod", name: "Product" },
    team: { id: "team_prod_core", name: "Core Product" },
    security: {
      mfaEnabled: false,
      passwordChangedAt: "2026-07-08T10:00:00Z",
      lastLoginAt: "2026-07-08T10:00:00Z",
      accountState: "UNVERIFIED"
    },
    preferences: {
      theme: "SYSTEM",
      emailNotifications: true,
      slackNotifications: false
    },
    invitation: {
      id: "inv_001",
      status: "PENDING",
      invitedBy: "sarah.connor@acme.corp",
      invitedAt: "2026-07-08T10:00:00Z",
      expiresAt: "2026-07-15T10:00:00Z"
    },
    createdAt: "2026-07-08T10:00:00Z",
    updatedAt: "2026-07-08T10:00:00Z",
    workspaces: ["North America"]
  }
];
