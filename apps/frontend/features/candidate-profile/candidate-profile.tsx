"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { mockCandidateProfile } from "./mock/candidate-profile.mock";
import { mockTimelineEvents } from "../candidate-dashboard/mock-data";

// Components
import { ProfileHeader } from "./components/overview/profile-header";
import { AboutMe } from "./components/overview/about-me";
import { ProfileCompletion } from "./components/overview/profile-completion";
import { ProfileQuickActions } from "./components/overview/profile-quick-actions";
import { WorkExperience } from "./components/experience/work-experience";
import { EducationList } from "./components/education/education-list";
import { ProjectPortfolio } from "./components/projects/project-portfolio";
import { SkillsMatrix } from "./components/skills/skills-matrix";
import { TechStack } from "./components/technologies/tech-stack";
import { Certifications } from "./components/certifications/certifications";
import { Languages } from "./components/languages/languages";
import { ProfessionalReferences } from "./components/references/professional-references";
import { DocumentSummary } from "./components/documents/document-summary";
import { CareerPreferences } from "./components/preferences/career-preferences";
import { ProfessionalPresence } from "./components/social/professional-presence";
import { RecentActivity } from "./components/timeline/recent-activity";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export function CandidateProfile() {
  // In the future, this will be: const { data: profile, isLoading } = useCandidateProfile();
  const profile = mockCandidateProfile;
  const isLoading = false; // Simulate loading state

  const handleEdit = (section: string, id?: string) => {
    // This will open the respective dialog/drawer with the form
    console.log(`Edit ${section}`, id);
  };

  const handleAdd = (section: string) => {
    // This will open the respective dialog/drawer with an empty form
    console.log(`Add ${section}`);
  };

  if (isLoading) {
    // We could render all Skeletons here in the same layout
    return <div className="p-4 md:p-8">Loading Profile...</div>;
  }

  if (!profile) {
    return <div className="p-4 md:p-8">Profile not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Left Column (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div variants={fadeUpItem}>
              <ProfileHeader profile={profile} onEdit={() => handleEdit("Header")} />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <AboutMe profile={profile} onEdit={() => handleEdit("About")} />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <WorkExperience 
                experiences={profile.experience} 
                onAdd={() => handleAdd("Experience")} 
                onEdit={(id) => handleEdit("Experience", id)} 
              />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <EducationList 
                education={profile.education} 
                onAdd={() => handleAdd("Education")} 
                onEdit={(id) => handleEdit("Education", id)} 
              />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <ProjectPortfolio 
                projects={profile.projects} 
                onAdd={() => handleAdd("Project")} 
                onEdit={(id) => handleEdit("Project", id)} 
              />
            </motion.div>
            
            <motion.div variants={fadeUpItem} className="hidden lg:block">
              {/* Activity shows at the bottom of the left column on desktop */}
              <RecentActivity activities={mockTimelineEvents} />
            </motion.div>
          </div>

          {/* Right Column (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div variants={fadeUpItem}>
              <ProfileCompletion profile={profile} />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <ProfileQuickActions />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <CareerPreferences 
                preferences={profile.preferences} 
                onEdit={() => handleEdit("Preferences")} 
              />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <SkillsMatrix 
                skills={profile.skills} 
                onAdd={() => handleAdd("Skill")} 
              />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <TechStack 
                technologies={profile.technologies} 
                onAdd={() => handleAdd("Technology")} 
              />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <ProfessionalPresence 
                profiles={profile.socialProfiles} 
                onAdd={() => handleAdd("SocialProfile")} 
              />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <Languages 
                languages={profile.languages} 
                onAdd={() => handleAdd("Language")} 
              />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <Certifications 
                certifications={profile.certifications} 
                onAdd={() => handleAdd("Certification")} 
              />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <ProfessionalReferences 
                references={profile.references} 
                onAdd={() => handleAdd("Reference")} 
              />
            </motion.div>
            
            <motion.div variants={fadeUpItem}>
              <DocumentSummary 
                profile={profile} 
                onUpload={() => handleAdd("Document")} 
              />
            </motion.div>

            <motion.div variants={fadeUpItem} className="lg:hidden block">
              {/* Activity shows at the very bottom on mobile */}
              <RecentActivity activities={mockTimelineEvents} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
