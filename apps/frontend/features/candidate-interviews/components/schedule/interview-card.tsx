import * as React from "react";
import { Interview, InterviewStatus } from "../../types";
import { Card } from "@/components/cards/card";
import { StatusChip } from "@/components/display/status-chip";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MapPin, Users, Phone, ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InterviewCardProps {
  interview: Interview;
  onConfirm?: (interview: Interview) => void;
}

const InterviewCardBase = ({ interview, onConfirm }: InterviewCardProps) => {
  
  const getStatusVariant = (status: InterviewStatus) => {
    switch(status) {
      case "SCHEDULED": return "info";
      case "CONFIRMED": return "success";
      case "IN_PROGRESS": return "warning";
      case "COMPLETED": return "neutral";
      case "CANCELLED": return "error";
      case "NO_SHOW": return "error";
      default: return "neutral";
    }
  };

  const isUpcoming = interview.status === "SCHEDULED" || interview.status === "CONFIRMED";

  return (
    <Card className="hover:border-[hsl(var(--primary)/0.3)] transition-all overflow-hidden flex flex-col">
      <div className="p-5 flex-1 space-y-4 border-b border-[hsl(var(--border))]">
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {interview.companyLogoUrl ? (
              <img src={interview.companyLogoUrl} alt={interview.companyName} className="h-10 w-10 rounded object-cover border border-[hsl(var(--border))]" />
            ) : (
              <div className="h-10 w-10 rounded bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center font-bold text-[hsl(var(--muted-foreground))]">
                {interview.companyName.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-semibold text-lg text-[hsl(var(--foreground))] truncate">
                {interview.jobTitle}
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] truncate">
                {interview.companyName}
              </p>
            </div>
          </div>
          <StatusChip variant={getStatusVariant(interview.status)} label={interview.status.replace("_", " ")} className="shrink-0" />
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-[hsl(var(--muted-foreground))] pt-2">
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
            <span className="truncate">{format(new Date(interview.date), "MMM d, yyyy")}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
            <span className="truncate">{format(new Date(interview.date), "h:mm a")} ({interview.durationMinutes}m)</span>
          </div>

          <div className="flex items-center gap-2">
            {interview.meeting.platform === "IN_PERSON" ? (
              <MapPin className="h-4 w-4 shrink-0" />
            ) : interview.meeting.platform === "PHONE" ? (
              <Phone className="h-4 w-4 shrink-0" />
            ) : (
              <Video className="h-4 w-4 shrink-0" />
            )}
            <span className="truncate capitalize">{interview.meeting.platform.replace("_", " ").toLowerCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 shrink-0" />
            <span className="truncate">{interview.panel.length} Interviewer{interview.panel.length !== 1 ? 's' : ''}</span>
          </div>
          
        </div>
      </div>
      
      <div className={cn("p-4 bg-[hsl(var(--muted)/0.3)] flex flex-wrap items-center justify-between gap-3", !isUpcoming && "opacity-80")}>
        <div className="text-sm font-medium text-[hsl(var(--foreground))] truncate max-w-[50%]">
          {interview.round} • {interview.type.replace("_", " ")}
        </div>
        
        <div className="flex items-center gap-2">
          {isUpcoming && interview.confirmationStatus === "PENDING" && (
            <Button size="sm" variant="outline" className="text-[hsl(var(--success))] hover:bg-[hsl(var(--success)/0.1)] border-[hsl(var(--success)/0.3)]" onClick={() => onConfirm?.(interview)}>
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> Confirm
            </Button>
          )}
          {isUpcoming && interview.status === "CONFIRMED" && (
            <Button size="sm" variant="outline" className="text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.1)] border-[hsl(var(--primary)/0.3)]" asChild>
              <a href={interview.meeting.joinUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Join
              </a>
            </Button>
          )}
          <Button size="sm" asChild>
            <Link href={`/interviews/${interview.id}`}>
              Details <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export const InterviewCard = React.memo(InterviewCardBase);
