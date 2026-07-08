import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { APP_CONSTANTS } from "@/constants/app.constants";
import { API_ENDPOINTS } from "@/constants/routes";
import { handleApiError } from "./error-handler";

// ─────────────────────────────────────────────────────────────────────────────
// Token management (in-memory for security)
// ─────────────────────────────────────────────────────────────────────────────

let _accessToken: string | null = null;

export const tokenManager = {
  get: () => _accessToken,
  set: (token: string | null) => { _accessToken = token; },
  clear: () => { _accessToken = null; },
};

// ─────────────────────────────────────────────────────────────────────────────
// Refresh queue — prevents multiple concurrent refresh requests
// ─────────────────────────────────────────────────────────────────────────────

let isRefreshing = false;
type RefreshCallback = (token: string | null) => void;
let refreshQueue: RefreshCallback[] = [];

function processRefreshQueue(token: string | null) {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
}

// ─────────────────────────────────────────────────────────────────────────────
// Create Axios instance
// ─────────────────────────────────────────────────────────────────────────────

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api",
  timeout: APP_CONSTANTS.API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Send cookies (refresh token stored in HttpOnly cookie)
});

// ─────────────────────────────────────────────────────────────────────────────
// Request interceptor — attach access token
// ─────────────────────────────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─────────────────────────────────────────────────────────────────────────────
// Response interceptor — handle 401, refresh, retry
// ─────────────────────────────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // ── 401 — try token refresh ──────────────────────────────────────────────
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== API_ENDPOINTS.auth.refresh &&
      originalRequest.url !== API_ENDPOINTS.auth.login
    ) {
      // Queue this request if a refresh is already in-flight
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          refreshQueue.push((newToken) => {
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(apiClient(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await apiClient.post<{ accessToken: string }>(
          API_ENDPOINTS.auth.refresh
        );
        const newToken = data.accessToken;
        tokenManager.set(newToken);
        processRefreshQueue(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processRefreshQueue(null);
        tokenManager.clear();
        // Redirect to login — signal to auth store
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth:logout"));
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ── All other errors — pass to error handler ─────────────────────────────
    return Promise.reject(handleApiError(error));
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// Convenience wrappers — typed, with abort support
// ─────────────────────────────────────────────────────────────────────────────

export function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return apiClient.get<T>(url, config).then((r) => r.data);
}

export function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return apiClient.post<T>(url, data, config).then((r) => r.data);
}

export function put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return apiClient.put<T>(url, data, config).then((r) => r.data);
}

export function patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return apiClient.patch<T>(url, data, config).then((r) => r.data);
}

export function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return apiClient.delete<T>(url, config).then((r) => r.data);
}

/**
 * Upload file with progress tracking
 */
export function upload<T>(
  url: string,
  formData: FormData,
  onProgress?: (percent: number) => void,
  config?: AxiosRequestConfig
): Promise<T> {
  return apiClient
    .post<T>(url, formData, {
      ...config,
      timeout: APP_CONSTANTS.UPLOAD_TIMEOUT_MS,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      },
    })
    .then((r) => r.data);
}

/**
 * Create a cancellable request token
 */
export function createCancelToken() {
  const controller = new AbortController();
  return { signal: controller.signal, cancel: () => controller.abort() };
}
