import { useMutation } from "@tanstack/react-query";
import { httpClient, ApiError } from "@/lib/api/http-client";
import { toast } from "sonner";
import type { AuthResponse, LoginRequest } from "../../types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (userData: LoginRequest) =>
      httpClient.post<AuthResponse>("/auth/login", userData),

    onSuccess: () => {
      toast.success("Login successful", {
        description: "You have been successfully logged in.",
        duration: 3000,
      });
    },

    onError: (error: unknown) => {
      if (error instanceof ApiError) {
        toast.error(error.error || "Login failed", {
          description:
            error.message || "Please check your credentials and try again.",
        });
        return;
      }

      toast.error("Login failed", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again later.",
      });
    },
  });
};
