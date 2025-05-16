import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Vérification de l'accès...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role) {
    const userRoleName =
      typeof user.role === "object" && user.role.role
        ? user.role.role.toLowerCase()
        : typeof user.role === "string"
          ? user.role.toLowerCase()
          : "";

    const requiredRoleLower = requiredRole.toLowerCase();

    if (userRoleName !== requiredRoleLower) {
      return <Navigate to="/signin" replace />;
    }
  }

  return <>{children}</>;
}
