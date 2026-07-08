import {
  LayoutDashboard,
  Briefcase,
  Users,
  CalendarDays,
  FileText,
  Bell,
  UserCircle,
  BarChart3,
  Settings,
  Building2,
  Layers,
  ClipboardList,
  CreditCard,
  ShieldCheck,
  FolderOpen,
  Search,
  TrendingUp,
  Download,
  BookOpen,
  Star,
  Zap,
} from "lucide-react";
import type { NavConfig, NavRole } from "@/types/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Candidate Navigation
// ─────────────────────────────────────────────────────────────────────────────

export const candidateNav: NavConfig = {
  role: "candidate",
  sections: [
    {
      id: "main",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/candidate/dashboard",
          icon: LayoutDashboard,
          description: "Your activity overview",
          keywords: ["home", "overview"],
        },
        {
          id: "browse-jobs",
          label: "Browse Jobs",
          href: "/candidate/jobs",
          icon: Search,
          description: "Discover open positions",
          keywords: ["jobs", "positions", "openings"],
        },
        {
          id: "applications",
          label: "My Applications",
          href: "/candidate/applications",
          icon: FileText,
          description: "Track your job applications",
          keywords: ["applied", "applications"],
        },
        {
          id: "interviews",
          label: "Interviews",
          href: "/candidate/interviews",
          icon: CalendarDays,
          description: "Upcoming and past interviews",
          keywords: ["schedule", "interview", "calendar"],
        },
        {
          id: "saved-jobs",
          label: "Saved Jobs",
          href: "/candidate/saved",
          icon: Star,
          keywords: ["bookmarks", "saved", "wishlist"],
        },
      ],
    },
    {
      id: "profile",
      label: "Profile",
      items: [
        {
          id: "my-profile",
          label: "My Profile",
          href: "/candidate/profile",
          icon: UserCircle,
          description: "Edit your candidate profile",
        },
        {
          id: "documents",
          label: "Documents",
          href: "/candidate/documents",
          icon: FolderOpen,
          description: "Resume, portfolios and files",
        },
      ],
    },
  ],
  footerItems: [
    {
      id: "notifications",
      label: "Notifications",
      href: "/candidate/notifications",
      icon: Bell,
    },
    {
      id: "settings",
      label: "Settings",
      href: "/candidate/settings",
      icon: Settings,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Recruiter Navigation
// ─────────────────────────────────────────────────────────────────────────────

export const recruiterNav: NavConfig = {
  role: "recruiter",
  sections: [
    {
      id: "main",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/recruiter/dashboard",
          icon: LayoutDashboard,
          description: "Recruiting overview",
          keywords: ["home", "overview"],
        },
        {
          id: "jobs",
          label: "Jobs",
          href: "/recruiter/jobs",
          icon: Briefcase,
          description: "Manage job postings",
          keywords: ["positions", "openings", "jds"],
          children: [
            { id: "jobs-all", label: "All Jobs", href: "/recruiter/jobs", icon: Briefcase },
            { id: "jobs-new", label: "Create Job", href: "/recruiter/jobs/new", icon: Briefcase },
          ],
        },
        {
          id: "candidates",
          label: "Candidates",
          href: "/recruiter/candidates",
          icon: Users,
          description: "Candidate pool",
          keywords: ["applicants", "people", "talent"],
        },
        {
          id: "applications",
          label: "Applications",
          href: "/recruiter/applications",
          icon: ClipboardList,
          description: "Track all applications",
          keywords: ["pipeline", "funnel"],
        },
        {
          id: "interviews",
          label: "Interviews",
          href: "/recruiter/interviews",
          icon: CalendarDays,
          description: "Schedule and manage interviews",
          keywords: ["schedule", "calendar"],
        },
      ],
    },
    {
      id: "insights",
      label: "Insights",
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          id: "analytics",
          label: "Analytics",
          href: "/recruiter/analytics",
          icon: BarChart3,
          description: "Hiring metrics and trends",
        },
        {
          id: "evaluations",
          label: "Evaluations",
          href: "/recruiter/evaluations",
          icon: Star,
          description: "Interview scorecards",
        },
      ],
    },
  ],
  footerItems: [
    {
      id: "notifications",
      label: "Notifications",
      href: "/recruiter/notifications",
      icon: Bell,
    },
    {
      id: "settings",
      label: "Settings",
      href: "/recruiter/settings",
      icon: Settings,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Hiring Manager Navigation
// ─────────────────────────────────────────────────────────────────────────────

export const hiringManagerNav: NavConfig = {
  role: "hiring_manager",
  sections: [
    {
      id: "main",
      items: [
        { id: "dashboard", label: "Dashboard", href: "/manager/dashboard", icon: LayoutDashboard },
        { id: "requisitions", label: "Requisitions", href: "/manager/requisitions", icon: Briefcase },
        { id: "candidates", label: "Candidates", href: "/manager/candidates", icon: Users },
        { id: "interviews", label: "Interviews", href: "/manager/interviews", icon: CalendarDays },
        { id: "evaluations", label: "Evaluations", href: "/manager/evaluations", icon: ClipboardList },
      ],
    },
  ],
  footerItems: [
    { id: "settings", label: "Settings", href: "/manager/settings", icon: Settings },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Company Admin Navigation
// ─────────────────────────────────────────────────────────────────────────────

export const companyAdminNav: NavConfig = {
  role: "company_admin",
  sections: [
    {
      id: "main",
      items: [
        { id: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { id: "jobs", label: "Jobs", href: "/admin/jobs", icon: Briefcase },
        { id: "candidates", label: "Candidates", href: "/admin/candidates", icon: Users },
        { id: "team", label: "Team", href: "/admin/team", icon: Users },
        { id: "analytics", label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      id: "administration",
      label: "Administration",
      collapsible: true,
      defaultOpen: false,
      items: [
        { id: "company", label: "Company Profile", href: "/admin/company", icon: Building2 },
        { id: "departments", label: "Departments", href: "/admin/departments", icon: Layers },
        { id: "permissions", label: "Permissions", href: "/admin/permissions", icon: ShieldCheck },
        { id: "billing", label: "Billing & Plan", href: "/admin/billing", icon: CreditCard },
        { id: "integrations", label: "Integrations", href: "/admin/integrations", icon: Zap },
      ],
    },
  ],
  footerItems: [
    { id: "settings", label: "Settings", href: "/admin/settings", icon: Settings },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Analytics Navigation
// ─────────────────────────────────────────────────────────────────────────────

export const analyticsNav: NavConfig = {
  role: "recruiter",
  sections: [
    {
      id: "dashboards",
      label: "Dashboards",
      items: [
        { id: "overview", label: "Overview", href: "/analytics/overview", icon: LayoutDashboard },
        { id: "hiring-funnel", label: "Hiring Funnel", href: "/analytics/funnel", icon: TrendingUp },
        { id: "team-performance", label: "Team Performance", href: "/analytics/team", icon: Users },
        { id: "time-metrics", label: "Time Metrics", href: "/analytics/time", icon: CalendarDays },
        { id: "source-analysis", label: "Source Analysis", href: "/analytics/sources", icon: BarChart3 },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      items: [
        { id: "reports-all", label: "All Reports", href: "/analytics/reports", icon: BookOpen },
        { id: "export", label: "Export Data", href: "/analytics/export", icon: Download },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lookup helper
// ─────────────────────────────────────────────────────────────────────────────

export const navConfigByRole: Record<NavRole, NavConfig> = {
  candidate: candidateNav,
  recruiter: recruiterNav,
  hiring_manager: hiringManagerNav,
  company_admin: companyAdminNav,
  super_admin: companyAdminNav, // Future: dedicated super-admin nav
};
