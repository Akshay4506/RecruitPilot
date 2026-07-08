"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/lib/animations";

import { HeroCard, HeroCardSkeleton } from "./components/hero-card";
import { CareerSnapshot, CareerSnapshotSkeleton } from "./components/career-snapshot";
import { TalentInsights, TalentInsightsSkeleton } from "./components/talent-insights";
import { ApplicationsSummary, ApplicationsSummarySkeleton } from "./components/applications-summary";
import { UpcomingInterviews, UpcomingInterviewsSkeleton } from "./components/upcoming-interviews";
import { ResumeCard, ResumeCardSkeleton } from "./components/resume-card";
import { ActivityTimeline, ActivityTimelineSkeleton } from "./components/activity-timeline";
import { RecommendedJobs, RecommendedJobsSkeleton } from "./components/recommended-jobs";
import { ProfileCompletion, ProfileCompletionSkeleton } from "./components/profile-completion";
import { QuickActions, QuickActionsSkeleton } from "./components/quick-actions";

export function CandidateDashboard() {
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate network request for the mock data
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1s skeleton loading
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <HeroCardSkeleton />
            <ApplicationsSummarySkeleton />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CareerSnapshotSkeleton />
              <ActivityTimelineSkeleton />
            </div>
          </div>
          
          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <TalentInsightsSkeleton />
            <UpcomingInterviewsSkeleton />
            <ProfileCompletionSkeleton />
            <ResumeCardSkeleton />
            <QuickActionsSkeleton />
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-4">
          <RecommendedJobsSkeleton />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto space-y-6"
      variants={stagger()}
      initial="hidden"
      animate="show"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <motion.div variants={fadeUp}>
            <HeroCard />
          </motion.div>
          <motion.div variants={fadeUp}>
            <ApplicationsSummary />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fadeUp} className="h-full">
              <CareerSnapshot />
            </motion.div>
            <motion.div variants={fadeUp} className="h-full">
              <ActivityTimeline />
            </motion.div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <motion.div variants={fadeUp}>
            <TalentInsights />
          </motion.div>
          <motion.div variants={fadeUp}>
            <UpcomingInterviews />
          </motion.div>
          <motion.div variants={fadeUp}>
            <ProfileCompletion />
          </motion.div>
          <motion.div variants={fadeUp}>
            <ResumeCard />
          </motion.div>
          <motion.div variants={fadeUp}>
            <QuickActions />
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <motion.div variants={fadeUp} className="pt-4">
        <RecommendedJobs />
      </motion.div>
    </motion.div>
  );
}
