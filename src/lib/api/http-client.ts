import { config } from "@/config";
import type { FetchOptions } from "./types";

const createHttpClient = () => {
  const request = async <T>(
    endpoint: string,
    { body, headers, responseType, ...options }: FetchOptions = {},
  ): Promise<T> => {
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Don't set Content-Type for FormData
    const isFormData = body instanceof FormData;
    const finalHeaders = isFormData
      ? { ...headers } // Let browser set Content-Type with boundary
      : { ...defaultHeaders, ...headers };

    const response = await fetch(`${config.API.BASE_URL}${endpoint}`, {
      ...options,
      headers: finalHeaders,
      // Don't stringify FormData
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        errorMessage || `Request failed with status ${response.status}`,
      );
    }

    if (responseType === "blob") {
      return response.blob() as Promise<T>;
    }

    return response.json();
  };

  return {
    get: <T>(endpoint: string, options?: Omit<FetchOptions, "body">) =>
      request<T>(endpoint, { ...options, method: "GET" }),
    getBlob: (endpoint: string, options?: Omit<FetchOptions, "body">) =>
      request<Blob>(endpoint, {
        ...options,
        method: "GET",
        responseType: "blob",
      }),
    post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: "POST", body }),
    put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: "PUT", body }),
    delete: <T>(endpoint: string, options?: FetchOptions) =>
      request<T>(endpoint, { ...options, method: "DELETE" }),
  };
};

export const httpClient = createHttpClient();
