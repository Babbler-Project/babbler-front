import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import type { MenuItem } from "@/types/menuItem";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  navItems: MenuItem[];
  basePath: string;
  actions?: React.ReactNode;
}

export function AppHeader({ navItems, basePath, actions }: AppHeaderProps) {
  const location = useLocation();
  const currentPath = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;

  // Find the current page title from navigation items recursively
  const findActivePage = (items: MenuItem[]): string => {
    // First check for exact match
    const exactMatch = items.find((item) => item.url === currentPath);
    if (exactMatch) return exactMatch.title;

    // Look for submenu items (including hidden ones)
    for (const item of items) {
      if (item.submenu) {
        const submenuMatch = item.submenu.find(
          (subItem) => subItem.url === currentPath,
        );
        if (submenuMatch) {
          return submenuMatch.title;
        }
      }
    }

    // Check for parent routes
    const parentMatch = items.find((item) =>
      currentPath.startsWith(`${item.url}/`),
    );

    if (parentMatch) {
      // If it has submenu, look in deeper paths
      if (parentMatch.submenu) {
        for (const subItem of parentMatch.submenu) {
          if (currentPath.startsWith(`${subItem.url}/`)) {
            return subItem.title;
          }
        }
      }
      // Otherwise use parent title
      return parentMatch.title;
    }

    // Default case for root path
    if (currentPath === basePath || currentPath === `${basePath}/`) {
      return "Dashboard";
    }

    // Generate title from path as fallback
    const pathSegments = currentPath.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Convert kebab-case or snake_case to Title Case
    return lastSegment
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const pageTitle = findActivePage(navItems);

  return (
    <header
      className={cn(
        "sticky top-0 right-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background",
        "transition-[margin] duration-200 ease-linear",
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
