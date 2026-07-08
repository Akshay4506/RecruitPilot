import * as React from "react";
import { RbacRole } from "../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Avatar } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AssignedUsersProps {
  role: RbacRole;
}

export function AssignedUsers({ role }: AssignedUsersProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))] flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Assigned Users</CardTitle>
        <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{role.assignedUsersCount} total</span>
      </CardHeader>
      <CardContent className="pt-6">
        
        {role.assignedUsersCount > 0 ? (
          <div className="space-y-4">
            {/* Mocked user rows */}
            {[1, 2, 3].slice(0, role.assignedUsersCount).map(i => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Avatar name={`User ${i}`} className="h-8 w-8" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[hsl(var(--foreground))]">User {i}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">user{i}@example.com</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">View</Button>
              </div>
            ))}
            
            {role.assignedUsersCount > 3 && (
              <Button variant="outline" className="w-full text-xs">
                View all {role.assignedUsersCount} users
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <Users className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">No users assigned</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Users will appear here once assigned to this role.</span>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
