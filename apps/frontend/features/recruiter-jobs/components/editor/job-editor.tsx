"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/lib/animations";
import { JobForm } from "./job-form";
import { Job } from "../../types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface JobEditorProps {
  job?: Job;
  mode: "create" | "edit";
}

export function JobEditor({ job, mode }: JobEditorProps) {
  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto space-y-8"
      variants={stagger()}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="shrink-0 rounded-full">
          <Link href={ROUTES.recruiter.jobs}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {mode === "create" ? "Create New Job" : `Edit Job: ${job?.title}`}
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {mode === "create" ? "Fill out the details below to draft a new job posting." : "Update the details for this job posting."}
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <JobForm initialData={job} mode={mode} />
      </motion.div>
    </motion.div>
  );
}
