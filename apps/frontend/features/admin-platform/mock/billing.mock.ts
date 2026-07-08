import { 
  SubscriptionPlan, 
  Subscription, 
  FeatureEntitlement, 
  PaymentMethod, 
  Invoice, 
  UsageQuota, 
  ApiKey, 
  Webhook, 
  Integration, 
  MarketplaceApp 
} from "../types";

export const mockPlans: SubscriptionPlan[] = [
  { id: "plan_trial", name: "Free Trial", tier: "FREE_TRIAL", monthlyPrice: 0, currency: "USD", maxUsers: 5, maxStorageGb: 10, maxApiRequests: 1000, features: ["Basic ATS", "Email Templates"] },
  { id: "plan_pro", name: "Professional", tier: "PROFESSIONAL", monthlyPrice: 299, currency: "USD", maxUsers: 25, maxStorageGb: 100, maxApiRequests: 10000, features: ["Advanced ATS", "Reporting", "API Access"] },
  { id: "plan_biz", name: "Business", tier: "BUSINESS", monthlyPrice: 899, currency: "USD", maxUsers: 100, maxStorageGb: 500, maxApiRequests: 100000, features: ["SSO", "Custom Workflows", "Dedicated Support"] },
  { id: "plan_ent", name: "Enterprise", tier: "ENTERPRISE", monthlyPrice: 2499, currency: "USD", maxUsers: 1000, maxStorageGb: 5000, maxApiRequests: 1000000, features: ["Unlimited Everything", "White Label", "On-Prem Agent"] }
];

export const mockSubscription: Subscription = {
  id: "sub_123",
  planId: "plan_biz",
  status: "ACTIVE",
  currentPeriodStart: "2024-06-01T00:00:00Z",
  currentPeriodEnd: "2025-06-01T00:00:00Z",
  cancelAtPeriodEnd: false
};

export const mockEntitlements: FeatureEntitlement[] = [
  { id: "feat_1", featureName: "Single Sign-On (SSO)", isIncluded: true },
  { id: "feat_2", featureName: "Custom Domain", isIncluded: true },
  { id: "feat_3", featureName: "AI Interviewer (Voice)", isIncluded: false },
  { id: "feat_4", featureName: "White-Label Branding", isIncluded: false }
];

export const mockPaymentMethods: PaymentMethod[] = [
  { id: "pm_1", type: "CARD", brand: "Visa", last4: "4242", expMonth: 12, expYear: 2026, isDefault: true },
  { id: "pm_2", type: "BANK_TRANSFER", isDefault: false }
];

export const mockInvoices: Invoice[] = [
  { id: "inv_1", number: "INV-2024-001", amountDue: 0, amountPaid: 899, status: "PAID", dueDate: "2024-06-01T00:00:00Z", createdDate: "2024-05-25T00:00:00Z" },
  { id: "inv_2", number: "INV-2023-012", amountDue: 0, amountPaid: 899, status: "PAID", dueDate: "2023-06-01T00:00:00Z", createdDate: "2023-05-25T00:00:00Z" }
];

export const mockUsageQuota: UsageQuota = {
  storageGbUsed: 245,
  storageGbLimit: 500,
  apiRequestsUsed: 42500,
  apiRequestsLimit: 100000,
  recruiterSeatsUsed: 42,
  recruiterSeatsLimit: 100
};

export const mockApiKeys: ApiKey[] = [
  { id: "key_1", name: "Production ERP Sync", keyPrefix: "rp_live_8f92", scopes: ["read:candidates", "write:jobs"], createdAt: "2023-11-12T00:00:00Z", expiresAt: null, lastUsedAt: "2024-07-08T10:15:00Z", status: "ACTIVE" },
  { id: "key_2", name: "Zapier Integration", keyPrefix: "rp_live_44d1", scopes: ["read:all", "write:all"], createdAt: "2024-01-05T00:00:00Z", expiresAt: "2025-01-05T00:00:00Z", lastUsedAt: "2024-06-20T00:00:00Z", status: "ACTIVE" },
  { id: "key_3", name: "Old Website Widget", keyPrefix: "rp_test_99a3", scopes: ["read:jobs"], createdAt: "2022-05-10T00:00:00Z", expiresAt: null, lastUsedAt: "2023-09-01T00:00:00Z", status: "INACTIVE" }
];

export const mockWebhooks: Webhook[] = [
  { id: "wh_1", url: "https://api.acme.com/webhooks/recruitpilot", events: ["candidate.created", "job.published"], status: "ACTIVE", secret: "whsec_...", recentDeliveries: 1250, successRate: 99.8, averageLatencyMs: 245, retryCount: 2, lastFailureAt: "2024-07-01T12:00:00Z" },
  { id: "wh_2", url: "https://zapier.com/hooks/catch/12345", events: ["application.moved"], status: "ACTIVE", secret: "whsec_...", recentDeliveries: 450, successRate: 100, averageLatencyMs: 890, retryCount: 0 }
];

export const mockIntegrations: Integration[] = [
  { id: "int_1", provider: "Slack", category: "COMMUNICATION", name: "Slack Notifications", description: "Send alerts to Slack channels.", status: "CONNECTED", lastSyncAt: "2024-07-08T14:00:00Z" },
  { id: "int_2", provider: "Microsoft Teams", category: "COMMUNICATION", name: "Teams Integration", description: "Post updates to Teams.", status: "DISCONNECTED" },
  { id: "int_3", provider: "Zoom", category: "VIDEO", name: "Zoom Meetings", description: "Auto-generate Zoom links for interviews.", status: "CONNECTED", lastSyncAt: "2024-07-08T09:00:00Z" },
  { id: "int_4", provider: "Google Meet", category: "VIDEO", name: "Google Meet", description: "Add Meet links to calendar invites.", status: "DISCONNECTED" },
  { id: "int_5", provider: "Google Workspace", category: "IDENTITY", name: "Google SSO", description: "SSO and calendar sync.", status: "CONNECTED", lastSyncAt: "2024-07-08T14:00:00Z" },
  { id: "int_6", provider: "Okta", category: "IDENTITY", name: "Okta SAML", description: "Enterprise identity management.", status: "DISCONNECTED" },
  { id: "int_7", provider: "Workday", category: "HRIS", name: "Workday Sync", description: "Sync employees and departments.", status: "CONNECTED", lastSyncAt: "2024-07-08T00:00:00Z" },
  { id: "int_8", provider: "GitHub", category: "DEVELOPER", name: "GitHub Integration", description: "Verify candidate contributions.", status: "DISCONNECTED" },
  { id: "int_9", provider: "Google Drive", category: "DOCUMENTS", name: "Drive Storage", description: "Store resumes in Google Drive.", status: "DISCONNECTED" },
];

export const mockMarketplaceApps: MarketplaceApp[] = [
  { id: "app_1", name: "Background Checks Pro", publisher: "Checkr", category: "Verification", description: "Automated background and reference checks.", isInstalled: true, updateAvailable: false },
  { id: "app_2", name: "Coding Assessments", publisher: "HackerRank", category: "Assessments", description: "Send technical challenges to candidates.", isInstalled: true, updateAvailable: true },
  { id: "app_3", name: "Payroll Sync", publisher: "Gusto", category: "HRIS", description: "Sync hired candidates to Gusto payroll.", isInstalled: false, updateAvailable: false }
];
