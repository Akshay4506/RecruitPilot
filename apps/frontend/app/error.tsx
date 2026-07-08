"use client";

import { Page500 } from "@/components/pages/error-pages";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: ErrorBoundaryProps) {
  return <Page500 reset={reset} />;
}
