import { Status } from "../admin-shared/types";

export interface Organization {
  id: string;
  name: string;
  legalName: string;
  domain: string;
  website: string;
  description: string;
  industry: string;
  companySize: string;
  tier: "STARTUP" | "BUSINESS" | "ENTERPRISE";
}

export interface CompanyBranding {
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
}

export interface ContactInformation {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  supportEmail: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  headUserId?: string;
  parentDepartmentId?: string | null;
  status: Status;
  userCount: number;
  openJobsCount: number;
}

export interface Office {
  id: string;
  name: string;
  region: string;
  timezone: string;
  capacity: number;
  status: Status;
  isHeadquarters: boolean;
  address: ContactInformation;
}

export interface BusinessUnit {
  id: string;
  name: string;
  description: string;
  headUserId?: string;
  status: Status;
  departments: string[]; // Department IDs
}

export interface WorkingHours {
  timezone: string;
  workingDays: string[]; // e.g., ["MON", "TUE", "WED", "THU", "FRI"]
  startTime: string; // "09:00"
  endTime: string; // "17:00"
}

export interface Holiday {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
}

export interface HiringDefaults {
  defaultPipelineId: string;
  defaultInterviewTemplateId: string;
  defaultEvaluationTemplateId: string;
  requireApprovalForOffer: boolean;
  autoRejectDelayDays: number;
}

export interface NotificationPreference {
  type: "EMAIL" | "SLACK" | "TEAMS" | "SMS" | "PUSH";
  enabled: boolean;
  events: string[];
}

export interface LocalizationPreference {
  timezone: string;
  language: string;
  currency: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  firstDayOfWeek: 0 | 1 | 6; // 0=Sun, 1=Mon, 6=Sat
}

export interface SecurityPreference {
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
    expiryDays: number | null;
  };
  sessionTimeoutMinutes: number;
  allowedIpRanges: string[];
}
