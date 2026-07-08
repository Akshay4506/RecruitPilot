import { UserDepartment, SharedWorkspace } from "./types";

export const mockDepartments: UserDepartment[] = [
  { id: "dept_hr", name: "Human Resources" },
  { id: "dept_eng", name: "Engineering" },
  { id: "dept_prod", name: "Product" },
  { id: "dept_sales", name: "Sales" },
  { id: "dept_mkt", name: "Marketing" },
];

export const mockWorkspaces: SharedWorkspace[] = [
  { id: "ws_global", name: "Global", environment: "PRODUCTION" },
  { id: "ws_na", name: "North America", environment: "PRODUCTION" },
  { id: "ws_emea", name: "EMEA", environment: "PRODUCTION" },
  { id: "ws_sandbox", name: "Sandbox Testing", environment: "SANDBOX" },
];
