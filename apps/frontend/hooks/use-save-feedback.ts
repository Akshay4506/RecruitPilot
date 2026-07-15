import { useState } from "react";
import { toast } from "sonner";

interface SaveFeedbackOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}

export function useSaveFeedback() {
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const executeSave = async <T,>(
    saveFn: () => Promise<T>,
    options?: SaveFeedbackOptions
  ): Promise<T | null> => {
    setIsSaving(true);
    try {
      const result = await saveFn();
      
      setIsDirty(false);
      toast.success(options?.successMessage || "Changes saved successfully.");
      
      options?.onSuccess?.();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("An error occurred during save.");
      toast.error(options?.errorMessage || "Failed to save changes.", {
        description: error.message
      });
      options?.onError?.(error);
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    isDirty,
    setIsDirty,
    executeSave
  };
}
