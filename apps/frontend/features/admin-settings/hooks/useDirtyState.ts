import { useState, useCallback } from "react";

export function useDirtyState(initialState: boolean = false) {
  const [isDirty, setIsDirty] = useState(initialState);

  const markDirty = useCallback(() => setIsDirty(true), []);
  const markClean = useCallback(() => setIsDirty(false), []);

  return {
    isDirty,
    markDirty,
    markClean
  };
}
