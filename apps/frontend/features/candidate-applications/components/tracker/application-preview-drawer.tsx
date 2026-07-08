import * as React from "react";
import { Application } from "../../types";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Target, UserCircle, FileText } from "lucide-react";
import Link from "next/link";
import { StatusChip } from "@/components/display/status-chip";
import { Progress } from "@/components/ui/primitives";
import { formatDistanceToNow } from "date-fns";

interface ApplicationPreviewDrawerProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onWithdraw?: (application: Application) => void;
}

export function ApplicationPreviewDrawer({ application, isOpen, onClose, onWithdraw }: ApplicationPreviewDrawerProps) {
  if (!application) return null;

  const getStatusType = (status: Application["status"]) => {
    switch (status) {
      case "ACTIVE": return "info";
      case "WITHDRAWN": return "neutral";
      case "REJECTED": return "danger";
      case "HIRED": return "success";
      default: return "neutral";
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-w-md w-full ml-auto h-[100dvh] right-0 flex flex-col">
        <DrawerHeader className="border-b border-[hsl(var(--border))] text-left pt-6">
          <div className="flex gap-4 items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0">
              {application.companyLogoUrl ? (
                <img src={application.companyLogoUrl} alt={application.companyName} className="w-10 h-10 object-contain rounded" />
              ) : (
                <Building2 className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <DrawerTitle className="text-xl font-bold text-[hsl(var(--foreground))]">{application.jobTitle}</DrawerTitle>
              </div>
              <div className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2 mt-1 flex-wrap">
                <span className="font-medium text-[hsl(var(--foreground))]">{application.companyName}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {application.location}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-2 items-center">
            <StatusChip variant={getStatusType(application.status) as any} label={application.status} />
            <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Stage: <span className="text-[hsl(var(--primary))] capitalize">{application.stage.replace("_", " ").toLowerCase()}</span></span>
          </div>
        </DrawerHeader>
        
        <DrawerBody className="flex-grow overflow-y-auto p-6 space-y-6">
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[hsl(var(--foreground))]">Progress</span>
              <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{application.progressPercentage}%</span>
            </div>
            <Progress value={application.progressPercentage} className="h-2" />
          </div>

          <div className="bg-[hsl(var(--primary)/0.05)] border border-[hsl(var(--primary)/0.2)] rounded-lg p-4 flex items-start gap-3">
            <Target className="h-5 w-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                {application.insights.matchScore}% Application Match
              </h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                Based on your {application.candidateSnapshot.topSkills.join(", ")} skills.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">Recent Activity</h3>
            <div className="space-y-4">
              {application.timeline.slice(0, 3).map((event, i) => (
                <div key={event.id} className="flex gap-3">
                  <div className="mt-1 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{event.title}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">Application Details</h3>
            <div className="space-y-3 bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <FileText className="h-4 w-4 shrink-0" />
                Resume: <span className="font-medium text-[hsl(var(--foreground))]">{application.resume.name}</span>
              </div>
              {application.assignedRecruiter && (
                <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <UserCircle className="h-4 w-4 shrink-0" />
                  Recruiter: <span className="font-medium text-[hsl(var(--foreground))]">{application.assignedRecruiter.name}</span>
                </div>
              )}
            </div>
          </div>
          
        </DrawerBody>
        
        <DrawerFooter className="border-t border-[hsl(var(--border))] grid grid-cols-2 gap-3 p-6">
          <Button variant="outline" onClick={() => onWithdraw?.(application)} className="w-full text-[hsl(var(--danger))] hover:text-[hsl(var(--danger))] hover:bg-[hsl(var(--danger)/0.1)] border-[hsl(var(--danger)/0.3)]">
            Withdraw
          </Button>
          <Button variant="primary" asChild className="w-full">
            <Link href={`/applications/${application.id}`}>Full Details</Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
