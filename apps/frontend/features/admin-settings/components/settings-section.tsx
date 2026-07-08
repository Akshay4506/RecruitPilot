import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/cards/card";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function SettingsSection({ title, description, children, footer, className }: SettingsSectionProps) {
  return (
    <Card className={`border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))] ${className || ""}`}>
      <CardHeader className="pb-4 border-b border-[hsl(var(--border))]">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">{title}</CardTitle>
        {description && <CardDescription className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-6">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="pt-4 pb-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.5)]">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
