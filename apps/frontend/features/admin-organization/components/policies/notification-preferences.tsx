import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Switch } from "@/components/ui/switch";
import { Mail, MessageSquare, Bell } from "lucide-react";
import { NotificationPreference } from "../../types";

interface NotificationPreferencesProps {
  preferences: NotificationPreference[];
  onChange: () => void;
}

export function NotificationPreferences({ preferences, onChange }: NotificationPreferencesProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "EMAIL": return <Mail className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />;
      case "SLACK": return <MessageSquare className="h-4 w-4 text-[#4A154B]" />;
      case "TEAMS": return <MessageSquare className="h-4 w-4 text-[#6264A7]" />;
      case "SMS": return <MessageSquare className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />;
      case "PUSH": return <Bell className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />;
      default: return <Bell className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />;
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case "EMAIL": return "Email Notifications";
      case "SLACK": return "Slack Integration";
      case "TEAMS": return "Microsoft Teams";
      case "SMS": return "SMS Alerts";
      case "PUSH": return "Push Notifications";
      default: return type;
    }
  };

  return (
    <SettingsSection 
      title="Global Notification Channels" 
      description="Enable or disable notification channels across the organization. Users can further refine these in their personal settings."
    >
      <div className="space-y-4">
        {preferences.map((pref) => (
          <div key={pref.type} className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))]">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center shrink-0">
                {getIcon(pref.type)}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[hsl(var(--foreground))]">{getLabel(pref.type)}</span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  {pref.enabled ? `${pref.events.length} event triggers configured` : "Disabled organization-wide"}
                </span>
              </div>
            </div>
            <Switch defaultChecked={pref.enabled} onCheckedChange={onChange} />
          </div>
        ))}
      </div>
    </SettingsSection>
  );
}
