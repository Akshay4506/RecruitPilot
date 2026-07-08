import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Card } from "@/components/cards/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Mail, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface CandidateCardProps {
  candidate: RecruiterCandidate;
  onPreview: (candidate: RecruiterCandidate) => void;
}

export function CandidateCard({ candidate, onPreview }: CandidateCardProps) {
  const { personalInfo, status, experienceYears, skills, insights } = candidate;

  return (
    <Card className="flex flex-col h-full border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] transition-colors overflow-hidden group">
      <div className="p-5 flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar src={personalInfo.avatarUrl} name={personalInfo.name} size="lg" />
            <div>
              <Link href={`/recruiter/candidates/${candidate.id}`} className="font-semibold text-base text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors line-clamp-1">
                {personalInfo.name}
              </Link>
              <div className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-1">{personalInfo.headline}</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[hsl(var(--muted-foreground))] -mt-1 -mr-1">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant={status === "ACTIVE" ? "success" : status === "INTERVIEWING" ? "warning" : "default"} className="text-[10px] uppercase">
            {status}
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            {experienceYears}y Experience
          </Badge>
          {insights?.overallScore && (
            <Badge variant="outline" className="text-[10px] border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)] text-[hsl(var(--primary))]">
              {insights.overallScore}% Match
            </Badge>
          )}
        </div>

        <div className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{personalInfo.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{candidate.experience[0]?.company || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{personalInfo.email}</span>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="pt-3 border-t border-[hsl(var(--border))]">
            <div className="text-xs font-medium text-[hsl(var(--foreground))] mb-2">Top Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 4).map(skill => (
                <Badge key={skill.id} variant="neutral" className="text-[10px] px-1.5 py-0 h-5 font-normal">
                  {skill.name}
                </Badge>
              ))}
              {skills.length > 4 && (
                <Badge variant="neutral" className="text-[10px] px-1.5 py-0 h-5 font-normal text-[hsl(var(--muted-foreground))]">
                  +{skills.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-[hsl(var(--muted)/0.3)] p-3 border-t border-[hsl(var(--border))] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="sm" className="h-8 text-xs bg-[hsl(var(--background))]" onClick={() => onPreview(candidate)}>
          <Eye className="h-3 w-3 mr-1.5" /> Quick View
        </Button>
        <Button size="sm" className="h-8 text-xs" asChild>
          <Link href={`/recruiter/candidates/${candidate.id}`}>Full Profile</Link>
        </Button>
      </div>
    </Card>
  );
}
