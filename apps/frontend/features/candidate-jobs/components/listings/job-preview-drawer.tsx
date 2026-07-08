import * as React from "react";
import { Job } from "../../types";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, DollarSign, Target, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface JobPreviewDrawerProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply?: (job: Job) => void;
  onSave?: (job: Job) => void;
}

export function JobPreviewDrawer({ job, isOpen, onClose, onApply, onSave }: JobPreviewDrawerProps) {
  if (!job) return null;

  const formatSalary = (salary: Job["salary"]) => {
    if (salary.hideSalary) return "Salary hidden";
    const min = salary.min / 1000;
    const max = salary.max / 1000;
    return `$${min}k - $${max}k ${salary.interval === "YEARLY" ? "/yr" : ""}`;
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-w-md w-full ml-auto h-[100dvh] right-0 flex flex-col">
        <DrawerHeader className="border-b border-[hsl(var(--border))] text-left pt-6">
          <div className="flex gap-4 items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0">
              {job.company.logoUrl ? (
                <img src={job.company.logoUrl} alt={job.company.name} className="w-10 h-10 object-contain rounded" />
              ) : (
                <Building2 className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />
              )}
            </div>
            <div>
              <DrawerTitle className="text-xl font-bold text-[hsl(var(--foreground))]">{job.title}</DrawerTitle>
              <div className="text-sm text-[hsl(var(--muted-foreground))] flex items-center gap-2 mt-1 flex-wrap">
                <span className="font-medium text-[hsl(var(--foreground))]">{job.company.name}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location.city}, {job.location.state}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="neutral">{job.employmentType.replace("_", "-")}</Badge>
            <Badge variant="neutral">{job.workMode}</Badge>
            {!job.salary.hideSalary && (
              <Badge variant="neutral" className="bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success-foreground))]">
                <DollarSign className="h-3 w-3 mr-0.5" />
                {formatSalary(job.salary)}
              </Badge>
            )}
          </div>
        </DrawerHeader>
        
        <DrawerBody className="flex-grow overflow-y-auto p-6 space-y-6">
          
          {job.searchMetadata && job.searchMetadata.matchScore && (
            <div className="bg-[hsl(var(--primary)/0.05)] border border-[hsl(var(--primary)/0.2)] rounded-lg p-4 flex items-start gap-3">
              <Target className="h-5 w-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                  {job.searchMetadata.matchScore}% Match for you
                </h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                  Your profile is a strong match based on your {job.searchMetadata.matchedSkills?.join(", ")} skills.
                </p>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2">About the Role</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              {job.summary}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 8).map(skill => (
                <Badge key={skill.name} variant={skill.type === "MANDATORY" ? "default" : "outline"}>
                  {skill.name}
                </Badge>
              ))}
              {job.skills.length > 8 && (
                <Badge variant="outline">+{job.skills.length - 8} more</Badge>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2">Requirements</h3>
            <ul className="space-y-2">
              {job.requirements.slice(0, 3).map((req, i) => (
                <li key={i} className="text-sm text-[hsl(var(--muted-foreground))] flex items-start gap-2">
                  <span className="text-[hsl(var(--primary))]">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </DrawerBody>
        
        <DrawerFooter className="border-t border-[hsl(var(--border))] grid grid-cols-2 gap-3 p-6">
          <Button variant="outline" onClick={() => onSave?.(job)} className="w-full">
            {job.isSaved ? "Saved" : "Save Job"}
          </Button>
          <Button variant="primary" onClick={() => onApply?.(job)} disabled={job.isApplied} className="w-full">
            {job.isApplied ? (
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4"/> Applied</span>
            ) : "Quick Apply"}
          </Button>
          <Button variant="ghost" className="col-span-2 w-full text-xs" asChild>
            <Link href={`/jobs/${job.id}`}>View Full Details</Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
