"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SettingsSidebar } from "@/features/admin-settings/components/settings-sidebar";
import { SettingsTabs } from "@/features/admin-settings/components/settings-tabs";

// Mocks
import { 
  mockSubscription, 
  mockPlans, 
  mockEntitlements, 
  mockPaymentMethods, 
  mockInvoices,
  mockApiKeys,
  mockWebhooks,
  mockIntegrations,
  mockMarketplaceApps
} from "./mock/billing.mock";

// Components: Overview
import { BillingHero } from "./components/overview/billing-hero";
import { SubscriptionMetrics } from "./components/overview/subscription-metrics";
import { UsageOverview } from "./components/overview/usage-overview";

// Components: Rail
import { BillingHealth } from "./components/rail/billing-health";
import { QuickActions } from "./components/rail/quick-actions";

// Components: Subscription
import { CurrentPlan } from "./components/subscription/current-plan";
import { FeatureEntitlements } from "./components/subscription/feature-entitlements";
import { SubscriptionTimeline } from "./components/subscription/subscription-timeline";

// Components: Billing
import { PaymentMethods } from "./components/billing/payment-methods";
import { InvoicesTable } from "./components/billing/invoices-table";
import { BillingHistory } from "./components/billing/billing-history";

// Components: Usage
import { StorageUsage } from "./components/usage/storage-usage";
import { ApiUsage } from "./components/usage/api-usage";
import { LicenseUsage } from "./components/usage/license-usage";

// Components: Integrations
import { IntegrationGallery } from "./components/integrations/providers/integration-gallery";
import { ApiKeysTable } from "./components/integrations/api/api-keys-table";
import { WebhooksTable } from "./components/integrations/webhooks/webhook-table";
import { WebhookHistory } from "./components/integrations/webhooks/webhook-history";
import { MarketplaceGallery } from "./components/integrations/marketplace/marketplace-gallery";
import { InstalledApps } from "./components/integrations/marketplace/installed-apps";

import { CreditCard, Activity, Link, Key, Zap, Package, Compass } from "lucide-react";

export function AdminBilling() {
  const [activeTab, setActiveTab] = React.useState("subscription");
  const currentPlan = mockPlans.find(p => p.id === mockSubscription.planId) || mockPlans[0];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-6 pb-24">
      
      <BillingHero subscription={mockSubscription} plan={currentPlan} />
      <SubscriptionMetrics />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col md:flex-row gap-6 mt-6 outline-none">
        
        {/* Left Navigation (3 columns) */}
        <SettingsSidebar>
          <SettingsTabs>
            <TabsList className="flex flex-col h-auto bg-transparent rounded-none p-0 gap-1 items-stretch">
              
              <div className="px-3 py-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Account
              </div>
              <TabsTrigger value="subscription" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Package className="h-4 w-4 mr-2" /> Subscription
              </TabsTrigger>
              <TabsTrigger value="billing" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <CreditCard className="h-4 w-4 mr-2" /> Billing & Invoices
              </TabsTrigger>
              <TabsTrigger value="usage" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Activity className="h-4 w-4 mr-2" /> Usage & Quotas
              </TabsTrigger>

              <div className="px-3 pt-4 pb-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Integrations
              </div>
              <TabsTrigger value="integrations" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Link className="h-4 w-4 mr-2" /> Connected Services
              </TabsTrigger>
              <TabsTrigger value="marketplace" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Compass className="h-4 w-4 mr-2" /> App Marketplace
              </TabsTrigger>

              <div className="px-3 pt-4 pb-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Developer
              </div>
              <TabsTrigger value="api" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Key className="h-4 w-4 mr-2" /> API Keys
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Zap className="h-4 w-4 mr-2" /> Webhooks
              </TabsTrigger>

            </TabsList>
          </SettingsTabs>
          <UsageOverview />
        </SettingsSidebar>

        {/* Center Content (6 columns) */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          
          <TabsContent value="subscription" className="mt-0 outline-none space-y-6">
            <CurrentPlan subscription={mockSubscription} plan={currentPlan} />
            <FeatureEntitlements entitlements={mockEntitlements} />
            <SubscriptionTimeline />
          </TabsContent>

          <TabsContent value="billing" className="mt-0 outline-none space-y-6">
            <PaymentMethods paymentMethods={mockPaymentMethods} />
            <InvoicesTable invoices={mockInvoices} />
            <BillingHistory />
          </TabsContent>

          <TabsContent value="usage" className="mt-0 outline-none space-y-6">
            <LicenseUsage />
            <StorageUsage />
            <ApiUsage />
          </TabsContent>

          <TabsContent value="integrations" className="mt-0 outline-none space-y-6">
            <IntegrationGallery integrations={mockIntegrations} />
          </TabsContent>

          <TabsContent value="marketplace" className="mt-0 outline-none space-y-6">
            <InstalledApps apps={mockMarketplaceApps} />
            <MarketplaceGallery apps={mockMarketplaceApps} />
          </TabsContent>

          <TabsContent value="api" className="mt-0 outline-none space-y-6">
            <ApiKeysTable apiKeys={mockApiKeys} />
          </TabsContent>

          <TabsContent value="webhooks" className="mt-0 outline-none space-y-6">
            <WebhooksTable webhooks={mockWebhooks} />
            <WebhookHistory />
          </TabsContent>
          
        </div>

        {/* Right Rail (3 columns) */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-6">
          <BillingHealth />
          <QuickActions />
        </div>

      </Tabs>
    </div>
  );
}
