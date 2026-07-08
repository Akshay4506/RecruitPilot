import * as React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmailTemplate } from "../../types";

interface EmailTemplateEditorProps {
  template: EmailTemplate | null;
  onClose: () => void;
}

export function EmailTemplateEditor({ template, onClose }: EmailTemplateEditorProps) {
  if (!template) return null;

  return (
    <Drawer open={!!template} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent side="right" size="lg" className="h-full flex flex-col bg-[hsl(var(--background))]">
        <DrawerHeader className="border-b border-[hsl(var(--border))] pb-4">
          <DrawerTitle className="text-xl">Edit Template: {template.name}</DrawerTitle>
          <DrawerDescription>
            Version: {template.version}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Template Name</label>
            <Input defaultValue={template.name} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Subject Line</label>
            <Input defaultValue={template.subject} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">Template Variables</label>
            <div className="p-3 bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))] rounded text-xs font-mono text-[hsl(var(--muted-foreground))] leading-loose">
              {template.variables.map((v: string) => `{{${v}}}`).join(", ")}
            </div>
            <span className="text-[10px] text-[hsl(var(--muted-foreground))]">You can use these variables anywhere in the subject or body.</span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[hsl(var(--foreground))]">HTML Body</label>
            <textarea 
              className="w-full h-64 p-3 font-mono text-sm border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
              defaultValue={`<h1>Hi {{candidate_name}},</h1>\n<p>We're excited to invite you to an interview for the {{job_title}} position at {{company_name}}.</p>`}
            />
          </div>
        </div>

        <DrawerFooter className="border-t border-[hsl(var(--border))] gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">Cancel</Button>
          <Button onClick={onClose} className="w-full sm:w-auto bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">Save as Draft</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
