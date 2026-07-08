import { 
  Organization, 
  CompanyBranding, 
  ContactInformation, 
  Department, 
  Office, 
  BusinessUnit,
  WorkingHours,
  Holiday,
  HiringDefaults,
  NotificationPreference,
  LocalizationPreference,
  SecurityPreference
} from "../types";

export const mockOrganization: Organization = {
  id: "org_1",
  name: "Acme Corp",
  legalName: "Acme Corporation Inc.",
  domain: "acme.com",
  website: "https://www.acme.com",
  description: "Leading provider of advanced anvil technology.",
  industry: "Manufacturing",
  companySize: "1000-5000",
  tier: "ENTERPRISE"
};

export const mockCompanyBranding: CompanyBranding = {
  primaryColor: "#0f172a",
  secondaryColor: "#334155",
  accentColor: "#3b82f6",
  fontFamily: "Inter"
};

export const mockContactInformation: ContactInformation = {
  addressLine1: "123 Innovation Way",
  city: "San Francisco",
  state: "CA",
  postalCode: "94105",
  country: "United States",
  phone: "+1 (555) 123-4567",
  email: "hello@acme.com",
  supportEmail: "support@acme.com"
};

export const mockDepartments: Department[] = [
  { id: "dept_1", name: "Engineering", description: "Software development and infrastructure", status: "ACTIVE", userCount: 145, openJobsCount: 12 },
  { id: "dept_2", name: "Product", description: "Product management and design", status: "ACTIVE", userCount: 42, openJobsCount: 3 },
  { id: "dept_3", name: "Sales", description: "Direct sales and account management", status: "ACTIVE", userCount: 89, openJobsCount: 8 },
  { id: "dept_4", name: "Marketing", description: "Growth, content, and brand", status: "ACTIVE", userCount: 34, openJobsCount: 2 },
  { id: "dept_5", name: "Human Resources", description: "Talent acquisition and employee success", status: "ACTIVE", userCount: 15, openJobsCount: 1 }
];

export const mockOffices: Office[] = [
  {
    id: "off_1",
    name: "San Francisco HQ",
    region: "North America",
    timezone: "America/Los_Angeles",
    capacity: 500,
    status: "ACTIVE",
    isHeadquarters: true,
    address: { ...mockContactInformation }
  },
  {
    id: "off_2",
    name: "London Hub",
    region: "EMEA",
    timezone: "Europe/London",
    capacity: 250,
    status: "ACTIVE",
    isHeadquarters: false,
    address: {
      addressLine1: "45 Old Street",
      city: "London",
      state: "Greater London",
      postalCode: "EC1V 9HL",
      country: "United Kingdom",
      phone: "+44 20 7123 4567",
      email: "uk@acme.com",
      supportEmail: "support@acme.com"
    }
  }
];

export const mockBusinessUnits: BusinessUnit[] = [
  {
    id: "bu_1",
    name: "Core Products",
    description: "Main product lines including Anvils and Traps.",
    status: "ACTIVE",
    departments: ["dept_1", "dept_2"]
  },
  {
    id: "bu_2",
    name: "Enterprise Solutions",
    description: "B2B specific tools and services.",
    status: "ACTIVE",
    departments: ["dept_3", "dept_4"]
  }
];

export const mockWorkingHours: WorkingHours = {
  timezone: "America/Los_Angeles",
  workingDays: ["MON", "TUE", "WED", "THU", "FRI"],
  startTime: "09:00",
  endTime: "17:00"
};

export const mockHolidays: Holiday[] = [
  { id: "hol_1", name: "New Year's Day", date: "2024-01-01" },
  { id: "hol_2", name: "Independence Day", date: "2024-07-04" },
  { id: "hol_3", name: "Thanksgiving", date: "2024-11-28" }
];

export const mockHiringDefaults: HiringDefaults = {
  defaultPipelineId: "pipe_standard",
  defaultInterviewTemplateId: "tpl_standard",
  defaultEvaluationTemplateId: "eval_standard",
  requireApprovalForOffer: true,
  autoRejectDelayDays: 3
};

export const mockNotificationPreferences: NotificationPreference[] = [
  { type: "EMAIL", enabled: true, events: ["offer_accepted", "interview_scheduled"] },
  { type: "SLACK", enabled: true, events: ["offer_accepted"] },
  { type: "SMS", enabled: false, events: [] }
];

export const mockLocalizationPreference: LocalizationPreference = {
  timezone: "America/Los_Angeles",
  language: "en-US",
  currency: "USD",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",
  firstDayOfWeek: 0
};

export const mockSecurityPreference: SecurityPreference = {
  passwordPolicy: {
    minLength: 12,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: true,
    expiryDays: 90
  },
  sessionTimeoutMinutes: 120,
  allowedIpRanges: []
};

export const mockOrganizationMetrics = {
  totalOffices: mockOffices.length,
  totalDepartments: mockDepartments.length,
  totalUsers: 325,
  activeRecruiters: 12,
  hiringManagers: 45,
  activeJobs: 26,
  completionScore: 85,
  securityScore: 92
};
