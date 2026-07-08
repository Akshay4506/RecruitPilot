import * as React from "react";
import { Job } from "../../types";
import { Card } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  Archive, 
  Trash2, 
  Copy, 
  Share2, 
  Edit,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import {
  PublishJobDialog,
  PauseJobDialog,
  CloseJobDialog,
  ReopenJobDialog,
  ArchiveJobDialog,
  DeleteJobDialog,
  DuplicateJobDialog,
  ShareJobDialog
} from "../dialogs/job-action-dialogs";

interface QuickActionsProps {
  job: Job;
}

export function QuickActions({ job }: QuickActionsProps) {
  const [activeDialog, setActiveDialog] = React.useState<string | null>(null);

  const closeDialog = () => setActiveDialog(null);

  const handleConfirm = () => {
    // Mock action
    console.log(`Action ${activeDialog} confirmed for job ${job.id}`);
    closeDialog();
  };

  return (
    <>
      <Card className="p-6 sticky top-6">
        <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-4">Quick Actions</h3>
        <div className="space-y-2 flex flex-col">
          
          <Button variant="primary" className="w-full justify-start" asChild>
            <Link href={ROUTES.recruiter.jobEdit(job.id)}>
              <Edit className="w-4 h-4 mr-2" /> Edit Job
            </Link>
          </Button>

          {job.status === "DRAFT" || job.status === "PAUSED" ? (
            <Button variant="outline" className="w-full justify-start" onClick={() => setActiveDialog("publish")}>
              <Play className="w-4 h-4 mr-2 text-green-500" /> Publish Job
            </Button>
          ) : job.status === "PUBLISHED" ? (
            <Button variant="outline" className="w-full justify-start" onClick={() => setActiveDialog("pause")}>
              <Pause className="w-4 h-4 mr-2 text-amber-500" /> Pause Job
            </Button>
          ) : null}

          {job.status !== "CLOSED" && job.status !== "ARCHIVED" ? (
            <Button variant="outline" className="w-full justify-start" onClick={() => setActiveDialog("close")}>
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" /> Close Job
            </Button>
          ) : null}

          {job.status === "CLOSED" ? (
            <Button variant="outline" className="w-full justify-start" onClick={() => setActiveDialog("reopen")}>
              <RefreshCw className="w-4 h-4 mr-2 text-indigo-500" /> Reopen Job
            </Button>
          ) : null}

          <Button variant="outline" className="w-full justify-start" onClick={() => setActiveDialog("share")}>
            <Share2 className="w-4 h-4 mr-2 text-slate-500" /> Share
          </Button>

          <Button variant="outline" className="w-full justify-start" onClick={() => setActiveDialog("duplicate")}>
            <Copy className="w-4 h-4 mr-2 text-slate-500" /> Duplicate
          </Button>

          {job.status !== "ARCHIVED" ? (
            <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setActiveDialog("archive")}>
              <Archive className="w-4 h-4 mr-2" /> Archive
            </Button>
          ) : null}

          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setActiveDialog("delete")}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete Job
          </Button>
        </div>
      </Card>

      <PublishJobDialog job={job} isOpen={activeDialog === "publish"} onClose={closeDialog} onConfirm={handleConfirm} />
      <PauseJobDialog job={job} isOpen={activeDialog === "pause"} onClose={closeDialog} onConfirm={handleConfirm} />
      <CloseJobDialog job={job} isOpen={activeDialog === "close"} onClose={closeDialog} onConfirm={handleConfirm} />
      <ReopenJobDialog job={job} isOpen={activeDialog === "reopen"} onClose={closeDialog} onConfirm={handleConfirm} />
      <ArchiveJobDialog job={job} isOpen={activeDialog === "archive"} onClose={closeDialog} onConfirm={handleConfirm} />
      <DeleteJobDialog job={job} isOpen={activeDialog === "delete"} onClose={closeDialog} onConfirm={handleConfirm} />
      <DuplicateJobDialog job={job} isOpen={activeDialog === "duplicate"} onClose={closeDialog} onConfirm={handleConfirm} />
      <ShareJobDialog job={job} isOpen={activeDialog === "share"} onClose={closeDialog} onConfirm={handleConfirm} />
    </>
  );
}
