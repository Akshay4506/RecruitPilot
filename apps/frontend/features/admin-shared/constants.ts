import { Role, Status } from "./types";

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Admin",
  RECRUITER: "Recruiter",
  HIRING_MANAGER: "Hiring Manager",
  CANDIDATE: "Candidate",
};

export const STATUS_LABELS: Record<Status, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  DISABLED: "Disabled",
  LOCKED: "Locked",
};

export const TIMEZONES = [
  "America/Los_Angeles",
  "America/New_York",
  "America/Chicago",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Kolkata"
];

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "India",
  "Japan"
];
