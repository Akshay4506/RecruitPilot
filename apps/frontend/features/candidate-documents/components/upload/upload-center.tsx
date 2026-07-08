import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { FileUpload, FileUploadState } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";

export function UploadCenter() {
  const [files, setFiles] = React.useState<FileUploadState[]>([]);

  const handleFilesSelected = (newFiles: File[]) => {
    const newStates: FileUploadState[] = newFiles.map(file => ({
      file,
      progress: 0,
      status: "uploading",
    }));
    
    setFiles(prev => [...prev, ...newStates]);

    // Simulate upload progress
    newStates.forEach(state => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles(current => 
            current.map(f => 
              f.file === state.file 
                ? { ...f, progress: 100, status: "success" } 
                : f
            )
          );
        } else {
          setFiles(current => 
            current.map(f => 
              f.file === state.file 
                ? { ...f, progress } 
                : f
            )
          );
        }
      }, 500);
    });
  };

  const handleFileRemove = (file: File) => {
    setFiles(prev => prev.filter(f => f.file !== file));
  };

  const hasUploading = files.some(f => f.status === "uploading");

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold text-[hsl(var(--foreground))]">Upload Center</CardTitle>
      </CardHeader>
      <CardContent>
        <FileUpload
          accept=".pdf,.doc,.docx"
          maxSize={10 * 1024 * 1024} // 10MB
          multiple
          maxFiles={5}
          title="Upload Documents"
          description="Drag & drop your resume, certificates, or portfolios here. PDF, DOC, DOCX up to 10MB."
          onFilesSelected={handleFilesSelected}
          onFileRemove={handleFileRemove}
          value={files}
        />
        {files.length > 0 && (
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setFiles([])} disabled={hasUploading}>
              Clear All
            </Button>
            <Button variant="primary" size="sm" disabled={hasUploading}>
              Done
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
