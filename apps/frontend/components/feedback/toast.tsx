"use client";

import { toast as sonnerToast, type ExternalToast } from "sonner";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

type ToastOptions = ExternalToast;

// ── Typed toast wrappers ──────────────────────────────────────────────────────
export const toast = {
  success: (message: string, options?: ToastOptions) =>
    sonnerToast.success(message, {
      icon: <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />,
      ...options,
    }),

  error: (message: string, options?: ToastOptions) =>
    sonnerToast.error(message, {
      icon: <XCircle className="h-4 w-4 text-[hsl(var(--danger))]" />,
      ...options,
    }),

  warning: (message: string, options?: ToastOptions) =>
    sonnerToast.warning(message, {
      icon: <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning))]" />,
      ...options,
    }),

  info: (message: string, options?: ToastOptions) =>
    sonnerToast.info(message, {
      icon: <Info className="h-4 w-4 text-[hsl(var(--info))]" />,
      ...options,
    }),

  promise: <T,>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string },
    options?: ToastOptions
  ) =>
    sonnerToast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      ...options,
    }),

  dismiss: sonnerToast.dismiss,

  custom: sonnerToast,
};
