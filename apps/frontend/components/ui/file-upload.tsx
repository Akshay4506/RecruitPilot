"use client";

import * as React from "react";
import { UploadCloud, X, File, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "./primitives";
import { Button } from "./button";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type FileStatus = "idle" | "uploading" | "success" | "error";

export interface FileUploadState {
  file: File;
  progress: number;
  status: FileStatus;
  errorMessage?: string;
  previewUrl?: string;
}

export interface FileUploadProps {
  /** Accepted file types (e.g. ".pdf,.doc,image/*") */
  accept?: string;
  /** Max file size in bytes (default 5MB) */
  maxSize?: number;
  /** Whether to accept multiple files */
  multiple?: boolean;
  /** Max number of files allowed (if multiple) */
  maxFiles?: number;
  /** Optional custom title */
  title?: string;
  /** Optional custom subtitle */
  description?: string;
  /** Callback when files are added (for parent to handle upload logic) */
  onFilesSelected?: (files: File[]) => void;
  /** Callback to remove a file */
  onFileRemove?: (file: File) => void;
  /** Controlled file states passed from parent */
  value?: FileUploadState[];
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// File Icon Helper
// ─────────────────────────────────────────────────────────────────────────────
function getFileIcon(file: File) {
  if (file.type.startsWith("image/")) return ImageIcon;
  return File;
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// ─────────────────────────────────────────────────────────────────────────────
// FileUpload Component
// ─────────────────────────────────────────────────────────────────────────────
function FileUpload({
  accept,
  maxSize = 5 * 1024 * 1024,
  multiple = false,
  maxFiles = 5,
  title = "Click or drag file to this area to upload",
  description,
  onFilesSelected,
  onFileRemove,
  value = [],
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const defaultDescription = description ?? `Support for a single or bulk upload. Max size ${formatBytes(maxSize)}.`;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
    // Reset input so the same file can be selected again if removed
    if (inputRef.current) inputRef.current.value = "";
  };

  const processFiles = (files: File[]) => {
    // Basic validation
    const validFiles = files.filter((f) => f.size <= maxSize);
    if (validFiles.length !== files.length) {
      // In a real app, we might fire a toast here
      void 0;
    }
    
    let filesToSelect = validFiles;
    if (!multiple) {
      filesToSelect = [validFiles[0]];
    } else if (value.length + validFiles.length > maxFiles) {
      filesToSelect = validFiles.slice(0, Math.max(0, maxFiles - value.length));
    }

    if (filesToSelect.length > 0) {
      onFilesSelected?.(filesToSelect);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* ── Dropzone ──────────────────────────────────────────────────────── */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-xl",
          "border-2 border-dashed p-8 transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
          isDragging
            ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)]"
            : "border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)] hover:bg-[hsl(var(--muted)/0.6)]"
        )}
        role="button"
        tabIndex={0}
        aria-label="File upload dropzone"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
        
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)] mb-4">
          <UploadCloud className="h-6 w-6 text-[hsl(var(--primary))]" />
        </div>
        
        <p className="text-sm font-semibold text-[hsl(var(--foreground))] text-center">
          {title}
        </p>
        <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))] text-center max-w-sm">
          {defaultDescription}
        </p>
      </div>

      {/* ── File List ─────────────────────────────────────────────────────── */}
      {value.length > 0 && (
        <ul className="space-y-3" aria-label="Selected files">
          {value.map((item, idx) => {
            const Icon = getFileIcon(item.file);
            const isImage = item.file.type.startsWith("image/");
            const url = item.previewUrl;
            
            return (
              <li
                key={`${item.file.name}-${idx}`}
                className={cn(
                  "relative flex flex-col gap-3 rounded-lg border p-3",
                  item.status === "error"
                    ? "border-[hsl(var(--danger)/0.3)] bg-[hsl(var(--danger-bg))]"
                    : "border-[hsl(var(--border))] bg-[hsl(var(--card))]"
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Preview / Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--muted))] overflow-hidden">
                    {isImage && url ? (
                      <img src={url} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <Icon className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">
                      {item.file.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">
                        {formatBytes(item.file.size)}
                      </span>
                      {item.status === "error" && (
                        <span className="text-xs text-[hsl(var(--danger))] flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {item.errorMessage ?? "Upload failed"}
                        </span>
                      )}
                      {item.status === "success" && (
                        <span className="text-xs text-[hsl(var(--success))] flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Complete
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onFileRemove?.(item.file)}
                    className="shrink-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--danger))]"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Progress Bar */}
                {item.status === "uploading" && (
                  <Progress value={item.progress} size="sm" className="mt-1" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export { FileUpload };
