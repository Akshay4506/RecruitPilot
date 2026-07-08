import * as React from "react";

export function SettingsHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col gap-1 pb-6 border-b border-[hsl(var(--border))]">
      <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">{title}</h2>
      {description && <p className="text-sm text-[hsl(var(--muted-foreground))]">{description}</p>}
    </div>
  );
}
