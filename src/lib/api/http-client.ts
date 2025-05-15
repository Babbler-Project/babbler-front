import { config } from "@/config";
import type { FetchOptions } from "./types";

interface ApiErrorResponse {
  error: string;
  message: string;
}

export class ApiError extends Error {
  error: string;

  constructor(errorResponse: ApiErrorResponse) {
    super(errorResponse.message);
    this.name = "ApiError";
    this.error = errorResponse.error;
  }
}

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
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = (await response.json()) as ApiErrorResponse;

          if (errorData.error && errorData.message) {
            throw new ApiError(errorData);
          }

          throw new Error(JSON.stringify(errorData));
        }

        const errorMessage = await response.text();
        throw new Error(
          errorMessage || `Request failed with status ${response.status}`,
        );
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }

        throw new Error(
          error instanceof Error
            ? error.message
            : `Request failed with status ${response.status}`,
        );
      }
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
