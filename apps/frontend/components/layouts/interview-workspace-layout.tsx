"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, ClipboardList, MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

// ─────────────────────────────────────────────────────────────────────────────
// InterviewWorkspaceLayout — focused interview session workspace
// ─────────────────────────────────────────────────────────────────────────────

interface InterviewParticipant {
  name: string;
  role: string;
  avatarSrc?: string;
}

export interface InterviewWorkspaceLayoutProps {
  children: React.ReactNode;
  /** Interview details for the header */
  interviewTitle?: string;
  candidateName?: string;
  jobTitle?: string;
  scheduledAt?: string;
  participants?: InterviewParticipant[];
  /** Back link destination */
  backHref?: string;
  backLabel?: string;
  /** Active tab in the workspace nav */
  activeTab?: "overview" | "scorecard" | "feedback" | "notes";
  interviewId?: string;
}

const workspaceTabs = [
  { id: "overview", label: "Overview", icon: Calendar },
  { id: "scorecard", label: "Scorecard", icon: ClipboardList },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
  { id: "notes", label: "Notes", icon: Users },
] as const;

function InterviewWorkspaceLayout({
  children,
  interviewTitle = "Interview Session",
  candidateName,
  jobTitle,
  scheduledAt,
  participants = [],
  backHref = "/recruiter/interviews",
  backLabel = "Back to Interviews",
  activeTab = "overview",
  interviewId,
}: InterviewWorkspaceLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-[hsl(var(--background))] overflow-hidden">
      {/* ── Workspace Header ─────────────────────────────────────────────── */}
      <header className="shrink-0 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <div className="flex items-center gap-4 px-4 py-3">
          {/* Back */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="shrink-0"
          >
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{backLabel}</span>
            </Link>
          </Button>

          <div className="h-5 w-px bg-[hsl(var(--border))]" />

          {/* Interview info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-[hsl(var(--foreground))] truncate">
              {candidateName ? `${candidateName} — ${interviewTitle}` : interviewTitle}
            </h1>
            {(jobTitle || scheduledAt) && (
              <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                {jobTitle}
                {jobTitle && scheduledAt && " · "}
                {scheduledAt}
              </p>
            )}
          </div>

          {/* Participants */}
          {participants.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Panel:</span>
              <div className="flex -space-x-2">
                {participants.slice(0, 4).map((p) => (
                  <Avatar
                    key={p.name}
                    size="xs"
                    src={p.avatarSrc}
                    name={p.name}
                    className="ring-2 ring-[hsl(var(--background))]"
                  />
                ))}
              </div>
              {participants.length > 4 && (
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  +{participants.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tab navigation */}
        <nav
          className="flex border-t border-[hsl(var(--border))] px-4"
          aria-label="Interview workspace navigation"
        >
          {workspaceTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            const href = interviewId
              ? `/recruiter/interviews/${interviewId}/${tab.id}`
              : "#";
            const Icon = tab.icon;

            return (
              <Link
                key={tab.id}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium",
                  "border-b-2 transition-colors -mb-px",
                  "focus-visible:outline-none",
                  isActive
                    ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                    : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--border))]"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <main
        id="main-content"
        className="flex-1 overflow-y-auto p-4 sm:p-6"
      >
        {children}
      </main>
    </div>
  );
}

export { InterviewWorkspaceLayout };
