import { useState } from "react";

export function useSettingsNavigation(defaultTab: string) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return {
    activeTab,
    setActiveTab
  };
}
