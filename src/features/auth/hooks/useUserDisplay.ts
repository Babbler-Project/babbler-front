import { useCallback } from "react";
import type { User } from "../types";

export function useUserDisplay(user: User | null) {
  /**
   * Generate initials from a name
   */
  const getInitials = useCallback((name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, []);

  /**
   * Generate display name from user data
   */
  const displayName = user?.fullName || user?.email?.split("@")[0] || "User";

  /**
   * Determine role display name
   */
  const roleDisplay = user?.role.role?.toLowerCase() || "";

  /**
   * Generate avatar URL
   */
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${getInitials(displayName)}`;

  return {
    displayName,
    roleDisplay,
    avatarUrl,
    getInitials,
  };
}
