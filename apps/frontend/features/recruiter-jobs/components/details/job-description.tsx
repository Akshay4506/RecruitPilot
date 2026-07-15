import * as React from "react";
import { Job } from "../../types";

interface JobDescriptionProps {
  job: Job;
}

export function JobDescription({ job }: JobDescriptionProps) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-3">About the Role</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] whitespace-pre-line leading-relaxed">
          {job.summary}
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-3">Key Responsibilities</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
          {job.responsibilities.map((resp) => (
            <li key={resp}>{resp}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-3">Requirements</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
          {job.requirements.map((req) => (
            <li key={req.id}>
              <span className={req.isMandatory ? "font-medium text-[hsl(var(--foreground))]" : ""}>{req.content}</span>
              {!req.isMandatory && <span className="text-xs ml-2 opacity-70">(Preferred)</span>}
            </li>
          ))}
        </ul>
      </section>

      {job.qualifications.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-3">Qualifications</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            {job.qualifications.map((qual) => (
              <li key={qual}>{qual}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
