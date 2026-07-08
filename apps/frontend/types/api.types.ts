// ─────────────────────────────────────────────────────────────────────────────
// Common types shared across all API responses
// ─────────────────────────────────────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
  timestamp?: string;
  path?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Query / pagination params
// ─────────────────────────────────────────────────────────────────────────────

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SearchParams {
  search?: string;
}

export type BaseQueryParams = PaginationParams & SortParams & SearchParams;

// ─────────────────────────────────────────────────────────────────────────────
// Entity metadata
// ─────────────────────────────────────────────────────────────────────────────

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Upload progress callback type
// ─────────────────────────────────────────────────────────────────────────────

export type ProgressCallback = (progress: number) => void;

// ─────────────────────────────────────────────────────────────────────────────
// API method types
// ─────────────────────────────────────────────────────────────────────────────

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// ─────────────────────────────────────────────────────────────────────────────
// Validation error field
// ─────────────────────────────────────────────────────────────────────────────

export interface FieldError {
  field: string;
  message: string;
}

export interface ValidationError extends ApiError {
  errors: FieldError[];
}
