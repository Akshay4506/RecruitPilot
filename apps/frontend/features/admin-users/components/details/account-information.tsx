import * as React from "react";
import { User } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Mail, Briefcase, MapPin, Building2, Users2, Clock } from "lucide-react";

interface AccountInformationProps {
  user: User;
}

export function AccountInformation({ user }: AccountInformationProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Account Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Email Address</span>
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
              <Mail className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> {user.email}
            </div>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Job Title</span>
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
              <Briefcase className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> {user.profile.title || "-"}
            </div>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Location</span>
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
              <MapPin className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> {user.profile.location || "-"}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Department</span>
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
              <Building2 className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> {user.department?.name || "-"}
            </div>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Team</span>
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
              <Users2 className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> {user.team?.name || "-"}
            </div>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Timezone</span>
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
              <Clock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" /> {user.profile.timezone || "-"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
