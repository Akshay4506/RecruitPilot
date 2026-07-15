"use client";

import * as React from "react";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      expand={false}
      duration={4000}
      theme={resolvedTheme as "light" | "dark" | "system"}
      icons={{
        success: <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />,
        error: <AlertCircle className="h-4 w-4 text-[hsl(var(--destructive))]" />,
        warning: <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning))]" />,
        info: <Info className="h-4 w-4 text-[hsl(var(--primary))]" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[hsl(var(--card))] group-[.toaster]:text-[hsl(var(--foreground))] group-[.toaster]:border-[hsl(var(--border))] group-[.toaster]:shadow-lg rounded-xl",
          description: "group-[.toast]:text-[hsl(var(--muted-foreground))] text-xs",
          actionButton:
            "group-[.toast]:bg-[hsl(var(--primary))] group-[.toast]:text-[hsl(var(--primary-foreground))] font-medium rounded-md",
          cancelButton:
            "group-[.toast]:bg-[hsl(var(--muted))] group-[.toast]:text-[hsl(var(--muted-foreground))] font-medium rounded-md",
        },
        style: {
          fontFamily: "var(--font-sans, Inter, sans-serif)",
          fontSize: "14px",
          fontWeight: 500,
        },
      }}
    />
  );
}

export { ToastProvider };
