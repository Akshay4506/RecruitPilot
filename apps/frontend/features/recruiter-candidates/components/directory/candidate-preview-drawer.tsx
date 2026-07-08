import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody } from "@/components/ui/drawer";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Mail, Phone, CalendarDays, ExternalLink, Download } from "lucide-react";
import Link from "next/link";

interface CandidatePreviewDrawerProps {
  candidate: RecruiterCandidate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CandidatePreviewDrawer({ candidate, isOpen, onClose }: CandidatePreviewDrawerProps) {
  if (!candidate) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent side="right" size="md">
        <DrawerHeader>
          <DrawerTitle>Candidate Quick View</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="space-y-6">
        <div className="flex items-start gap-4 pb-6 border-b border-[hsl(var(--border))]">
          <Avatar src={candidate.personalInfo.avatarUrl} name={candidate.personalInfo.name} size="xl" />
          <div className="space-y-1.5 flex-1">
            <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">{candidate.personalInfo.name}</h2>
            <p className="font-medium text-[hsl(var(--primary))]">{candidate.personalInfo.headline}</p>
            
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant={candidate.status === "ACTIVE" ? "success" : candidate.status === "INTERVIEWING" ? "warning" : "default"} className="text-[10px] uppercase">
                {candidate.status}
              </Badge>
              {candidate.insights?.overallScore && (
                <Badge variant="outline" className="text-[10px] border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)] text-[hsl(var(--primary))]">
                  {candidate.insights.overallScore}% Match
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-[hsl(var(--muted-foreground))]">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[hsl(var(--foreground))]" /> {candidate.personalInfo.location}
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-[hsl(var(--foreground))]" /> {candidate.experienceYears} Years Exp
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[hsl(var(--foreground))]" /> {candidate.personalInfo.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-[hsl(var(--foreground))]" /> {candidate.personalInfo.phone}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2 text-sm uppercase tracking-wider">Professional Summary</h4>
          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            {candidate.personalInfo.summary}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2 text-sm uppercase tracking-wider">Top Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.map(skill => (
              <Badge key={skill.id} variant="neutral" className="font-normal">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
        
        {candidate.applications.length > 0 && (
          <div>
            <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2 text-sm uppercase tracking-wider">Active Applications</h4>
            <div className="space-y-2">
              {candidate.applications.map(app => (
                <div key={app.id} className="p-3 bg-[hsl(var(--muted)/0.3)] rounded-lg border border-[hsl(var(--border))] flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm text-[hsl(var(--foreground))]">{app.jobTitle}</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1 mt-1">
                      <CalendarDays className="h-3 w-3" /> Applied {new Date(app.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge variant="outline">{app.stage}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 pt-4 border-t border-[hsl(var(--border))]">
          <Button asChild className="w-full">
            <Link href={`/recruiter/candidates/${candidate.id}`}>
              View Full Profile <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" /> Download Resume
          </Button>
        </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
