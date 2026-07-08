export const PERMISSION_CATEGORIES = [
  { id: "dashboard", label: "Dashboard" },
  { id: "jobs", label: "Jobs" },
  { id: "candidates", label: "Candidates" },
  { id: "applications", label: "Applications" },
  { id: "interviews", label: "Interviews" },
  { id: "analytics", label: "Analytics & Reports" },
  { id: "organization", label: "Organization" },
  { id: "users", label: "Users" },
  { id: "roles", label: "Roles & Access" },
  { id: "system", label: "System Administration" },
] as const;

export type PermissionCategory = typeof PERMISSION_CATEGORIES[number]["id"];
