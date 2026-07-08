import { Status } from "../admin-shared/types";

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: "FREE_TRIAL" | "PROFESSIONAL" | "BUSINESS" | "ENTERPRISE";
  monthlyPrice: number;
  currency: string;
  maxUsers: number;
  maxStorageGb: number;
  maxApiRequests: number;
  features: string[];
}

export interface Subscription {
  id: string;
  planId: string;
  status: "ACTIVE" | "PAST_DUE" | "CANCELED" | "TRIAL";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface FeatureEntitlement {
  id: string;
  featureName: string;
  isIncluded: boolean;
  limit?: number;
  currentUsage?: number;
}

export interface PaymentMethod {
  id: string;
  type: "CARD" | "BANK_TRANSFER";
  brand?: "Visa" | "Mastercard" | "Amex";
  last4?: string;
  expMonth?: number;
  expYear?: number;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  number: string;
  amountDue: number;
  amountPaid: number;
  status: "DRAFT" | "OPEN" | "PAID" | "VOID" | "UNCOLLECTIBLE";
  dueDate: string;
  createdDate: string;
  pdfUrl?: string;
}

export interface UsageQuota {
  storageGbUsed: number;
  storageGbLimit: number;
  apiRequestsUsed: number;
  apiRequestsLimit: number;
  recruiterSeatsUsed: number;
  recruiterSeatsLimit: number;
}

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  scopes: string[];
  createdAt: string;
  expiresAt: string | null;
  lastUsedAt: string | null;
  status: Status;
}

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: Status;
  secret: string;
  recentDeliveries: number;
  successRate: number;
  averageLatencyMs: number;
  retryCount: number;
  lastFailureAt?: string;
}

export interface Integration {
  id: string;
  provider: string;
  category: "COMMUNICATION" | "VIDEO" | "IDENTITY" | "HRIS" | "DEVELOPER" | "DOCUMENTS";
  name: string;
  description: string;
  logoUrl?: string;
  status: "CONNECTED" | "DISCONNECTED" | "ERROR";
  lastSyncAt?: string;
}

export interface MarketplaceApp {
  id: string;
  name: string;
  publisher: string;
  category: string;
  description: string;
  isInstalled: boolean;
  updateAvailable: boolean;
}
