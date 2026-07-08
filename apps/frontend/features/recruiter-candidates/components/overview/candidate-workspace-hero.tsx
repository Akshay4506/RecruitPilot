import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Mail, Phone, ExternalLink, CalendarDays, MoreHorizontal } from "lucide-react";

export function CandidateWorkspaceHero({ candidate }: { candidate: RecruiterCandidate }) {
  const { personalInfo, status, experienceYears, insights } = candidate;

  return (
    <div className="bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 py-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        <div className="flex items-start gap-6">
          <Avatar src={personalInfo.avatarUrl} name={personalInfo.name} size="2xl" className="border-4 border-[hsl(var(--background))] shadow-sm" />
          <div className="space-y-2 mt-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">{personalInfo.name}</h1>
              <Badge variant={status === "ACTIVE" ? "success" : status === "INTERVIEWING" ? "warning" : "default"} className="uppercase">
                {status}
              </Badge>
              {insights?.overallScore && (
                <Badge variant="outline" className="border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)] text-[hsl(var(--primary))]">
                  {insights.overallScore}% Match
                </Badge>
              )}
            </div>
            
            <p className="text-lg font-medium text-[hsl(var(--primary))]">{personalInfo.headline}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--muted-foreground))] pt-1">
              <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {personalInfo.location}</div>
              <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {experienceYears} Years Exp</div>
              <div className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {personalInfo.email}</div>
              <div className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> {personalInfo.phone}</div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] flex items-center gap-1 bg-[hsl(var(--muted)/0.5)] px-2 py-1 rounded-md transition-colors">
                  LinkedIn <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] flex items-center gap-1 bg-[hsl(var(--muted)/0.5)] px-2 py-1 rounded-md transition-colors">
                  GitHub <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {personalInfo.portfolioUrl && (
                <a href={personalInfo.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] flex items-center gap-1 bg-[hsl(var(--muted)/0.5)] px-2 py-1 rounded-md transition-colors">
                  Portfolio <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Button variant="outline" className="gap-2 bg-[hsl(var(--background))]">
            <CalendarDays className="h-4 w-4" /> Schedule Call
          </Button>
          <Button className="gap-2">
            Proceed to Next Stage
          </Button>
          <Button variant="ghost" size="icon" className="shrink-0 bg-[hsl(var(--muted)/0.3)]">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
