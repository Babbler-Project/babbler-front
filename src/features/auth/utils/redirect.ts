import type { NavigateFunction } from "react-router-dom";

// Mapping of user roles to their respective dashboard routes
export const ROLE_REDIRECTS: Record<string, string> = {
  user: "/user",
  speaker: "/speaker",
  organizer: "/organizer",
};

export const DEFAULT_REDIRECT = "/login";

export function handleAuthRedirect(
  navigate: NavigateFunction,
  userRole?: string,
): void {
  // Normalize the role name (convert to lowercase)
  const normalizedRole = userRole?.toLowerCase() || "";

  // Get the appropriate redirect path based on user role
  const redirectPath = ROLE_REDIRECTS[normalizedRole] || DEFAULT_REDIRECT;

  // Navigate to the determined path
  navigate(redirectPath);
}
