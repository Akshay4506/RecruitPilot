import * as React from "react";
import { BasicInformationSection } from "./basic-information-section";
import { RequirementsSection } from "./requirements-section";
import { SkillsTechnologiesSection } from "./skills-technologies-section";
import { SalaryBenefitsSection } from "./salary-benefits-section";
import { HiringTeamSection } from "./hiring-team-section";
import { AttachmentsSection } from "./attachments-section";
import { PublishingSettingsSection } from "./publishing-settings-section";
import { ReviewSubmitSection } from "./review-submit-section";
import { Job } from "../../types";

interface JobFormProps {
  initialData?: Job;
  mode: "create" | "edit";
}

export function JobForm({ initialData, mode }: JobFormProps) {
  return (
    <form className="space-y-12 max-w-4xl pb-24" onSubmit={(e) => e.preventDefault()}>
      <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 sm:p-8 shadow-sm">
        <BasicInformationSection />
      </section>

      <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 sm:p-8 shadow-sm">
        <RequirementsSection />
      </section>

      <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 sm:p-8 shadow-sm">
        <SkillsTechnologiesSection />
      </section>

      <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 sm:p-8 shadow-sm">
        <SalaryBenefitsSection />
      </section>

      <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 sm:p-8 shadow-sm">
        <HiringTeamSection />
      </section>

      <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 sm:p-8 shadow-sm">
        <AttachmentsSection />
      </section>

      <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 sm:p-8 shadow-sm">
        <PublishSettingsWrapper />
      </section>

      <section className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 sm:p-8 shadow-sm border-t-4 border-t-green-500">
        <ReviewSubmitSection />
      </section>
    </form>
  );
}

// Just a wrapper to rename the import locally
function PublishSettingsWrapper() {
  return <PublishingSettingsSection />;
}
