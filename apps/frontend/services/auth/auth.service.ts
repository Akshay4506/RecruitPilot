import { get, post } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/constants/routes";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  RefreshResponse,
  User,
} from "@/types/auth.types";

// ─────────────────────────────────────────────────────────────────────────────
// Auth service — wraps all auth-related API calls
// ─────────────────────────────────────────────────────────────────────────────

export const authService = {
  login: (data: LoginRequest) =>
    post<LoginResponse>(API_ENDPOINTS.auth.login, data),

  register: (data: RegisterRequest) =>
    post<LoginResponse>(API_ENDPOINTS.auth.register, data),

  logout: () =>
    post<void>(API_ENDPOINTS.auth.logout),

  refresh: () =>
    post<RefreshResponse>(API_ENDPOINTS.auth.refresh),

  getMe: () =>
    get<User>(API_ENDPOINTS.auth.me),

  forgotPassword: (data: ForgotPasswordRequest) =>
    post<{ message: string }>(API_ENDPOINTS.auth.forgotPassword, data),

  resetPassword: (data: ResetPasswordRequest) =>
    post<{ message: string }>(API_ENDPOINTS.auth.resetPassword, data),

  verifyEmail: (token: string) =>
    post<{ message: string }>(API_ENDPOINTS.auth.verifyEmail, { token }),

  changePassword: (data: ChangePasswordRequest) =>
    post<{ message: string }>("/auth/change-password", data),
};
