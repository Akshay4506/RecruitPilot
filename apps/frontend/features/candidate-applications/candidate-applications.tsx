"use client";

import * as React from "react";
import { Application } from "./types";
import { mockApplications } from "./mock/applications.mock";

import { TrackerHero } from "./components/overview/tracker-hero";
import { ApplicationFilters, ApplicationFilterState } from "./components/filters/application-filters";
import { ApplicationList } from "./components/tracker/application-list";
import { ApplicationPreviewDrawer } from "./components/tracker/application-preview-drawer";
import { TrackerWidgets } from "./components/overview/tracker-widgets";

export function CandidateApplications() {
  const [filters, setFilters] = React.useState<ApplicationFilterState>({
    status: new Set(),
    stage: new Set(),
    sort: "newest"
  });

  const [selectedApp, setSelectedApp] = React.useState<Application | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  const handleQuickView = (app: Application) => {
    setSelectedApp(app);
    setIsPreviewOpen(true);
  };

  const handleWithdraw = (app: Application) => {
    console.log("Withdrawing application", app.id);
  };

  const handleClearFilters = () => {
    setFilters({
      status: new Set(),
      stage: new Set(),
      sort: "newest"
    });
  };

  const filteredApps = mockApplications.filter(app => {
    if (filters.status.size > 0 && !filters.status.has(app.status)) return false;
    if (filters.stage.size > 0 && !filters.stage.has(app.stage)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - Filters */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-6">
              <ApplicationFilters 
                filters={filters} 
                onFilterChange={setFilters} 
                onClear={handleClearFilters}
              />
            </div>
          </div>

          {/* Center Column - Overview & Tracker */}
          <div className="lg:col-span-6 space-y-6">
            <TrackerHero applications={mockApplications} />
            <ApplicationList 
              applications={filteredApps}
              onQuickView={handleQuickView}
              onWithdraw={handleWithdraw}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Right Column - Widgets */}
          <div className="lg:col-span-3 space-y-6">
            <div className="sticky top-6">
              <TrackerWidgets applications={mockApplications} />
            </div>
          </div>

        </div>
      </div>

      <ApplicationPreviewDrawer 
        application={selectedApp}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onWithdraw={handleWithdraw}
      />
    </div>
  );
}
