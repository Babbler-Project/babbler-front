import { useMutation } from "@tanstack/react-query";
import { httpClient, ApiError } from "@/lib/api/http-client";
import type { AuthResponse, RegisterRequest } from "../../types";
import { toast } from "sonner";

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData: RegisterRequest) =>
      httpClient.post<AuthResponse>("/auth/register", userData),

    onSuccess: () => {
      toast.success("Successfully registered", {
        description: "Your account has been created successfully!",
      });
    },

    onError: (error: unknown) => {
      if (error instanceof ApiError) {
        toast.error(error.error || "Registration failed", {
          description:
            error.message || "Please check your information and try again.",
        });
        return;
      }
      toast.error("Registration failed", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again later.",
      });
    },
  });
};
