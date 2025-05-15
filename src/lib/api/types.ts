export type FetchOptions = {
  headers?: Record<string, string>;
  body?: unknown;
  responseType?: "json" | "blob";
} & Omit<RequestInit, "body">;

export interface ApiResponse<T = null> {
  status: "success" | "error";
  message: string;
  data?: T;
}
