import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Users, MoreVertical, Trash } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PanelMember } from "../../types";

interface PanelManagementProps {
  panel: PanelMember[];
}

export function PanelManagement({ panel }: PanelManagementProps) {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-3 border-b border-[hsl(var(--border))] flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Users className="h-4 w-4" /> Panel Members
        </CardTitle>
        <Button variant="outline" size="sm" className="h-7 text-xs">Manage</Button>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-[hsl(var(--border))]">
          {panel.map(member => (
            <li key={member.id} className="p-4 flex items-center justify-between hover:bg-[hsl(var(--muted)/0.3)] transition-colors group">
              <div className="flex items-center gap-3">
                <Avatar src={member.avatarUrl} name={member.name} size="md" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[hsl(var(--foreground))]">{member.name}</span>
                    <Badge variant={member.role === 'LEAD' ? 'default' : 'neutral'} className="text-[10px] px-1.5 py-0 h-4">
                      {member.role}
                    </Badge>
                  </div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">{member.title} • {member.department}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon-xs" className="h-7 w-7 text-[hsl(var(--destructive))]">
                  <Trash className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon-xs" className="h-7 w-7 text-[hsl(var(--muted-foreground))]">
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
