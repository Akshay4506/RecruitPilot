"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/lib/animations";
import { mockApplications } from "./mock/applications.mock";
import { Application } from "./types";

import { RecruiterApplicationsHero } from "./components/overview/recruiter-applications-hero";
import { RecruiterApplicationMetrics } from "./components/overview/recruiter-application-metrics";
import { ApplicationFunnel } from "./components/analytics/application-funnel";
import { ApplicationInsights } from "./components/analytics/application-insights";
import { RecruiterApplicationSearch } from "./components/search/recruiter-application-search";
import { RecruiterApplicationFilters } from "./components/search/recruiter-application-filters";
import { ApplicationTable } from "./components/inbox/application-table";
import { ApplicationCard } from "./components/inbox/application-card";
import { ApplicationPreviewDrawer } from "./components/inbox/application-preview-drawer";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecruiterApplications() {
  const [applications] = React.useState<Application[]>(mockApplications);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [previewApp, setPreviewApp] = React.useState<Application | null>(null);

  return (
    <motion.div 
      className="w-full max-w-[1600px] mx-auto space-y-8 pb-12"
      variants={stagger()}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp}>
        <RecruiterApplicationsHero applications={applications} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <RecruiterApplicationMetrics applications={applications} />
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicationFunnel applications={applications} />
        <ApplicationInsights applications={applications} />
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-4 shadow-sm">
        <div className="flex-1 w-full max-w-2xl flex flex-col sm:flex-row gap-4">
          <RecruiterApplicationSearch />
          <RecruiterApplicationFilters />
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto bg-[hsl(var(--muted)/0.5)] p-1 rounded-lg">
          <Button 
            variant={viewMode === "list" ? "secondary" : "ghost"} 
            size="sm" 
            className="h-8 px-2"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "grid" ? "secondary" : "ghost"} 
            size="sm" 
            className="h-8 px-2"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        {viewMode === "list" ? (
          <ApplicationTable applications={applications} onPreview={setPreviewApp} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {applications.map(app => (
              <ApplicationCard key={app.id} application={app} onPreview={setPreviewApp} />
            ))}
          </div>
        )}
      </motion.div>

      <ApplicationPreviewDrawer 
        application={previewApp} 
        isOpen={!!previewApp} 
        onClose={() => setPreviewApp(null)} 
      />
    </motion.div>
  );
}
