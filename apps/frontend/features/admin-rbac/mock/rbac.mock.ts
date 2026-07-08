import { RbacRole, PermissionTemplate } from "../types";
import { PERMISSIONS } from "../../admin-shared/constants/permissions";

export const mockPermissionTemplates: PermissionTemplate[] = [
  {
    id: "tpl_full_recruiter",
    name: "Full Recruiter Template",
    description: "Standard permissions for a full-cycle recruiter",
    permissions: [
      { permissionId: PERMISSIONS.DASHBOARD_VIEW, state: "ALLOW" },
      { permissionId: PERMISSIONS.JOBS_VIEW, state: "ALLOW" },
      { permissionId: PERMISSIONS.JOBS_CREATE, state: "ALLOW" },
      { permissionId: PERMISSIONS.JOBS_UPDATE, state: "ALLOW" },
      { permissionId: PERMISSIONS.CANDIDATES_VIEW, state: "ALLOW" },
      { permissionId: PERMISSIONS.CANDIDATES_CREATE, state: "ALLOW" },
      { permissionId: PERMISSIONS.CANDIDATES_UPDATE, state: "ALLOW" },
      { permissionId: PERMISSIONS.APPLICATIONS_VIEW, state: "ALLOW" },
      { permissionId: PERMISSIONS.APPLICATIONS_UPDATE, state: "ALLOW" },
      { permissionId: PERMISSIONS.INTERVIEWS_VIEW, state: "ALLOW" },
      { permissionId: PERMISSIONS.INTERVIEWS_SCHEDULE, state: "ALLOW" },
      { permissionId: PERMISSIONS.INTERVIEWS_EVALUATE, state: "ALLOW" },
    ]
  },
  {
    id: "tpl_interviewer",
    name: "Interview Only Template",
    description: "Limited access template for panel interviewers",
    permissions: [
      { permissionId: PERMISSIONS.DASHBOARD_VIEW, state: "ALLOW" },
      { permissionId: PERMISSIONS.CANDIDATES_VIEW, state: "ALLOW" },
      { permissionId: PERMISSIONS.INTERVIEWS_VIEW, state: "ALLOW" },
      { permissionId: PERMISSIONS.INTERVIEWS_EVALUATE, state: "ALLOW" },
    ]
  }
];

export const mockRoles: RbacRole[] = [
  {
    id: "role_super_admin",
    name: "Super Administrator",
    description: "Unrestricted access to all platform modules and settings.",
    type: "SYSTEM",
    status: "ACTIVE",
    riskLevel: "CRITICAL",
    baseTemplateId: null,
    permissions: Object.values(PERMISSIONS).map(p => ({ permissionId: p, state: "ALLOW" })),
    workspaces: ["ws_global"],
    accessPolicy: {
      ipRestrictions: [],
      sessionLimits: 1,
      devicePolicies: ["Require MFA", "Managed Devices Only"],
      timeRestrictions: null,
      approvalRequirements: []
    },
    assignedUsersCount: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-06-15T12:00:00Z",
    createdBy: { firstName: "System", lastName: "Core" }
  },
  {
    id: "role_recruiter",
    name: "Recruiter",
    description: "Standard recruiting operations including jobs, candidates, and interviews.",
    type: "SYSTEM",
    status: "ACTIVE",
    riskLevel: "MEDIUM",
    baseTemplateId: "tpl_full_recruiter",
    permissions: [
      { permissionId: PERMISSIONS.JOBS_DELETE, state: "DENY" }, // Override template
      { permissionId: PERMISSIONS.CANDIDATES_DELETE, state: "DENY" } // Override template
    ],
    workspaces: ["ws_na", "ws_emea"],
    accessPolicy: {
      ipRestrictions: [],
      sessionLimits: 3,
      devicePolicies: ["Require MFA"],
      timeRestrictions: null,
      approvalRequirements: []
    },
    assignedUsersCount: 48,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-07-01T09:30:00Z",
    createdBy: { firstName: "System", lastName: "Core" }
  },
  {
    id: "role_custom_senior_recruiter",
    name: "Senior Recruiter",
    description: "Expanded recruiting access with analytics export capabilities.",
    type: "CUSTOM",
    status: "ACTIVE",
    riskLevel: "MEDIUM",
    baseTemplateId: "tpl_full_recruiter",
    permissions: [
      { permissionId: PERMISSIONS.ANALYTICS_VIEW, state: "ALLOW" },
      { permissionId: PERMISSIONS.ANALYTICS_EXPORT, state: "ALLOW" }
    ],
    workspaces: ["ws_global"],
    accessPolicy: {
      ipRestrictions: [],
      sessionLimits: 3,
      devicePolicies: ["Require MFA"],
      timeRestrictions: null,
      approvalRequirements: []
    },
    assignedUsersCount: 7,
    createdAt: "2024-02-15T10:00:00Z",
    updatedAt: "2024-07-02T14:20:00Z",
    createdBy: { firstName: "Alice", lastName: "Admin" }
  }
];

export const mockRbacMetrics = {
  totalRoles: 24,
  customRoles: 7,
  assignedUsers: 104,
  pendingReviews: 5,
  activeRoles: 22,
  permissionSets: 12,
  policyConflicts: 2,
  mfaAdoptionRate: 98,
  elevatedAccessCount: 14,
  expiringPolicies: 3,
  highRiskRoles: 4
};
