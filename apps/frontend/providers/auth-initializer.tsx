"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useShallow } from "zustand/react/shallow";
import { authService } from "@/services/auth/auth.service";

// ─────────────────────────────────────────────────────────────────────────────
// AuthInitializer — runs once on app mount to restore session
// 1. Calls /auth/refresh (uses HttpOnly refresh cookie automatically)
// 2. If refresh succeeds, stores access token + user in auth store
// 3. If refresh fails, marks session as uninitialized (not logged in)
// ─────────────────────────────────────────────────────────────────────────────

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { login, setLoading, setInitialized } = useAuthStore(
    useShallow((state) => ({
      login: state.login,
      setLoading: state.setLoading,
      setInitialized: state.setInitialized,
    }))
  );

  React.useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        setLoading(true);
        const refreshData = await authService.refresh();
        if (cancelled) return;

        // Set the access token first, then fetch user
        const { tokenManager } = await import("@/lib/api-client");
        tokenManager.set(refreshData.accessToken);

        const user = await authService.getMe();
        if (cancelled) return;

        login(user, refreshData.accessToken);
      } catch {
        // Session expired or no refresh cookie — that's fine, just mark done
        if (!cancelled) {
          setLoading(false);
        }
      } finally {
        if (!cancelled) {
          setInitialized(true);
        }
      }
    }

    restoreSession();

    // Listen for auth:logout events (fired by Axios 401 handler)
    const handleForceLogout = () => {
      const { logout } = useAuthStore.getState();
      logout();
    };
    window.addEventListener("auth:logout", handleForceLogout);

    return () => {
      cancelled = true;
      window.removeEventListener("auth:logout", handleForceLogout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export { AuthInitializer };
