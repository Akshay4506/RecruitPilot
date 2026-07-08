"use client";

import * as React from "react";
import { OrganizationHero } from "./components/overview/organization-hero";
import { OrganizationMetrics } from "./components/overview/organization-metrics";
import { OrganizationHealth } from "./components/overview/organization-health";
import { ConfigurationStatus } from "./components/overview/configuration-status";
import { WorkspaceSummary } from "./components/overview/workspace-summary";

import { CompanyProfile } from "./components/organization/company-profile";
import { Branding } from "./components/organization/branding";
import { ContactInformation } from "./components/organization/contact-information";

import { DepartmentsTable } from "./components/departments/departments-table";
import { OfficesTable } from "./components/offices/offices-table";
import { BusinessUnitsTable } from "./components/business-units/business-units-table";

import { WorkingHours } from "./components/policies/working-hours";
import { HolidayCalendar } from "./components/policies/holiday-calendar";
import { HiringDefaults } from "./components/policies/hiring-defaults";
import { NotificationPreferences } from "./components/policies/notification-preferences";

import { Localization } from "./components/preferences/localization";
import { SecurityPreferences } from "./components/preferences/security-preferences";

import { SaveBar } from "@/features/admin-settings/components/save-bar";

import { 
  mockOrganization, 
  mockCompanyBranding, 
  mockContactInformation, 
  mockDepartments, 
  mockOffices, 
  mockBusinessUnits, 
  mockWorkingHours, 
  mockHolidays, 
  mockHiringDefaults, 
  mockNotificationPreferences, 
  mockLocalizationPreference, 
  mockSecurityPreference 
} from "./mock/organization.mock";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Settings, Building, Network, Calendar, Bell, Shield, MapPin } from "lucide-react";

export function AdminOrganization() {
  const [activeTab, setActiveTab] = React.useState("profile");
  const [isDirty, setIsDirty] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleDirty = () => setIsDirty(true);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsDirty(false);
    }, 1000);
  };

  const handleDiscard = () => {
    setIsDirty(false);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-6 pb-24">
      
      <OrganizationHero organization={mockOrganization} branding={mockCompanyBranding} />
      <OrganizationMetrics />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col md:flex-row gap-6 mt-6 outline-none">
        
        {/* Left Navigation (3 columns) */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
          <div className="border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] overflow-hidden">
            <TabsList className="flex flex-col h-auto bg-transparent rounded-none p-2 gap-1 items-stretch">
              <TabsTrigger value="profile" className="justify-start data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Settings className="h-4 w-4 mr-2" /> Company Profile
              </TabsTrigger>
              <TabsTrigger value="branding" className="justify-start data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Settings className="h-4 w-4 mr-2" /> Brand & Theme
              </TabsTrigger>
              <TabsTrigger value="departments" className="justify-start data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Network className="h-4 w-4 mr-2" /> Departments
              </TabsTrigger>
              <TabsTrigger value="offices" className="justify-start data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <MapPin className="h-4 w-4 mr-2" /> Offices
              </TabsTrigger>
              <TabsTrigger value="business-units" className="justify-start data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Building className="h-4 w-4 mr-2" /> Business Units
              </TabsTrigger>
              <TabsTrigger value="policies" className="justify-start data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Calendar className="h-4 w-4 mr-2" /> Hiring Policies
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Bell className="h-4 w-4 mr-2" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="preferences" className="justify-start data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Shield className="h-4 w-4 mr-2" /> Security & Localization
              </TabsTrigger>
            </TabsList>
          </div>
          
          <WorkspaceSummary />
        </div>

        {/* Center Content (6 columns) */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <TabsContent value="profile" className="mt-0 outline-none space-y-6">
            <CompanyProfile organization={mockOrganization} onChange={handleDirty} />
            <ContactInformation contactInfo={mockContactInformation} onChange={handleDirty} />
          </TabsContent>
          
          <TabsContent value="branding" className="mt-0 outline-none space-y-6">
            <Branding branding={mockCompanyBranding} onChange={handleDirty} />
          </TabsContent>

          <TabsContent value="departments" className="mt-0 outline-none space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Departments</h2>
            </div>
            <DepartmentsTable departments={mockDepartments} />
          </TabsContent>

          <TabsContent value="offices" className="mt-0 outline-none space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Offices</h2>
            </div>
            <OfficesTable offices={mockOffices} />
          </TabsContent>

          <TabsContent value="business-units" className="mt-0 outline-none space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Business Units</h2>
            </div>
            <BusinessUnitsTable businessUnits={mockBusinessUnits} />
          </TabsContent>

          <TabsContent value="policies" className="mt-0 outline-none space-y-6">
            <WorkingHours workingHours={mockWorkingHours} onChange={handleDirty} />
            <HolidayCalendar holidays={mockHolidays} onChange={handleDirty} />
            <HiringDefaults defaults={mockHiringDefaults} onChange={handleDirty} />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 outline-none space-y-6">
            <NotificationPreferences preferences={mockNotificationPreferences} onChange={handleDirty} />
          </TabsContent>

          <TabsContent value="preferences" className="mt-0 outline-none space-y-6">
            <Localization localization={mockLocalizationPreference} onChange={handleDirty} />
            <SecurityPreferences security={mockSecurityPreference} onChange={handleDirty} />
          </TabsContent>
        </div>

        {/* Right Rail (3 columns) */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-6">
          <OrganizationHealth />
          <ConfigurationStatus />
        </div>
      </Tabs>

      <SaveBar 
        isDirty={isDirty} 
        isLoading={isSaving}
        onSave={handleSave} 
        onDiscard={handleDiscard} 
      />
    </div>
  );
}
