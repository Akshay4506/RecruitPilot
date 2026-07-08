import {
  Role,
  Status,
  InvitationStatus,
  SessionStatus,
  AccountState,
  UserDepartment,
  UserTeam
} from "@/features/admin-shared/types";

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatarSrc?: string;
  title?: string;
  location?: string;
  timezone?: string;
}

export interface UserSecurity {
  mfaEnabled: boolean;
  passwordChangedAt: string;
  lastLoginAt: string;
  lastFailedLoginAt?: string;
  accountState: AccountState;
}

export interface UserSession {
  id: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  status: SessionStatus;
  lastActiveAt: string;
  createdAt: string;
}

export interface UserInvitation {
  id: string;
  status: InvitationStatus;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
}

export interface UserPreferences {
  theme: "LIGHT" | "DARK" | "SYSTEM";
  emailNotifications: boolean;
  slackNotifications: boolean;
}

export interface UserActivity {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress?: string;
}

export interface User {
  id: string;
  email: string;
  employeeId?: string;
  profile: UserProfile;
  role: Role;
  status: Status;
  department?: UserDepartment;
  team?: UserTeam;
  security: UserSecurity;
  preferences: UserPreferences;
  invitation?: UserInvitation;
  createdAt: string;
  updatedAt: string;
  workspaces: string[];
}

export interface UserStatistics {
  newUsers30d: number;
  invitedUsers: number;
  lockedAccounts: number;
  mfaEnabled: number;
  inactiveUsers30d: number;
}

export interface UserMetrics {
  totalUsers: number;
  recruiters: number;
  hiringManagers: number;
  candidates: number;
  activeSessions: number;
  pendingInvitations: number;
}

export interface AdminAction {
  id: string;
  type: string;
  targetUserId: string;
  timestamp: string;
  performedBy: string;
}
