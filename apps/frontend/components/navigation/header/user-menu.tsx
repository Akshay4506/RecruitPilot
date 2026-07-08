"use client";

import * as React from "react";
import { ChevronDown, LogOut, Settings, User, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/primitives";

interface UserMenuUser {
  name: string;
  email: string;
  avatarSrc?: string;
  role?: string;
}

interface UserMenuProps {
  user: UserMenuUser;
  onSignOut?: () => void;
  onSettings?: () => void;
  onProfile?: () => void;
}

function UserMenu({ user, onSignOut, onSettings, onProfile }: UserMenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuItemClass = cn(
    "flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm",
    "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]",
    "transition-colors cursor-pointer focus:outline-none"
  );

  const nextTheme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-lg px-2 py-1.5",
          "hover:bg-[hsl(var(--accent))] transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
        )}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
      >
        <Avatar size="sm" src={user.avatarSrc} name={user.name} />
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold text-[hsl(var(--foreground))] leading-none">
            {user.name}
          </p>
          <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">
            {user.role ?? user.email}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "hidden sm:block h-3.5 w-3.5 text-[hsl(var(--muted-foreground))] transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border",
            "border-[hsl(var(--border))] bg-[hsl(var(--popover))] shadow-xl p-1",
            "animate-[fade-in-up_150ms_ease-out]"
          )}
          role="menu"
        >
          {/* User info */}
          <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
            <Avatar size="md" src={user.avatarSrc} name={user.name} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[hsl(var(--foreground))] truncate">
                {user.name}
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                {user.email}
              </p>
            </div>
          </div>

          <Separator className="my-1" />

          <button role="menuitem" className={menuItemClass} onClick={onProfile}>
            <User className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            View Profile
          </button>

          <button role="menuitem" className={menuItemClass} onClick={onSettings}>
            <Settings className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            Settings
          </button>

          <Separator className="my-1" />

          {/* Theme toggle */}
          <button
            role="menuitem"
            className={menuItemClass}
            onClick={() => setTheme(nextTheme)}
          >
            <ThemeIcon className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
            <span>
              {theme === "dark" ? "Dark Mode" : theme === "light" ? "Light Mode" : "System Theme"}
            </span>
            <span className="ml-auto text-xs text-[hsl(var(--muted-foreground))]">Toggle</span>
          </button>

          <Separator className="my-1" />

          <button
            role="menuitem"
            className={cn(menuItemClass, "text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive)/0.08)]")}
            onClick={onSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export { UserMenu };
export type { UserMenuUser, UserMenuProps };
