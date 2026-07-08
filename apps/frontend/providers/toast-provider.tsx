"use client";

import * as React from "react";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="top-right"
      richColors
      expand={false}
      duration={4000}
      theme={resolvedTheme as "light" | "dark" | "system"}
      toastOptions={{
        style: {
          fontFamily: "var(--font-sans, Inter, sans-serif)",
          fontSize: "13px",
        },
      }}
    />
  );
}

export { ToastProvider };
