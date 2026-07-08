import * as React from "react";
import { Job } from "../../types";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { JobStatusChip } from "../display/job-status-chip";
import { MapPin, Briefcase, ExternalLink } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { JobSummaryWidget } from "@/components/analytics/job-summary-widget";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface RecruiterJobPreviewDrawerProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RecruiterJobPreviewDrawer({ job, isOpen, onClose }: RecruiterJobPreviewDrawerProps) {
  if (!job) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-full w-[400px] sm:w-[500px] mt-0 rounded-none overflow-y-auto">
        <DrawerHeader className="text-left border-b border-[hsl(var(--border))] pb-6">
          <div className="flex items-start justify-between">
            <div>
              <DrawerTitle className="text-xl font-bold">{job.title}</DrawerTitle>
              <DrawerDescription className="mt-2 flex items-center gap-3 text-sm">
                <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1" /> {job.department}</span>
                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {job.location.city}</span>
              </DrawerDescription>
            </div>
            <JobStatusChip status={job.status} />
          </div>
        </DrawerHeader>

        <div className="p-6 space-y-8">
          {/* Metrics */}
          <section>
            <h4 className="text-sm font-semibold mb-3">Pipeline Overview</h4>
            <JobSummaryWidget 
              variant="compact"
              views={job.analytics.viewsCount}
              applications={job.analytics.applicationsCount}
              interviews={job.analytics.interviewsCount}
              offers={job.analytics.offersCount}
              hires={job.analytics.hiresCount}
              conversionRate={job.analytics.conversionRate}
              className="bg-[hsl(var(--muted)/0.3)] p-4 rounded-xl"
            />
          </section>

          {/* Hiring Team */}
          <section>
            <h4 className="text-sm font-semibold mb-3">Hiring Team</h4>
            <div className="space-y-3">
              {job.hiringTeam.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar src={member.avatarUrl} alt={member.name} name={member.name} size="md" />
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Requirements Preview */}
          <section>
            <h4 className="text-sm font-semibold mb-3">Requirements summary</h4>
            <ul className="list-disc pl-5 text-sm space-y-1 text-[hsl(var(--muted-foreground))]">
              {job.requirements.slice(0, 3).map((req) => (
                <li key={req.id}>{req.content}</li>
              ))}
              {job.requirements.length > 3 && (
                <li>+ {job.requirements.length - 3} more</li>
              )}
            </ul>
          </section>

          {/* Skills Preview */}
          <section>
            <h4 className="text-sm font-semibold mb-3">Top Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 5).map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-[hsl(var(--muted))] text-xs rounded-md">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        </div>

        <DrawerFooter className="border-t border-[hsl(var(--border))] mt-auto">
          <Button className="w-full" asChild>
            <Link href={ROUTES.recruiter.job(job.id)}>
              View Full Details <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
