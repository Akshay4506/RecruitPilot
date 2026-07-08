import { QueryClient } from "@tanstack/react-query";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { isUnauthorizedError } from "@/lib/error-handler";

// ─────────────────────────────────────────────────────────────────────────────
// TanStack Query Client — singleton for the app
// ─────────────────────────────────────────────────────────────────────────────

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time before a query is considered stale and refetched
      staleTime: APP_CONSTANTS.STALE_TIME_MEDIUM,
      // Time before inactive cached data is garbage collected
      gcTime: APP_CONSTANTS.GC_TIME_MEDIUM,
      // Retry failed requests (not 4xx)
      retry: (failureCount, error) => {
        if (isUnauthorizedError(error)) return false;
        if (failureCount >= APP_CONSTANTS.MAX_RETRY_ATTEMPTS) return false;
        return true;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
      // Refetch on window focus (default: true, keep for freshness)
      refetchOnWindowFocus: true,
      // Don't refetch on reconnect for stale-time window
      refetchOnReconnect: "always",
    },
    mutations: {
      retry: false, // Never retry mutations automatically
    },
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Invalidation helpers
// ─────────────────────────────────────────────────────────────────────────────

export function invalidateAll() {
  return queryClient.invalidateQueries();
}

export function invalidateByKey(queryKey: readonly unknown[]) {
  return queryClient.invalidateQueries({ queryKey });
}

export function resetStore() {
  return queryClient.clear();
}
