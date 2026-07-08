"use client";

import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/constants/query-keys";
import { ROUTES } from "@/constants/routes";
import { authService } from "./auth.service";
import { useAuthStore } from "@/store/auth.store";
import { showErrorToast } from "@/lib/error-handler";
import { toast } from "sonner";
import type { LoginRequest, RegisterRequest } from "@/types/auth.types";

// ─────────────────────────────────────────────────────────────────────────────
// useCurrentUser — fetch authenticated user from /auth/me
// ─────────────────────────────────────────────────────────────────────────────

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: QUERY_KEYS.auth.me,
    queryFn: authService.getMe,
    enabled: isAuthenticated,
    staleTime: 5 * 60_000,
    retry: false,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// useLogin
// ─────────────────────────────────────────────────────────────────────────────

export function useLogin() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      login(response.user, response.tokens.accessToken);
      toast.success(`Welcome back, ${response.user.firstName}!`);
      // Role-based redirect
      const roleRedirects: Record<string, string> = {
        RECRUITER:       ROUTES.recruiter.dashboard,
        CANDIDATE:       ROUTES.candidate.dashboard,
        COMPANY_ADMIN:   ROUTES.admin.dashboard,
        HIRING_MANAGER:  ROUTES.manager.dashboard,
      };
      const dest = roleRedirects[response.user.role] ?? ROUTES.recruiter.dashboard;
      router.replace(dest);
    },
    onError: (error) => showErrorToast(error, "Invalid email or password."),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// useRegister
// ─────────────────────────────────────────────────────────────────────────────

export function useRegister() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      login(response.user, response.tokens.accessToken);
      toast.success("Account created successfully!");
      router.replace(ROUTES.recruiter.dashboard);
    },
    onError: (error) => showErrorToast(error, "Registration failed."),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// useLogout
// ─────────────────────────────────────────────────────────────────────────────

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      router.replace(ROUTES.auth.login);
    },
    onError: () => {
      // Still perform client-side logout even if server call fails
      logout();
      router.replace(ROUTES.auth.login);
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// useForgotPassword
// ─────────────────────────────────────────────────────────────────────────────

export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => toast.success("Password reset email sent. Check your inbox."),
    onError: (error) => showErrorToast(error, "Failed to send reset email."),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// useResetPassword
// ─────────────────────────────────────────────────────────────────────────────

export function useResetPassword() {
  const router = useRouter();
  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully. Please log in.");
      router.replace(ROUTES.auth.login);
    },
    onError: (error) => showErrorToast(error, "Failed to reset password."),
  });
}

