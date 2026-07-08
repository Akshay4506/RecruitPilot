import * as React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Award, Briefcase, Search } from "lucide-react";
import { DocumentStorageOverview } from "../../types";

interface HeroHeaderProps {
  overview: DocumentStorageOverview;
  onUploadResume?: () => void;
  onUploadCertificate?: () => void;
  onUploadPortfolio?: () => void;
  onBrowseJobs?: () => void;
}

export function HeroHeader({ 
  overview, 
  onUploadResume, 
  onUploadCertificate, 
  onUploadPortfolio, 
  onBrowseJobs 
}: HeroHeaderProps) {
  
  const formattedStorage = (overview.totalSizeBytes / (1024 * 1024)).toFixed(0);
  
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[hsl(var(--border))]">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">Resume & Documents</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">Manage resumes, certifications, portfolios and supporting documents.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[hsl(var(--muted-foreground))]">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[hsl(var(--foreground))]">{overview.totalDocuments}</span> Total Documents
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[hsl(var(--foreground))]">{overview.resumesCount}</span> Resumes
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[hsl(var(--foreground))]">{formattedStorage} MB</span> Storage Used
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" onClick={onBrowseJobs} className="gap-2">
          <Search className="h-4 w-4" />
          Browse Jobs
        </Button>
        <div className="hidden sm:block w-px h-6 bg-[hsl(var(--border))]" />
        <Button variant="outline" size="sm" onClick={onUploadPortfolio} className="gap-2">
          <Briefcase className="h-4 w-4 text-[hsl(var(--primary))]" />
          Portfolio
        </Button>
        <Button variant="outline" size="sm" onClick={onUploadCertificate} className="gap-2">
          <Award className="h-4 w-4 text-[hsl(var(--warning))]" />
          Certificate
        </Button>
        <Button variant="primary" size="sm" onClick={onUploadResume} className="gap-2">
          <FileText className="h-4 w-4" />
          Upload Resume
        </Button>
      </div>
    </div>
  );
}

export function HeroHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[hsl(var(--border))]">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-4 w-96 max-w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
        </div>
        
        <div className="flex gap-6">
          <div className="h-4 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-4 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-4 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="h-9 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-9 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-9 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-9 w-36 bg-[hsl(var(--primary)/0.2)] animate-pulse rounded" />
      </div>
    </div>
  );
}
