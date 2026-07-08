import * as React from "react";
import { Application } from "../../types";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";

export function ApplicationPreviewDrawer({ 
  application, 
  isOpen, 
  onClose 
}: { 
  application: Application | null, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  if (!application) return null;

  const { candidate, job, matchScore, status, stage, screeningAnswers } = application;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-full w-[400px] sm:w-[500px] mt-0 rounded-none overflow-y-auto">
        <DrawerHeader className="text-left border-b border-[hsl(var(--border))] pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar src={candidate.avatarUrl} name={candidate.name} size="xl" />
              <div>
                <DrawerTitle className="text-xl">{candidate.name}</DrawerTitle>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">Applying for: <span className="font-medium text-[hsl(var(--foreground))]">{job.title}</span></p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={status === "REJECTED" ? "destructive" : status === "HIRED" ? "success" : "default"}>{status.replace("_", " ")}</Badge>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">&bull; {stage}</span>
                </div>
              </div>
            </div>
          </div>
        </DrawerHeader>

        <div className="p-6 space-y-8">
          {/* Match Score & Summary */}
          <div className="p-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm flex items-start gap-4">
            <div className="h-12 w-12 shrink-0 rounded-full bg-[hsl(var(--success)/0.1)] flex items-center justify-center border border-[hsl(var(--success)/0.2)]">
              <span className="text-lg font-bold text-[hsl(var(--success))]">{matchScore}</span>
            </div>
            <div>
              <h4 className="font-medium text-[hsl(var(--foreground))]">Strong Candidate</h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">Matches {matchScore}% of the requirements. Strong experience in required technologies.</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Experience</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Briefcase className="h-4 w-4 text-[hsl(var(--primary))]" />
                {candidate.experienceYears} Years
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Location</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-[hsl(var(--primary))]" />
                {candidate.location}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Applied</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-[hsl(var(--primary))]" />
                {formatRelativeTime(application.appliedAt)}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Resume</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-[hsl(var(--primary))]" />
                {candidate.resumeVersion || "Attached"}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] uppercase tracking-wider">Top Skills</h4>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.slice(0, 8).map((skill, idx) => (
                <Badge key={idx} variant="outline" className="bg-[hsl(var(--muted)/0.5)]">{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Screening Highlights */}
          {screeningAnswers.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] uppercase tracking-wider">Screening Highlights</h4>
              <div className="space-y-4">
                {screeningAnswers.slice(0, 2).map(sa => (
                  <div key={sa.id} className="text-sm">
                    <p className="font-medium text-[hsl(var(--foreground))]">{sa.question}</p>
                    <p className="text-[hsl(var(--muted-foreground))] mt-1 line-clamp-2">{sa.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto p-6 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)] flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Close</Button>
          <Button className="flex-1" asChild>
            <Link href={`/recruiter/applications/${application.id}`}>Open Review Workspace</Link>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
