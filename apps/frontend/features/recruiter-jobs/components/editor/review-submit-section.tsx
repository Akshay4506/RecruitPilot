import * as React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Eye, Save } from "lucide-react";

export function ReviewSubmitSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[hsl(var(--foreground))] mb-1">Review & Submit</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Ensure all details are correct before publishing or saving as draft.</p>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">All required fields completed</p>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">This job posting looks great and is ready to be published.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button variant="outline" className="flex-1">
          <Eye className="h-4 w-4 mr-2" /> Preview Job
        </Button>
        <Button variant="secondary" className="flex-1">
          <Save className="h-4 w-4 mr-2" /> Save as Draft
        </Button>
        <Button variant="primary" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
          Publish Job
        </Button>
      </div>
    </div>
  );
}
