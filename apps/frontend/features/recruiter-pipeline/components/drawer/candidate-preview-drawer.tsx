import * as React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody } from "@/components/ui/drawer";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Mail, Phone, ExternalLink, Download } from "lucide-react";
import Link from "next/link";
import { PipelineCandidate } from "../../types";

interface CandidatePreviewDrawerProps {
  candidate: PipelineCandidate | null;
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
          <Avatar src={candidate.avatarUrl} name={candidate.name} size="xl" />
          <div className="space-y-1.5 flex-1">
            <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">{candidate.name}</h2>
            <div className="flex items-center text-sm text-[hsl(var(--muted-foreground))] gap-2">
              <Briefcase className="h-4 w-4" />
              <span>{candidate.role}</span>
            </div>
            <div className="flex items-center text-sm text-[hsl(var(--muted-foreground))] gap-2">
              <MapPin className="h-4 w-4" />
              <span>{candidate.experienceYears} Years Exp</span>
            </div>
          </div>
          <Badge variant={candidate.priority === "CRITICAL" ? "destructive" : candidate.priority === "HIGH" ? "warning" : "default"}>
            {candidate.priority}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider">Contact Info</h4>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted)/0.3)] p-2 rounded-md">
              <Mail className="h-4 w-4 text-[hsl(var(--primary))]" />
              {candidate.name.toLowerCase().replace(' ', '.')}@example.com
            </div>
            <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted)/0.3)] p-2 rounded-md">
              <Phone className="h-4 w-4 text-[hsl(var(--primary))]" />
              +1 (555) 123-4567
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2 text-sm uppercase tracking-wider">Top Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.map(skill => (
              <Badge key={skill} variant="neutral" className="font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider">Current Status</h4>
          <div className="bg-[hsl(var(--muted)/0.3)] p-4 rounded-lg space-y-3">
             <div className="flex justify-between items-center text-sm">
                <span className="text-[hsl(var(--muted-foreground))]">Stage</span>
                <span className="font-medium text-[hsl(var(--foreground))]">{candidate.stage}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-[hsl(var(--muted-foreground))]">Match Score</span>
                <span className="font-medium text-[hsl(var(--success))]">{candidate.matchScore}%</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-[hsl(var(--muted-foreground))]">Last Activity</span>
                <span className="font-medium text-[hsl(var(--foreground))]">{new Date(candidate.lastActivity).toLocaleDateString()}</span>
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4 border-t border-[hsl(var(--border))]">
          <Button asChild className="w-full">
            <Link href={`/recruiter/candidates/${candidate.id}`}>
              View Full Workspace <ExternalLink className="ml-2 h-4 w-4" />
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
