import * as React from "react";
import { Application } from "../../types";
import { Card } from "@/components/cards/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";

export function AssignmentCard({ application }: { application: Application }) {
  const { assignment } = application;

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wider flex items-center gap-2">
          <Users className="h-4 w-4" />
          Assignment
        </h3>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <UserPlus className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {assignment.recruiter ? (
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-2 text-sm">
              <Avatar src={assignment.recruiter.avatarUrl} name={assignment.recruiter.name} size="sm" />
              <div>
                <span className="font-medium text-[hsl(var(--foreground))] block">{assignment.recruiter.name}</span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Recruiter</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Change</Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <div className="h-8 w-8 rounded-full border border-dashed border-[hsl(var(--border))] flex items-center justify-center">
              <UserPlus className="h-3.5 w-3.5" />
            </div>
            Unassigned Recruiter
          </div>
        )}

        {assignment.hiringManager && (
          <div className="flex items-center justify-between group pt-3 border-t border-[hsl(var(--border))]">
            <div className="flex items-center gap-2 text-sm">
              <Avatar src={assignment.hiringManager.avatarUrl} name={assignment.hiringManager.name} size="sm" />
              <div>
                <span className="font-medium text-[hsl(var(--foreground))] block">{assignment.hiringManager.name}</span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Hiring Manager</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
