import * as React from "react";
import { UpcomingInterview } from "../../types";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, Video, MapPin, Phone, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

interface UpcomingInterviewsProps {
  interviews: UpcomingInterview[];
}

export function UpcomingInterviews({ interviews }: UpcomingInterviewsProps) {
  if (interviews.length === 0) return null;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
        <h3 className="font-semibold text-[hsl(var(--foreground))]">Upcoming Interviews</h3>
        <Link href={ROUTES.recruiter.interviews} className="text-xs font-medium text-[hsl(var(--primary))] hover:underline">
          Calendar
        </Link>
      </div>

      <div className="space-y-4">
        {interviews.map(interview => (
          <div key={interview.id} className="group border border-[hsl(var(--border))] rounded-lg p-3 hover:border-[hsl(var(--primary)/0.5)] transition-colors">
            <Link href={ROUTES.recruiter.interview(interview.id)} className="block">
              <div className="flex items-center gap-3 mb-3">
                <Avatar 
                  src={interview.candidateAvatarUrl} 
                  name={interview.candidateName} 
                  className="h-8 w-8"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] truncate group-hover:text-[hsl(var(--primary))] transition-colors">
                    {interview.candidateName}
                  </h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                    {interview.jobTitle}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                    {format(new Date(interview.date), "h:mm a")}
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    {format(new Date(interview.date), "MMM d")}
                  </p>
                </div>
              </div>
            </Link>

            <div className="flex items-center justify-between pt-3 border-t border-[hsl(var(--border))]">
              <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                <div className="flex items-center gap-1" title="Interview Type">
                  <Calendar className="h-3 w-3" />
                  <span className="capitalize">{interview.type.replace("_", " ").toLowerCase()}</span>
                </div>
                <div className="flex items-center gap-1" title="Platform">
                  {interview.meetingPlatform === "VIDEO" && <Video className="h-3 w-3" />}
                  {interview.meetingPlatform === "IN_PERSON" && <MapPin className="h-3 w-3" />}
                  {interview.meetingPlatform === "PHONE" && <Phone className="h-3 w-3" />}
                  <span className="capitalize">{interview.meetingPlatform.replace("_", " ").toLowerCase()}</span>
                </div>
              </div>
              
              {interview.joinUrl && (
                <Button variant="outline" size="sm" className="h-7 text-xs bg-[hsl(var(--background))]" asChild>
                  <a href={interview.joinUrl} target="_blank" rel="noreferrer">
                    Join <ExternalLink className="h-3 w-3 ml-1.5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
