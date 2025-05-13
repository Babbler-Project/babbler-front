import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { SPEAKER_NAV_ITEMS } from "../constants/navigation";
import type { MenuItem } from "@/types/menuItem";

export function SpeakerHeader() {
  const location = useLocation();
  const currentPath = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;

  // Find the current page title from navigation items recursively
  const findActivePage = (items: MenuItem[]): string => {
    // First check for exact match
    const exactMatch = items.find((item) => item.url === currentPath);
    if (exactMatch) return exactMatch.title;

    // Check for parent routes
    const parentMatch = items.find((item) =>
      currentPath.startsWith(`${item.url}/`),
    );
    if (parentMatch) {
      // If it has submenu, look there
      if (parentMatch.submenu) {
        const submenuMatch = parentMatch.submenu.find(
          (subItem) =>
            subItem.url === currentPath ||
            currentPath.startsWith(`${subItem.url}/`),
        );
        if (submenuMatch) return submenuMatch.title;
      }
      // Otherwise use parent title
      return parentMatch.title;
    }

    // Default case for /speaker
    if (currentPath === "/speaker" || currentPath === "/speaker/") {
      return "Dashboard";
    }

    return "Speaker";
  };

  const pageTitle = findActivePage(SPEAKER_NAV_ITEMS);

  return (
    <div className="flex h-16 items-center justify-between border-b border-border px-4 lg:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* You can add additional header actions here */}
      </div>
    </div>
  );
}
