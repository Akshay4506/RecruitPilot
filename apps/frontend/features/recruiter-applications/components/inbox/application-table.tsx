"use client";

import * as React from "react";
import { Application } from "../../types";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Star, MoreHorizontal, ArrowUpDown, UserPlus, CheckCircle, XCircle, Forward, Download, Trash } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function ApplicationTable({ applications, onPreview }: { applications: Application[], onPreview: (app: Application) => void }) {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(applications.map(a => a.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="relative">
      <div className="w-full overflow-auto border border-[hsl(var(--border))] rounded-xl bg-[hsl(var(--card))] shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted)/0.5)] uppercase border-b border-[hsl(var(--border))]">
            <tr>
              <th scope="col" className="p-4 w-4">
                <input 
                  type="checkbox" 
                  className="rounded border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]" 
                  onChange={toggleAll}
                  checked={selectedIds.size === applications.length && applications.length > 0}
                />
              </th>
              <th scope="col" className="px-6 py-3 font-medium">Candidate</th>
              <th scope="col" className="px-6 py-3 font-medium">Job</th>
              <th scope="col" className="px-6 py-3 font-medium">Status & Stage</th>
              <th scope="col" className="px-6 py-3 font-medium flex items-center cursor-pointer hover:text-[hsl(var(--foreground))]">
                Match <ArrowUpDown className="ml-1 h-3 w-3" />
              </th>
              <th scope="col" className="px-6 py-3 font-medium">Applied</th>
              <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--border))]">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-[hsl(var(--muted)/0.3)] transition-colors group">
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]" 
                    checked={selectedIds.has(app.id)}
                    onChange={() => toggleOne(app.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={app.candidate.avatarUrl} name={app.candidate.name} size="sm" />
                    <div>
                      <Link href={`/recruiter/applications/${app.id}`} className="font-semibold text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] hover:underline block">
                        {app.candidate.name}
                      </Link>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{app.candidate.experienceYears}y exp &bull; {app.candidate.location}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-[hsl(var(--foreground))] block">{app.job.title}</span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{app.job.department}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-start gap-1">
                    <Badge variant={app.status === "REJECTED" ? "destructive" : app.status === "HIRED" ? "success" : "default"}>
                      {app.status.replace("_", " ")}
                    </Badge>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{app.stage}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <Star className={`h-4 w-4 ${app.matchScore >= 90 ? "fill-[hsl(var(--success))] text-[hsl(var(--success))]" : "fill-[hsl(var(--warning))] text-[hsl(var(--warning))]"}`} />
                    <span className="font-medium text-[hsl(var(--foreground))]">{app.matchScore}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[hsl(var(--muted-foreground))] whitespace-nowrap">
                  {formatDate(app.appliedAt)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" onClick={() => onPreview(app)}>
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/recruiter/applications/${app.id}`}>Review</Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[hsl(var(--muted-foreground))]">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
