import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { WorkExperience } from "@/features/candidate-profile/components/experience/work-experience";
import { EducationList } from "@/features/candidate-profile/components/education/education-list";
import { ProjectPortfolio } from "@/features/candidate-profile/components/projects/project-portfolio";
import { SkillsMatrix } from "@/features/candidate-profile/components/skills/skills-matrix";
import { ExtendedWorkExperience, ExtendedEducation, Project, SkillDetail } from "@/features/candidate-profile/types";

export function CandidateProfileTab({ candidate }: { candidate: RecruiterCandidate }) {
  // Map RecruiterCandidate types to CandidatePortal types for reuse
  const extendedExperiences: ExtendedWorkExperience[] = candidate.experience.map(exp => ({
    id: exp.id,
    title: exp.title,
    company: exp.company,
    location: exp.location,
    startDate: exp.startDate,
    endDate: exp.endDate,
    isCurrent: exp.current,
    description: exp.description,
    achievements: [],
    responsibilities: [],
    technologiesUsed: [],
    skillsUsed: []
  }));

  const educations: ExtendedEducation[] = candidate.education.map(edu => ({
    id: edu.id,
    degree: edu.degree,
    institution: edu.institution,
    location: edu.location,
    startDate: edu.startDate,
    endDate: edu.endDate,
    isCurrent: edu.current,
    field: edu.fieldOfStudy,
    description: "",
    activities: []
  }));

  const projects: Project[] = candidate.projects.map(proj => ({
    id: proj.id,
    title: proj.name,
    description: proj.description,
    url: proj.url,
    technologies: proj.technologies,
    role: "Contributor",
    startDate: "",
    isCurrent: true,
    highlights: []
  }));

  const profileSkills: SkillDetail[] = candidate.skills.map(sk => ({
    id: sk.id,
    name: sk.name,
    type: "PRIMARY",
    proficiency: sk.level === "Beginner" ? "BEGINNER" : sk.level === "Intermediate" ? "INTERMEDIATE" : sk.level === "Advanced" ? "ADVANCED" : "EXPERT",
    yearsOfExperience: sk.yearsOfExperience,
    isVerified: true
  }));

  return (
    <div className="space-y-8">
      {extendedExperiences.length > 0 && <WorkExperience experiences={extendedExperiences} />}
      {educations.length > 0 && <EducationList education={educations} />}
      {projects.length > 0 && <ProjectPortfolio projects={projects} />}
      {profileSkills.length > 0 && <SkillsMatrix skills={profileSkills} />}
    </div>
  );
}
