import * as React from "react";
import { Interview } from "../../types";
import { Video, MapPin, Phone, ExternalLink, Link2, Key, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MeetingInfoProps {
  interview: Interview;
}

export function MeetingInfo({ interview }: MeetingInfoProps) {
  
  const { platform, joinUrl, meetingId, passcode, instructions, accessibilityNotes, location } = interview.meeting;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-[hsl(var(--border))] pb-4">
        <div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary)/0.1)] flex items-center justify-center text-[hsl(var(--primary))]">
          {platform === "IN_PERSON" ? <MapPin className="h-5 w-5" /> : platform === "PHONE" ? <Phone className="h-5 w-5" /> : <Video className="h-5 w-5" />}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] capitalize">{platform.replace("_", " ").toLowerCase()} Meeting</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Hosted by {interview.companyName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="space-y-4">
          
          {joinUrl && (
            <div>
              <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-1 flex items-center gap-2">
                <Link2 className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> Join Link
              </p>
              <div className="flex items-center gap-2">
                <a href={joinUrl} target="_blank" rel="noreferrer" className="text-sm text-[hsl(var(--primary))] hover:underline truncate max-w-[200px]">
                  {joinUrl}
                </a>
                <Button size="sm" variant="outline" className="h-7 text-xs" asChild>
                  <a href={joinUrl} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3 mr-1" /> Open</a>
                </Button>
              </div>
            </div>
          )}

          {location && (
            <div>
              <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-1 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> Location
              </p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{location}</p>
            </div>
          )}

          {meetingId && (
            <div>
              <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-1 flex items-center gap-2">
                <Hash className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> Meeting ID
              </p>
              <p className="text-sm text-[hsl(var(--muted-foreground))] font-mono">{meetingId}</p>
            </div>
          )}
          
          {passcode && (
            <div>
              <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-1 flex items-center gap-2">
                <Key className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> Passcode
              </p>
              <p className="text-sm text-[hsl(var(--muted-foreground))] font-mono">{passcode}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          
          {instructions && (
            <div className="bg-[hsl(var(--muted)/0.3)] p-4 rounded-lg border border-[hsl(var(--border))]">
              <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-2">Instructions</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{instructions}</p>
            </div>
          )}
          
          {accessibilityNotes && (
            <div className="bg-[hsl(var(--info)/0.1)] p-4 rounded-lg border border-[hsl(var(--info)/0.2)]">
              <p className="text-sm font-medium text-[hsl(var(--info))] mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" /> Accessibility
              </p>
              <p className="text-sm text-[hsl(var(--info))] opacity-90">{accessibilityNotes}</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// Quick inline Hash icon since lucide-react might not have it imported top level if I missed it
function Hash(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
}
