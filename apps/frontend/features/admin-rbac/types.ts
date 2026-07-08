import { PermissionValue } from "../admin-shared/constants/permissions";
import { RiskLevel } from "../admin-shared/constants/risk-levels";
import { UserProfile } from "../admin-users/types";
import { Status } from "../admin-shared/types";

export type RoleType = "SYSTEM" | "CUSTOM";
export type PermissionState = "ALLOW" | "DENY" | "INHERIT";

export interface RolePermission {
  permissionId: PermissionValue;
  state: PermissionState;
}

export interface PermissionTemplate {
  id: string;
  name: string;
  description: string;
  permissions: RolePermission[];
}

export interface AccessPolicy {
  ipRestrictions: string[];
  sessionLimits: number;
  devicePolicies: string[];
  timeRestrictions: {
    startTime: string;
    endTime: string;
    timezone: string;
  } | null;
  approvalRequirements: string[];
}

export interface RbacRole {
  id: string;
  name: string;
  description: string;
  type: RoleType;
  status: Status;
  riskLevel: RiskLevel;
  departmentId?: string;
  baseTemplateId?: string | null;
  permissions: RolePermission[];
  workspaces: string[]; // List of workspace IDs
  accessPolicy: AccessPolicy;
  assignedUsersCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: Partial<UserProfile>;
}

export interface PermissionAuditSummary {
  lastUpdated: string;
  updatedBy: string;
  totalChanges: number;
}
