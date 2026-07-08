import * as React from "react";
import { Application } from "../../types";
import { Calendar, Clock } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import Link from "next/link";

interface TrackerWidgetsProps {
  applications: Application[];
}

export function TrackerWidgets({ applications }: TrackerWidgetsProps) {
  
  // Extract upcoming interviews
  const upcomingInterviews = applications.flatMap(app => 
    app.interviews
      .filter(i => i.status === "UPCOMING")
      .map(i => ({ ...i, app }))
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);

  // Extract recent timeline events
  const recentActivity = applications.flatMap(app => 
    app.timeline.map(t => ({ ...t, app }))
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      
      {/* Upcoming Interviews Widget */}
      {upcomingInterviews.length > 0 && (
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[hsl(var(--primary))]" />
            Upcoming Interviews
          </h3>
          <div className="space-y-3">
            {upcomingInterviews.map(interview => (
              <div key={interview.id} className="p-3 bg-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))] rounded-lg">
                <Link href={`/applications/${interview.app.id}`} className="font-medium text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors block truncate">
                  {interview.app.companyName} - {interview.app.jobTitle}
                </Link>
                <div className="flex justify-between items-end mt-2">
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">
                    <p>{interview.title} ({interview.type.toLowerCase()})</p>
                    <p className="font-medium text-[hsl(var(--primary))] mt-0.5">{format(new Date(interview.date), "MMM d, h:mm a")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity Widget */}
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
          <Clock className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.map(activity => (
            <div key={`${activity.app.id}-${activity.id}`} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center flex-shrink-0 mt-0.5">
                {activity.app.companyLogoUrl ? (
                  <img src={activity.app.companyLogoUrl} alt={activity.app.companyName} className="w-5 h-5 object-contain" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-[hsl(var(--muted-foreground))]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] truncate mt-0.5">
                  <Link href={`/applications/${activity.app.id}`} className="hover:underline">{activity.app.companyName}</Link>
                </p>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
          {recentActivity.length === 0 && (
            <p className="text-sm text-[hsl(var(--muted-foreground))]">No recent activity.</p>
          )}
        </div>
      </div>

    </div>
  );
}
