"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Briefcase, Users, CalendarDays, Settings, BarChart3, Search, UserCircle, BriefcaseBusiness
} from "lucide-react";
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
} from "@/components/ui/command";

// Import existing React Query hooks (scaffolded in Phase 5B)
import { useJob as useJobs } from "@/features/recruiter-jobs/hooks/use-jobs";
import { useCandidate as useCandidates } from "@/features/recruiter-candidates/hooks/use-candidates";
import { useUser as useUsers } from "@/features/admin-users/hooks/use-users";
import { useDebounce } from "@/hooks/use-debounce";

// ─────────────────────────────────────────────────────────────────────────────
// Global Command Palette with Ctrl/Cmd+K shortcut
// ─────────────────────────────────────────────────────────────────────────────

interface GlobalCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickNavItems = [
  { id: "dashboard", label: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard, shortcut: "G D" },
  { id: "jobs", label: "Jobs", href: "/recruiter/jobs", icon: Briefcase, shortcut: "G J" },
  { id: "candidates", label: "Candidates", href: "/recruiter/candidates", icon: Users, shortcut: "G C" },
  { id: "interviews", label: "Interviews", href: "/recruiter/interviews", icon: CalendarDays, shortcut: "G I" },
  { id: "analytics", label: "Analytics", href: "/recruiter/analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", href: "/admin/platform", icon: Settings },
];

const quickActions = [
  { id: "new-job", label: "Create New Job", href: "/recruiter/jobs/new", icon: BriefcaseBusiness },
  { id: "new-application", label: "Add Candidate", href: "/recruiter/candidates/new", icon: UserCircle },
  { id: "schedule-interview", label: "Schedule Interview", href: "/recruiter/interviews/new", icon: CalendarDays },
];

function GlobalCommandPalette({ open, onOpenChange }: GlobalCommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 200);

  // We reuse the React Query hooks from Sprint 5B.
  // The mock services currently return arrays of `any[]`, so we can do client-side filtering.
  const { data: jobsData = [], isLoading: loadingJobs } = useJobs();
  const { data: candidatesData = [], isLoading: loadingCandidates } = useCandidates();
  const { data: usersData = [], isLoading: loadingUsers } = useUsers();

  const runCommand = React.useCallback(
    (cb: () => void) => {
      onOpenChange(false);
      setSearch("");
      cb();
    },
    [onOpenChange]
  );

  const isSearching = search.length > 0;
  const isLoading = loadingJobs || loadingCandidates || loadingUsers;

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search jobs, candidates, users, or navigate..." 
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-1 py-4">
            {isLoading ? (
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Searching...</p>
            ) : (
              <>
                <Search className="h-6 w-6 text-[hsl(var(--muted-foreground))] opacity-40 mb-2" />
                <p className="text-sm text-[hsl(var(--muted-foreground))]">No results found for "{search}"</p>
              </>
            )}
          </div>
        </CommandEmpty>

        {!isSearching && (
          <>
            <CommandGroup heading="Quick Navigation">
              {quickNavItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`navigate ${item.label}`}
                  onSelect={() => runCommand(() => router.push(item.href))}
                >
                  <item.icon className="mr-2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  {item.label}
                  {item.shortcut && (
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Quick Actions">
              {quickActions.map((action) => (
                <CommandItem
                  key={action.id}
                  value={`action ${action.label}`}
                  onSelect={() => runCommand(() => router.push(action.href))}
                >
                  <action.icon className="mr-2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                  {action.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {isSearching && !isLoading && (
          <>
            {jobsData && Array.isArray(jobsData) && jobsData.length > 0 && (
              <CommandGroup heading="Jobs">
                {jobsData.slice(0, 3).map((job: any) => (
                  <CommandItem
                    key={job.id}
                    value={`job ${job.title}`}
                    onSelect={() => runCommand(() => router.push(`/recruiter/jobs/${job.id}`))}
                  >
                    <Briefcase className="mr-2 h-4 w-4 text-[hsl(var(--primary))]" />
                    {job.title}
                    <span className="ml-auto text-xs text-[hsl(var(--muted-foreground))]">{job.department}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {candidatesData && Array.isArray(candidatesData) && candidatesData.length > 0 && (
              <CommandGroup heading="Candidates">
                {candidatesData.slice(0, 3).map((candidate: any) => (
                  <CommandItem
                    key={candidate.id}
                    value={`candidate ${candidate.firstName} ${candidate.lastName}`}
                    onSelect={() => runCommand(() => router.push(`/recruiter/candidates/${candidate.id}`))}
                  >
                    <Users className="mr-2 h-4 w-4 text-[hsl(var(--primary))]" />
                    {candidate.firstName} {candidate.lastName}
                    <span className="ml-auto text-xs text-[hsl(var(--muted-foreground))]">{candidate.status}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {usersData && Array.isArray(usersData) && usersData.length > 0 && (
              <CommandGroup heading="Platform Users">
                {usersData.slice(0, 3).map((user: any) => (
                  <CommandItem
                    key={user.id}
                    value={`user ${user.firstName} ${user.lastName}`}
                    onSelect={() => runCommand(() => router.push(`/admin/users/${user.id}`))}
                  >
                    <UserCircle className="mr-2 h-4 w-4 text-[hsl(var(--primary))]" />
                    {user.firstName} {user.lastName}
                    <span className="ml-auto text-xs text-[hsl(var(--muted-foreground))]">{user.roleId}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}

export { GlobalCommandPalette };
