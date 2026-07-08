import { create } from "zustand";
import type { User } from "@/types/auth.types";
import { tokenManager } from "@/lib/api-client";
import { resetStore } from "@/lib/query-client";

// ─────────────────────────────────────────────────────────────────────────────
// Auth store — manages in-memory auth session state
// NOT persisted to localStorage for security
// ─────────────────────────────────────────────────────────────────────────────

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,

  setUser: (user) => set({ user, isAuthenticated: true }),
  setToken: (token) => {
    tokenManager.set(token);
  },
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),

  login: (user, accessToken) => {
    tokenManager.set(accessToken);
    set({ user, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    tokenManager.clear();
    resetStore(); // Clear all TanStack Query cache
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
}));
