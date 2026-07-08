import { type LucideIcon } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Roles
// ─────────────────────────────────────────────────────────────────────────────

export type NavRole =
  | "candidate"
  | "recruiter"
  | "hiring_manager"
  | "company_admin"
  | "super_admin";

// ─────────────────────────────────────────────────────────────────────────────
// Badge
// ─────────────────────────────────────────────────────────────────────────────

export interface NavBadge {
  value: string | number;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
}

// ─────────────────────────────────────────────────────────────────────────────
// Item
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  /** Nested children — one level deep supported in sidebar */
  children?: NavItem[];
  /** Roles allowed to see this item. Undefined = all roles */
  roles?: NavRole[];
  isExternal?: boolean;
  isDisabled?: boolean;
  /** Used in CommandPalette search */
  description?: string;
  /** Short keyword for keyboard search */
  keywords?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Section (group of nav items with optional heading)
// ─────────────────────────────────────────────────────────────────────────────

export interface NavSection {
  id: string;
  label?: string;
  /** If true, section heading acts as a collapsible toggle */
  collapsible?: boolean;
  defaultOpen?: boolean;
  items: NavItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Config per role
// ─────────────────────────────────────────────────────────────────────────────

export interface NavConfig {
  role: NavRole;
  sections: NavSection[];
  /** Items pinned to the sidebar bottom, above the user footer */
  footerItems?: NavItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumb
// ─────────────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Workspace
// ─────────────────────────────────────────────────────────────────────────────

export interface Workspace {
  id: string;
  name: string;
  logo?: string;
  plan?: string;
}
