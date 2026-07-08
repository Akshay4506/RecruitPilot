import * as React from "react";
import { Interview, InterviewStatus } from "../../types";
import { StatusChip } from "@/components/display/status-chip";
import { Calendar, Clock, Video, MapPin, Phone, Hash } from "lucide-react";
import { format } from "date-fns";

interface InterviewDetailHeroProps {
  interview: Interview;
}

export function InterviewDetailHero({ interview }: InterviewDetailHeroProps) {
  
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

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[hsl(var(--primary)/0.05)] rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
        
        <div className="flex items-start gap-4">
          {interview.companyLogoUrl ? (
            <img src={interview.companyLogoUrl} alt={interview.companyName} className="h-16 w-16 rounded-lg object-cover border border-[hsl(var(--border))] shadow-sm bg-white p-1" />
          ) : (
            <div className="h-16 w-16 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center font-bold text-[hsl(var(--muted-foreground))] text-2xl shadow-sm">
              {interview.companyName.charAt(0)}
            </div>
          )}
          
          <div className="space-y-1 mt-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-[hsl(var(--muted-foreground))] flex items-center">
                <Hash className="h-3 w-3 mr-0.5" />
                {interview.interviewNumber}
              </span>
            </div>
            
            <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
              {interview.jobTitle}
            </h1>
            
            <p className="text-lg text-[hsl(var(--muted-foreground))]">
              {interview.companyName}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3 text-sm text-[hsl(var(--foreground))] font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[hsl(var(--primary))]" />
                {format(new Date(interview.date), "EEEE, MMMM d, yyyy")}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[hsl(var(--primary))]" />
                {format(new Date(interview.date), "h:mm a")} ({interview.durationMinutes} min)
              </div>
              <div className="flex items-center gap-2">
                {interview.meeting.platform === "IN_PERSON" ? (
                  <MapPin className="h-4 w-4 text-[hsl(var(--primary))]" />
                ) : interview.meeting.platform === "PHONE" ? (
                  <Phone className="h-4 w-4 text-[hsl(var(--primary))]" />
                ) : (
                  <Video className="h-4 w-4 text-[hsl(var(--primary))]" />
                )}
                <span className="capitalize">{interview.meeting.platform.replace("_", " ").toLowerCase()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 shrink-0">
          <StatusChip variant={getStatusVariant(interview.status)} label={interview.status.replace("_", " ")} />
          <div className="text-right space-y-1">
            <p className="text-sm font-medium text-[hsl(var(--foreground))]">{interview.round}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">{interview.type.replace("_", " ")} Interview</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
