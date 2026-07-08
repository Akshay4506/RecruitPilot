import * as React from "react";
import { DocumentCard, DocumentCardSkeleton } from "./document-card";
import { DocumentFilters } from "./document-filters";
import { CandidateDocument } from "../../types";

interface DocumentLibraryProps {
  documents: CandidateDocument[];
  onPreview?: (doc: CandidateDocument) => void;
  onDownload?: (doc: CandidateDocument) => void;
  onRename?: (doc: CandidateDocument) => void;
  onDelete?: (doc: CandidateDocument) => void;
}

export function DocumentLibrary({ documents, onPreview, onDownload, onRename, onDelete }: DocumentLibraryProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTypes, setSelectedTypes] = React.useState<Set<string>>(new Set());
  const [sortParam, setSortParam] = React.useState("newest");

  // Filtering logic
  const filteredDocuments = React.useMemo(() => {
    let result = [...documents];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(doc => doc.name.toLowerCase().includes(q));
    }

    // Type filter
    if (selectedTypes.size > 0) {
      result = result.filter(doc => selectedTypes.has(doc.type));
    }

    // Sort logic
    result.sort((a, b) => {
      switch (sortParam) {
        case "newest":
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case "oldest":
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "size":
          return b.sizeBytes - a.sizeBytes;
        default:
          return 0;
      }
    });

    return result;
  }, [documents, searchQuery, selectedTypes, sortParam]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Other Documents</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">Manage your certificates, portfolios, and transcripts.</p>
        <DocumentFilters 
          selectedTypes={selectedTypes}
          onSearchChange={setSearchQuery} 
          onTypeChange={setSelectedTypes} 
          onSortChange={setSortParam} 
        />
      </div>

      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDocuments.map(doc => (
            <DocumentCard 
              key={doc.id} 
              document={doc} 
              onPreview={onPreview} 
              onDownload={onDownload} 
              onRename={onRename} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center border-2 border-dashed border-[hsl(var(--border))] rounded-xl bg-[hsl(var(--muted)/0.1)]">
          <p className="text-[hsl(var(--muted-foreground))]">No documents found matching your filters.</p>
        </div>
      )}
    </div>
  );
}

export function DocumentLibrarySkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-6 w-40 bg-[hsl(var(--muted))] animate-pulse rounded mb-2" />
        <div className="h-4 w-64 bg-[hsl(var(--muted))] animate-pulse rounded mb-4" />
        <div className="flex gap-3">
          <div className="h-9 w-64 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-9 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
          <div className="h-9 w-32 bg-[hsl(var(--muted))] animate-pulse rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <DocumentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
