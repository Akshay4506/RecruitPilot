"use client";

import * as React from "react";
import { Job } from "./types";
import { mockJobs, mockSavedJobs, mockAppliedJobs, mockRecommendedJobs, mockRecentlyViewed } from "./mock/jobs.mock";

import { HeroSearch } from "./components/search/hero-search";
import { AdvancedFilters, JobFilterState } from "./components/filters/advanced-filters";
import { JobList } from "./components/listings/job-list";
import { JobPreviewDrawer } from "./components/listings/job-preview-drawer";

import { RecommendedJobs } from "./components/recommendations/recommended-jobs";
import { SavedJobsWidget } from "./components/saved/saved-jobs-widget";
import { RecentlyViewedWidget } from "./components/saved/recently-viewed-widget";
import { RecentlyAppliedWidget } from "./components/saved/recently-applied-widget";

export function CandidateJobs() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState<JobFilterState>({
    workMode: new Set(),
    employmentType: new Set(),
    experience: new Set(),
    department: new Set(),
    sort: "newest"
  });

  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  const handleQuickView = (job: Job) => {
    setSelectedJob(job);
    setIsPreviewOpen(true);
  };

  const handleApply = (job: Job) => {
    void 0;
  };

  const handleSave = (job: Job) => {
    void 0;
  };

  const handleClearFilters = () => {
    setFilters({
      workMode: new Set(),
      employmentType: new Set(),
      experience: new Set(),
      department: new Set(),
      sort: "newest"
    });
  };

  // Mock filtering logic for demonstration
  const filteredJobs = mockJobs.filter(job => {
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.workMode.size > 0 && !filters.workMode.has(job.workMode)) return false;
    if (filters.employmentType.size > 0 && !filters.employmentType.has(job.employmentType)) return false;
    if (filters.experience.size > 0 && !filters.experience.has(job.experienceLevel)) return false;
    if (filters.department.size > 0 && !filters.department.has(job.department)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - Filters */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-6">
              <AdvancedFilters 
                filters={filters} 
                onFilterChange={setFilters} 
                onClear={handleClearFilters}
              />
            </div>
          </div>

          {/* Center Column - Search & Results */}
          <div className="lg:col-span-6 space-y-6">
            <HeroSearch 
              onSearch={setSearchQuery}
              onQuickFilter={(filter) => {
                const newFilters = { ...filters };
                if (["REMOTE", "HYBRID", "ON_SITE"].includes(filter)) {
                  newFilters.workMode = new Set([filter]);
                } else {
                  newFilters.employmentType = new Set([filter]);
                }
                setFilters(newFilters);
              }}
              onViewSaved={() => void 0}
              onViewRecent={() => void 0}
            />

            {/* Mobile Filters Trigger could go here */}

            <JobList 
              jobs={filteredJobs}
              onQuickView={handleQuickView}
              onApply={handleApply}
              onSave={handleSave}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Right Column - Widgets */}
          <div className="lg:col-span-3 space-y-6">
            <div className="sticky top-6 space-y-6">
              <RecommendedJobs jobs={mockRecommendedJobs} />
              <SavedJobsWidget jobs={mockSavedJobs} onRemove={(id) => void 0} />
              <RecentlyAppliedWidget jobs={mockAppliedJobs} />
              <RecentlyViewedWidget jobs={mockRecentlyViewed} />
            </div>
          </div>

        </div>
      </div>

      <JobPreviewDrawer 
        job={selectedJob}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onApply={handleApply}
        onSave={handleSave}
      />
    </div>
  );
}
