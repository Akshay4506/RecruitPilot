import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { HiringDefaults as HiringDefaultsType } from "../../types";

interface HiringDefaultsProps {
  defaults: HiringDefaultsType;
  onChange: () => void;
}

export function HiringDefaults({ defaults, onChange }: HiringDefaultsProps) {
  return (
    <SettingsSection 
      title="Hiring Defaults" 
      description="Configure default pipelines, templates, and automated actions for new jobs."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Default Pipeline</label>
            <Select defaultValue={defaults.defaultPipelineId} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select pipeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pipe_standard">Standard Engineering Pipeline</SelectItem>
                <SelectItem value="pipe_exec">Executive Pipeline</SelectItem>
                <SelectItem value="pipe_contract">Contractor Pipeline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Default Interview Template</label>
            <Select defaultValue={defaults.defaultInterviewTemplateId} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tpl_standard">Standard 4-Stage Interview</SelectItem>
                <SelectItem value="tpl_quick">Fast-Track Interview</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Default Evaluation Form</label>
            <Select defaultValue={defaults.defaultEvaluationTemplateId} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select evaluation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eval_standard">Standard Technical Evaluation</SelectItem>
                <SelectItem value="eval_behavioral">Behavioral Evaluation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-4 border-t border-[hsl(var(--border))]">
          <div className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))]">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Require Offer Approval</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Enforce a multi-step approval process before generating offers.</span>
            </div>
            <Switch defaultChecked={defaults.requireApprovalForOffer} onCheckedChange={onChange} />
          </div>

          <div className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))]">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Auto-Reject Stale Candidates</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Automatically reject candidates who have been inactive for a set number of days.</span>
            </div>
            <div className="flex items-center gap-2">
              <Input type="number" defaultValue={defaults.autoRejectDelayDays} onChange={onChange} className="w-20" />
              <span className="text-sm text-[hsl(var(--muted-foreground))]">days</span>
            </div>
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}
