import * as React from "react";
import { Application } from "../../types";
import { Card } from "@/components/cards/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, GraduationCap, Globe, DollarSign, Clock, CalendarCheck, ExternalLink } from "lucide-react";

export function CandidateSnapshot({ application }: { application: Application }) {
  const { candidate } = application;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-[hsl(var(--foreground))]">
            <Briefcase className="h-5 w-5 text-[hsl(var(--primary))]" />
            Experience & Education
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex flex-col gap-1 pb-3 border-b border-[hsl(var(--border))] last:border-0 last:pb-0">
              <span className="text-[hsl(var(--muted-foreground))] flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider">Total Experience</span>
              <span className="font-medium text-[hsl(var(--foreground))] text-sm">{candidate.experienceYears} Years</span>
            </div>
            <div className="flex flex-col gap-1 pb-3 border-b border-[hsl(var(--border))] last:border-0 last:pb-0">
              <span className="text-[hsl(var(--muted-foreground))] flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"><GraduationCap className="h-3.5 w-3.5" /> Education</span>
              <span className="font-medium text-[hsl(var(--foreground))] text-sm line-clamp-2" title={candidate.education}>{candidate.education || "Not specified"}</span>
            </div>
            <div className="flex flex-col gap-1 pb-3 border-b border-[hsl(var(--border))] last:border-0 last:pb-0">
              <span className="text-[hsl(var(--muted-foreground))] flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"><MapPin className="h-3.5 w-3.5" /> Location</span>
              <span className="font-medium text-[hsl(var(--foreground))] text-sm">{candidate.location || "Not specified"}</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-[hsl(var(--foreground))]">
            <CalendarCheck className="h-5 w-5 text-[hsl(var(--primary))]" />
            Logistics & Requirements
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex flex-col gap-1 pb-3 border-b border-[hsl(var(--border))] last:border-0 last:pb-0">
              <span className="text-[hsl(var(--muted-foreground))] flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"><Clock className="h-3.5 w-3.5" /> Availability</span>
              <span className="font-medium text-[hsl(var(--foreground))] text-sm">{candidate.availability || "Not specified"}</span>
            </div>
            <div className="flex flex-col gap-1 pb-3 border-b border-[hsl(var(--border))] last:border-0 last:pb-0">
              <span className="text-[hsl(var(--muted-foreground))] flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"><Clock className="h-3.5 w-3.5" /> Notice Period</span>
              <span className="font-medium text-[hsl(var(--foreground))] text-sm">{candidate.noticePeriod || "Not specified"}</span>
            </div>
            <div className="flex flex-col gap-1 pb-3 border-b border-[hsl(var(--border))] last:border-0 last:pb-0">
              <span className="text-[hsl(var(--muted-foreground))] flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"><DollarSign className="h-3.5 w-3.5" /> Current / Expected Salary</span>
              <span className="font-medium text-[hsl(var(--foreground))] text-sm">{candidate.currentSalary || "?"} / {candidate.expectedSalary || "?"}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5 space-y-4">
        <h3 className="font-semibold text-lg text-[hsl(var(--foreground))]">Top Skills</h3>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill, idx) => (
            <Badge key={idx} variant="neutral">{skill}</Badge>
          ))}
          {candidate.skills.length === 0 && <span className="text-sm text-[hsl(var(--muted-foreground))]">No skills explicitly listed.</span>}
        </div>
      </Card>

      <Card className="p-5 space-y-4">
        <h3 className="font-semibold text-lg text-[hsl(var(--foreground))]">Links & Portfolios</h3>
        <div className="flex flex-wrap gap-4">
          {candidate.linkedinUrl && (
            <a href={candidate.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors border border-[hsl(var(--border))] rounded-lg px-3 py-2 bg-[hsl(var(--muted)/0.3)]">
              <Globe className="h-4 w-4" /> LinkedIn Profile
            </a>
          )}
          {candidate.githubUrl && (
            <a href={candidate.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors border border-[hsl(var(--border))] rounded-lg px-3 py-2 bg-[hsl(var(--muted)/0.3)]">
              <Globe className="h-4 w-4" /> GitHub Profile
            </a>
          )}
          {candidate.portfolioUrl && (
            <a href={candidate.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors border border-[hsl(var(--border))] rounded-lg px-3 py-2 bg-[hsl(var(--muted)/0.3)]">
              <Globe className="h-4 w-4" /> Personal Portfolio
            </a>
          )}
          {!candidate.linkedinUrl && !candidate.githubUrl && !candidate.portfolioUrl && (
            <span className="text-sm text-[hsl(var(--muted-foreground))]">No external links provided.</span>
          )}
        </div>
      </Card>
      
      {candidate.projects.length > 0 && (
        <Card className="p-5 space-y-4">
          <h3 className="font-semibold text-lg text-[hsl(var(--foreground))]">Highlighted Projects</h3>
          <div className="space-y-4">
            {candidate.projects.map((proj, idx) => (
              <div key={idx} className="border-l-2 border-[hsl(var(--primary)/0.3)] pl-4">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-[hsl(var(--foreground))]">{proj.name}</h4>
                  {proj.url && (
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] hover:underline">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
