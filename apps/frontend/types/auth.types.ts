import type { BaseEntity } from "./api.types";

// ─────────────────────────────────────────────────────────────────────────────
// User & Auth domain types
// ─────────────────────────────────────────────────────────────────────────────

export type UserRole =
  | "CANDIDATE"
  | "RECRUITER"
  | "HIRING_MANAGER"
  | "COMPANY_ADMIN"
  | "SUPER_ADMIN";

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth responses
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RefreshResponse {
  accessToken: string;
  expiresIn: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth request payloads
// ─────────────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Session state (client-side only)
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthSession {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
