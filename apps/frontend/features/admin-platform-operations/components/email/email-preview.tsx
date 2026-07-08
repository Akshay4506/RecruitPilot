import * as React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { EmailTemplate } from "../../types";
import { Smartphone, Monitor, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EmailPreviewProps {
  template: EmailTemplate | null;
  onClose: () => void;
}

export function EmailPreview({ template, onClose }: EmailPreviewProps) {
  const [device, setDevice] = React.useState<"desktop" | "mobile">("desktop");
  
  if (!template) return null;

  return (
    <Drawer open={!!template} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent side="right" size="lg" className="h-full flex flex-col bg-[hsl(var(--background))]">
        <DrawerHeader className="border-b border-[hsl(var(--border))] pb-4 flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <DrawerTitle className="text-xl">Preview Template</DrawerTitle>
            <DrawerDescription>
              {template.name}
            </DrawerDescription>
          </div>
          <div className="flex p-1 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--muted)/0.3)]">
            <Button 
              variant="ghost" 
              size="sm" 
              className={device === "desktop" ? "bg-[hsl(var(--background))] shadow-sm" : ""}
              onClick={() => setDevice("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={device === "mobile" ? "bg-[hsl(var(--background))] shadow-sm" : ""}
              onClick={() => setDevice("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-[hsl(var(--muted)/0.1)] flex items-center justify-center">
          
          <div className={`bg-white border shadow-md transition-all duration-300 ${device === "desktop" ? "w-full max-w-2xl h-[600px] rounded-lg" : "w-[375px] h-[812px] rounded-[2rem]"}`}>
            {/* Mock Email Client UI */}
            <div className={`border-b px-4 py-3 bg-gray-50 flex flex-col gap-1 ${device === "mobile" ? "rounded-t-[2rem]" : "rounded-t-lg"}`}>
              <div className="text-xs text-gray-500">From: RecruitPilot Notifications</div>
              <div className="font-medium text-gray-900 text-sm">{template.subject.replace("{{job_title}}", "Senior Engineer").replace("{{company_name}}", "Acme Corp")}</div>
            </div>
            
            {/* Mock Email Content */}
            <div className="p-6 text-gray-800">
              <h1 className="text-xl font-bold mb-4">Hi John Doe,</h1>
              <p className="mb-4 text-sm leading-relaxed">
                We're excited to invite you to an interview for the Senior Engineer position at Acme Corp.
              </p>
              <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700">View Details</Button>
            </div>
          </div>

        </div>

        <DrawerFooter className="border-t border-[hsl(var(--border))] flex-row justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Input placeholder="Enter email to send test..." className="h-9" />
            <Button size="sm" className="gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
              <Send className="h-4 w-4" /> Send
            </Button>
          </div>
          <Button variant="outline" onClick={onClose}>Close Preview</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
