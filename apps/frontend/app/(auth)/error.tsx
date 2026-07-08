"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] gap-4 p-8 text-center">
      <div className="h-12 w-12 rounded-full bg-[hsl(var(--destructive)/0.1)] flex items-center justify-center mb-4">
        <AlertTriangle className="h-6 w-6 text-[hsl(var(--destructive))]" />
      </div>
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-[hsl(var(--muted-foreground))] max-w-md">
        We encountered an error loading this auth view.
      </p>
      <Button onClick={() => reset()} className="mt-4">Try again</Button>
    </div>
  );
}
