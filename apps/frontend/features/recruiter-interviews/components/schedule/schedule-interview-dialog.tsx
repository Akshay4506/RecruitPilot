import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InterviewTemplateSelector } from "../templates/interview-template-selector";
import { PanelAvailabilityMatrix } from "./panel-availability-matrix";
import { mockTemplates } from "../../mock/interviews.mock";

interface ScheduleInterviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleInterviewDialog({ isOpen, onClose }: ScheduleInterviewDialogProps) {
  const [step, setStep] = React.useState(1);
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent size="lg" className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Step 1: Select Template"}
            {step === 2 && "Step 2: Panel & Availability"}
            {step === 3 && "Step 3: Review & Confirm"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 max-h-[60vh] overflow-y-auto pr-2">
          {step === 1 && (
            <InterviewTemplateSelector 
              templates={mockTemplates}
              selectedId={selectedTemplate}
              onSelect={setSelectedTemplate}
            />
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                Based on the <strong>{mockTemplates.find(t => t.id === selectedTemplate)?.name}</strong> template, we need a 60-minute slot. Select a time below.
              </div>
              <PanelAvailabilityMatrix 
                panel={[
                  { id: "user-1", name: "Alex Rivera", role: "LEAD", department: "Engineering", title: "Manager" },
                  { id: "user-2", name: "Taylor Swift", role: "INTERVIEWER", department: "Engineering", title: "Senior" }
                ]}
                slots={[]}
                selectedDate={new Date()}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-sm text-[hsl(var(--muted-foreground))]">
              <div className="bg-[hsl(var(--muted)/0.3)] p-4 rounded-lg">
                <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">Meeting Summary</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block opacity-70 mb-1">Template</span>
                    <span className="font-medium text-[hsl(var(--foreground))]">{mockTemplates.find(t => t.id === selectedTemplate)?.name}</span>
                  </div>
                  <div>
                    <span className="block opacity-70 mb-1">Date & Time</span>
                    <span className="font-medium text-[hsl(var(--foreground))]">Today at 10:00 AM (60m)</span>
                  </div>
                  <div>
                    <span className="block opacity-70 mb-1">Platform</span>
                    <span className="font-medium text-[hsl(var(--foreground))]">Google Meet</span>
                  </div>
                  <div>
                    <span className="block opacity-70 mb-1">Panel</span>
                    <span className="font-medium text-[hsl(var(--foreground))]">Alex Rivera (Lead), Taylor Swift</span>
                  </div>
                </div>
              </div>
              <p>Calendar invites will be sent to all panel members and the candidate automatically.</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center w-full">
          {step > 1 ? (
             <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
          ) : (
             <Button variant="outline" onClick={onClose}>Cancel</Button>
          )}
          
          {step < 3 ? (
             <Button onClick={() => setStep(step + 1)} disabled={step === 1 && !selectedTemplate}>Continue</Button>
          ) : (
             <Button onClick={onClose}>Send Invites</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
