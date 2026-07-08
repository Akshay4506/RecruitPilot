import * as React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeatureFlag } from "../../types";

interface FlagEditorProps {
  flag: FeatureFlag | null;
  onClose: () => void;
}

export function FlagEditor({ flag, onClose }: FlagEditorProps) {
  if (!flag) return null;

  return (
    <Drawer open={!!flag} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent side="right" size="md" className="h-full flex flex-col bg-[hsl(var(--background))]">
        <DrawerHeader className="border-b border-[hsl(var(--border))] pb-4">
          <DrawerTitle className="text-xl">Configure Feature Flag</DrawerTitle>
          <DrawerDescription>
            {flag.key} • {flag.environment}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Flag Name</label>
            <Input defaultValue={flag.name} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Description</label>
            <Input defaultValue={flag.description} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Rollout Percentage</label>
            <div className="flex items-center gap-4">
              <Input type="range" min="0" max="100" defaultValue={flag.rolloutPercentage} className="flex-1" />
              <span className="w-12 text-right text-sm font-medium">{flag.rolloutPercentage}%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Owner Email</label>
            <Input defaultValue={flag.owner} />
          </div>
        </div>

        <DrawerFooter className="border-t border-[hsl(var(--border))] gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">Cancel</Button>
          <Button onClick={onClose} className="w-full sm:w-auto bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">Save Configuration</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
