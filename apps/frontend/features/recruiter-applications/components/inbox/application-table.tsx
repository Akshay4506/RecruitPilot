"use client";

import * as React from "react";
import { Application } from "../../types";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Star, MoreHorizontal, ArrowUpDown, UserPlus, CheckCircle, XCircle, Forward, Download, Trash, Eye } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DataTable } from "@/components/ui/data-table";

export function ApplicationTable({ applications, onPreview }: { applications: Application[], onPreview: (app: Application) => void }) {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  const columns = [
    {
      id: "candidate",
      header: "Candidate",
      cell: (row: Application) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.candidate.avatarUrl} name={row.candidate.name} size="sm" />
          <div>
            <Link href={`/recruiter/applications/${row.id}`} className="font-semibold text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] hover:underline block">
              {row.candidate.name}
            </Link>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{row.candidate.experienceYears}y exp &bull; {row.candidate.location}</span>
          </div>
        </div>
      )
    },
    {
      id: "job",
      header: "Job",
      cell: (row: Application) => (
        <>
          <span className="font-medium text-[hsl(var(--foreground))] block">{row.job.title}</span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{row.job.department}</span>
        </>
      )
    },
    {
      id: "status",
      header: "Status & Stage",
      cell: (row: Application) => (
        <div className="flex flex-col items-start gap-1">
          <Badge variant={row.status === "REJECTED" ? "destructive" : row.status === "HIRED" ? "success" : "default"}>
            {row.status.replace("_", " ")}
          </Badge>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{row.stage}</span>
        </div>
      )
    },
    {
      id: "match",
      header: (
        <div className="flex items-center cursor-pointer hover:text-[hsl(var(--foreground))]">
          Match <ArrowUpDown className="ml-1 h-3 w-3" />
        </div>
      ),
      cell: (row: Application) => (
        <div className="flex items-center gap-1.5">
          <Star className={`h-4 w-4 ${row.matchScore >= 90 ? "fill-[hsl(var(--success))] text-[hsl(var(--success))]" : "fill-[hsl(var(--warning))] text-[hsl(var(--warning))]"}`} />
          <span className="font-medium text-[hsl(var(--foreground))]">{row.matchScore}%</span>
        </div>
      )
    },
    {
      id: "appliedAt",
      header: "Applied",
      cell: (row: Application) => (
        <span className="text-[hsl(var(--muted-foreground))] whitespace-nowrap">
          {formatDate(row.appliedAt)}
        </span>
      )
    },
    {
      id: "actions",
      header: "",
      cell: (row: Application) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onPreview(row); }}>
            Preview
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/recruiter/applications/${row.id}`} onClick={(e) => e.stopPropagation()}>Review</Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[hsl(var(--muted-foreground))]">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="relative">
      <div className="w-full border border-[hsl(var(--border))] rounded-xl bg-[hsl(var(--card))] shadow-sm">
        <DataTable
          data={applications}
          columns={columns as any}
          keyField="id"
          selectable={true}
          virtualized={true}
          onSelectionChange={(rows) => setSelectedIds(new Set(rows.map(r => r.id)))}
        />
      </div>

      {/* Floating Bulk Actions Toolbar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-full shadow-lg p-2 flex items-center gap-2"
          >
            <div className="px-4 py-2 bg-[hsl(var(--primary)/0.1)] rounded-full mr-2">
              <span className="text-sm font-semibold text-[hsl(var(--primary))]">{selectedIds.size} Selected</span>
            </div>
            
            <Button variant="ghost" size="sm" className="rounded-full gap-2">
              <UserPlus className="h-4 w-4" /> Assign
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full gap-2 text-[hsl(var(--success))] hover:text-[hsl(var(--success))] hover:bg-[hsl(var(--success)/0.1)]">
              <CheckCircle className="h-4 w-4" /> Shortlist
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full gap-2 text-[hsl(var(--danger))] hover:text-[hsl(var(--danger))] hover:bg-[hsl(var(--danger)/0.1)]">
              <XCircle className="h-4 w-4" /> Reject
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full gap-2">
              <Forward className="h-4 w-4" /> Move Stage
            </Button>
            <div className="w-px h-6 bg-[hsl(var(--border))] mx-1" />
            <Button variant="ghost" size="sm" className="rounded-full gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-[hsl(var(--danger))] hover:text-[hsl(var(--danger))] hover:bg-[hsl(var(--danger)/0.1)]">
              <Trash className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
