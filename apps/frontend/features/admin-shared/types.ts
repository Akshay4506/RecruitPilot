export type Role = "ADMIN" | "RECRUITER" | "HIRING_MANAGER" | "CANDIDATE";
export type Status = "ACTIVE" | "INACTIVE" | "DISABLED" | "LOCKED";
export type InvitationStatus = "PENDING" | "ACCEPTED" | "EXPIRED";
export type SessionStatus = "ACTIVE" | "EXPIRED" | "TERMINATED";
export type AccountState = "VERIFIED" | "UNVERIFIED" | "SUSPENDED";

export interface UserDepartment {
  id: string;
  name: string;
}

export interface UserTeam {
  id: string;
  name: string;
}

export interface SharedWorkspace {
  id: string;
  name: string;
  environment: "PRODUCTION" | "SANDBOX";
}
