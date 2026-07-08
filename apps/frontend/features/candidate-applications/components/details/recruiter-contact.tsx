import * as React from "react";
import { Application } from "../../types";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface RecruiterContactProps {
  application: Application;
}

export function RecruiterContact({ application }: RecruiterContactProps) {
  if (!application.assignedRecruiter) return null;
  const recruiter = application.assignedRecruiter;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-[hsl(var(--primary))]" />
        Your Point of Contact
      </h2>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-[hsl(var(--primary)/0.2)]" src={recruiter.avatarUrl} name={recruiter.name} fallbackClassName="bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] font-semibold text-xl" />
          <div>
            <h3 className="font-semibold text-[hsl(var(--foreground))] text-lg">{recruiter.name}</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{recruiter.role}{recruiter.department ? ` • ${recruiter.department}` : ''}</p>
            {recruiter.responseTime && (
              <p className="text-xs text-[hsl(var(--success))] font-medium mt-1">{recruiter.responseTime}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 min-w-[140px]">
          <Button variant="outline" className="w-full text-xs h-9 justify-start" disabled>
            <MessageSquare className="h-4 w-4 mr-2" /> Message
          </Button>
          <Button variant="outline" className="w-full text-xs h-9 justify-start" disabled>
            <Mail className="h-4 w-4 mr-2" /> Email
          </Button>
        </div>

      </div>
    </div>
  );
}
