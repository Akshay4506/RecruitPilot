"use client";

import * as React from "react";
import { Page500 } from "@/components/pages/error-pages";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    void 0;
  }, [error]);

  return <Page500 reset={reset} />;
}
