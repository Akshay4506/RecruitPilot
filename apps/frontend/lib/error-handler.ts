import { AxiosError } from "axios";
import { toast } from "sonner";
import type { ApiError, FieldError, ValidationError } from "@/types/api.types";

// ─────────────────────────────────────────────────────────────────────────────
// AppError — enriched error thrown throughout the app
// ─────────────────────────────────────────────────────────────────────────────

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors?: FieldError[];
  public readonly isNetworkError: boolean;
  public readonly isValidationError: boolean;

  constructor({
    message,
    statusCode = 500,
    errors,
    isNetworkError = false,
  }: {
    message: string;
    statusCode?: number;
    errors?: FieldError[];
    isNetworkError?: boolean;
  }) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.isNetworkError = isNetworkError;
    this.isValidationError = statusCode === 422 || statusCode === 400;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Parse Axios error into AppError
// ─────────────────────────────────────────────────────────────────────────────

export function handleApiError(error: unknown): AppError {
  // Network / timeout
  if (error instanceof AxiosError && !error.response) {
    return new AppError({
      message: "Network error. Please check your connection.",
      statusCode: 0,
      isNetworkError: true,
    });
  }

  // HTTP error
  if (error instanceof AxiosError && error.response) {
    const data = error.response.data as Partial<ApiError & ValidationError>;
    const status = error.response.status;
    const message = Array.isArray(data.message)
      ? data.message[0]
      : data.message ?? error.message ?? "An unexpected error occurred.";

    return new AppError({
      message,
      statusCode: status,
      errors: (data as ValidationError).errors,
    });
  }

  // Fallback
  if (error instanceof Error) {
    return new AppError({ message: error.message });
  }

  return new AppError({ message: "An unexpected error occurred." });
}

// ─────────────────────────────────────────────────────────────────────────────
// Show toast for API errors — call this in mutation onError callbacks
// ─────────────────────────────────────────────────────────────────────────────

export function showErrorToast(error: unknown, fallback = "Something went wrong.") {
  const msg = error instanceof AppError ? error.message : fallback;
  toast.error(msg);
}

// ─────────────────────────────────────────────────────────────────────────────
// Format validation errors to Record<field, message> for React Hook Form
// ─────────────────────────────────────────────────────────────────────────────

export function formatValidationErrors(
  error: unknown
): Record<string, string> | null {
  if (error instanceof AppError && error.errors?.length) {
    return error.errors.reduce<Record<string, string>>((acc, e) => {
      acc[e.field] = e.message;
      return acc;
    }, {});
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Type guards
// ─────────────────────────────────────────────────────────────────────────────

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof AppError && error.statusCode === 401;
}

export function isForbiddenError(error: unknown): boolean {
  return error instanceof AppError && error.statusCode === 403;
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof AppError && error.statusCode === 404;
}

export function isValidationError(error: unknown): boolean {
  return (
    error instanceof AppError &&
    (error.statusCode === 400 || error.statusCode === 422) &&
    !!error.errors?.length
  );
}
