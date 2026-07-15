"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SettingsSidebar } from "@/features/admin-settings/components/settings-sidebar";
import { SettingsTabs } from "@/features/admin-settings/components/settings-tabs";

// Mock Data
import { 
  mockPlatformHealth, 
  mockSystemAlerts, 
  mockJobMetrics, 
  mockBackgroundJobs,
  mockQueueHealth,
  mockAuditLogs,
  mockFeatureFlags,
  mockEmailTemplates,
  mockStorageMetrics,
  mockBackups,
  mockMaintenanceEvents,
  mockSystemConfiguration
} from "./mock/platform.mock";

// Types
import { AuditLog, FeatureFlag, EmailTemplate, Backup } from "./types";

// Overview
import { PlatformHero } from "./components/overview/platform-hero";
import { PlatformMetrics } from "./components/overview/platform-metrics";
import { SystemHealth } from "./components/overview/system-health";

// Operations
import { BackgroundJobs } from "./components/operations/jobs/background-jobs";
import { QueueOverview } from "./components/operations/queues/queue-overview";
import { PlatformAlerts } from "./components/operations/monitoring/platform-alerts";

// Audit
import { AuditTable } from "./components/audit/audit-table";

// Flags
import { FeatureFlagsTable } from "./components/flags/feature-flags-table";

// Email
import { EmailTemplateList } from "./components/email/email-template-list";

// Storage
import { StorageOverview } from "./components/storage/storage-overview";
import { BackupsTable } from "./components/storage/backups-table";

// Maintenance & Configuration
import { MaintenanceMode } from "./components/maintenance/maintenance-mode";
import { MaintenanceHistory } from "./components/maintenance/maintenance-history";
import { SystemSettings } from "./components/configuration/system-settings";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/loaders/skeleton";

// Lazy Loaded Drawers and Dialogs
const AuditDetailsDrawer = dynamic(() => import("./components/audit/audit-details-drawer").then(mod => mod.AuditDetailsDrawer), { ssr: false });
const FlagEditor = dynamic(() => import("./components/flags/flag-editor").then(mod => mod.FlagEditor), { ssr: false });
const EmailTemplateEditor = dynamic(() => import("./components/email/email-template-editor").then(mod => mod.EmailTemplateEditor), { ssr: false });
const EmailPreview = dynamic(() => import("./components/email/email-preview").then(mod => mod.EmailPreview), { ssr: false });
const RestoreBackupDialog = dynamic(() => import("./components/dialogs/restore-backup-dialog").then(mod => mod.RestoreBackupDialog), { ssr: false });

import { Activity, Shield, ToggleLeft, Mail, HardDrive, Wrench, Settings } from "lucide-react";

export function AdminPlatformOperations() {
  const [activeTab, setActiveTab] = React.useState("overview");
  
  // State for Drawers and Dialogs
  const [selectedAudit, setSelectedAudit] = React.useState<AuditLog | null>(null);
  const [selectedFlag, setSelectedFlag] = React.useState<FeatureFlag | null>(null);
  const [editingTemplate, setEditingTemplate] = React.useState<EmailTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = React.useState<EmailTemplate | null>(null);
  const [restoringBackup, setRestoringBackup] = React.useState<Backup | null>(null);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-6 pb-24">
      
      <PlatformHero health={mockPlatformHealth} config={mockSystemConfiguration} />
      <PlatformMetrics jobMetrics={mockJobMetrics} storageMetrics={mockStorageMetrics} queues={mockQueueHealth} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col md:flex-row gap-6 mt-6 outline-none">
        
        {/* Left Navigation (3 columns) */}
        <SettingsSidebar>
          <SettingsTabs>
            <TabsList className="flex flex-col h-auto bg-transparent rounded-none p-0 gap-1 items-stretch">
              
              <TabsTrigger value="overview" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Activity className="h-4 w-4 mr-2" /> Overview
              </TabsTrigger>
              <TabsTrigger value="operations" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Activity className="h-4 w-4 mr-2" /> Operations
              </TabsTrigger>
              <TabsTrigger value="audit" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Shield className="h-4 w-4 mr-2" /> Audit Logs
              </TabsTrigger>
              <TabsTrigger value="flags" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <ToggleLeft className="h-4 w-4 mr-2" /> Feature Flags
              </TabsTrigger>
              <TabsTrigger value="email" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Mail className="h-4 w-4 mr-2" /> Email Templates
              </TabsTrigger>
              <TabsTrigger value="storage" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <HardDrive className="h-4 w-4 mr-2" /> Storage & Backups
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Wrench className="h-4 w-4 mr-2" /> Maintenance
              </TabsTrigger>
              <TabsTrigger value="configuration" className="justify-start px-3 data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:shadow-none">
                <Settings className="h-4 w-4 mr-2" /> Configuration
              </TabsTrigger>

            </TabsList>
          </SettingsTabs>
        </SettingsSidebar>

        {/* Center Content (9 columns) */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          
          <TabsContent value="overview" className="mt-0 outline-none space-y-6">
            <SystemHealth health={mockPlatformHealth} />
            <PlatformAlerts alerts={mockSystemAlerts} />
          </TabsContent>

          <TabsContent value="operations" className="mt-0 outline-none space-y-6">
            <QueueOverview queues={mockQueueHealth} />
            <BackgroundJobs jobs={mockBackgroundJobs} metrics={mockJobMetrics} />
          </TabsContent>

          <TabsContent value="audit" className="mt-0 outline-none space-y-6">
            <AuditTable logs={mockAuditLogs} onViewDetails={setSelectedAudit} />
          </TabsContent>

          <TabsContent value="flags" className="mt-0 outline-none space-y-6">
            <FeatureFlagsTable flags={mockFeatureFlags} onEditFlag={setSelectedFlag} />
          </TabsContent>

          <TabsContent value="email" className="mt-0 outline-none space-y-6">
            <EmailTemplateList 
              templates={mockEmailTemplates} 
              onEdit={setEditingTemplate} 
              onPreview={setPreviewTemplate} 
            />
          </TabsContent>

          <TabsContent value="storage" className="mt-0 outline-none space-y-6">
            <StorageOverview metrics={mockStorageMetrics} />
            <BackupsTable backups={mockBackups} onRestore={setRestoringBackup} />
          </TabsContent>

          <TabsContent value="maintenance" className="mt-0 outline-none space-y-6">
            <MaintenanceMode config={mockSystemConfiguration} />
            <MaintenanceHistory events={mockMaintenanceEvents} />
          </TabsContent>

          <TabsContent value="configuration" className="mt-0 outline-none space-y-6">
            <SystemSettings config={mockSystemConfiguration} />
          </TabsContent>
          
        </div>
      </Tabs>

      {/* Drawers and Dialogs */}
      <AuditDetailsDrawer log={selectedAudit} onClose={() => setSelectedAudit(null)} />
      <FlagEditor flag={selectedFlag} onClose={() => setSelectedFlag(null)} />
      <EmailTemplateEditor template={editingTemplate} onClose={() => setEditingTemplate(null)} />
      <EmailPreview template={previewTemplate} onClose={() => setPreviewTemplate(null)} />
      
      <RestoreBackupDialog backup={restoringBackup} onClose={() => setRestoringBackup(null)} />

    </div>
  );
}
