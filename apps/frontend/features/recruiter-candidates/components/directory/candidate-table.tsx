/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { RecruiterCandidate } from "../../types";
import { DataTable } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone } from "lucide-react";
import Link from "next/link";

interface CandidateTableProps {
  candidates: RecruiterCandidate[];
  onPreview: (candidate: RecruiterCandidate) => void;
}

export function CandidateTable({ candidates, onPreview }: CandidateTableProps) {
  const columns = [
    {
      id: "name",
      header: "Candidate",
      accessorKey: "name",
      cell: (row: RecruiterCandidate) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.personalInfo.avatarUrl} name={row.personalInfo.name} size="md" />
          <div>
            <Link href={`/recruiter/candidates/${row.id}`} className="font-semibold text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors block">
              {row.personalInfo.name}
            </Link>
            <span className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-1">{row.personalInfo.headline}</span>
          </div>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (row: RecruiterCandidate) => (
        <Badge variant={row.status === "ACTIVE" ? "success" : row.status === "INTERVIEWING" ? "warning" : "default"} className="text-[10px] uppercase">
          {row.status}
        </Badge>
      ),
    },
    {
      id: "experience",
      header: "Experience",
      accessorKey: "experienceYears",
      cell: (row: RecruiterCandidate) => (
        <div className="text-sm text-[hsl(var(--muted-foreground))]">{row.experienceYears} Years</div>
      ),
    },
    {
      id: "contact",
      header: "Contact",
      accessorKey: "contact",
      cell: (row: RecruiterCandidate) => (
        <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Mail className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Phone className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
    {
      id: "match",
      header: "Match",
      accessorKey: "match",
      cell: (row: RecruiterCandidate) => (
        <div className="flex items-center">
          {row.insights?.overallScore ? (
            <Badge variant="outline" className="border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.05)] text-[hsl(var(--primary))]">
              {row.insights.overallScore}%
            </Badge>
          ) : (
            <span className="text-sm text-[hsl(var(--muted-foreground))]">-</span>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      accessorKey: "actions",
      cell: (row: RecruiterCandidate) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" className="h-7 text-xs" onClick={(e) => { e.stopPropagation(); onPreview(row); }}>
            <Eye className="h-3 w-3 mr-1" /> Preview
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl overflow-hidden shadow-sm">
      <DataTable 
        data={candidates} 
        columns={columns as any}
        keyField="id" 
        selectable={true}
        virtualized={true}
      />
    </div>
  );
}
