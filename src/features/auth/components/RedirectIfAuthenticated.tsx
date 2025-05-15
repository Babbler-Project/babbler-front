import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/AuthContext";
import { ROLE_REDIRECTS, DEFAULT_REDIRECT } from "../utils/redirect";

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
}

export function RedirectIfAuthenticated({
  children,
}: RedirectIfAuthenticatedProps) {
  const { isAuthenticated, user, isLoading } = useAuthContext();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated && user) {
    // If the user is authenticated, redirect to their role-specific dashboard
    const normalizedRole =
      typeof user.role === "object" && user.role.role
        ? user.role.role.toLowerCase()
        : typeof user.role === "string"
          ? user.role.toLowerCase()
          : "";

    const redirectPath = ROLE_REDIRECTS[normalizedRole] || DEFAULT_REDIRECT;

    console.log(
      `User already authenticated as ${normalizedRole}, redirecting to ${redirectPath}`,
    );
    return <Navigate to={redirectPath} replace />;
  }

  // If not authenticated, show the requested page
  return <>{children}</>;
}
