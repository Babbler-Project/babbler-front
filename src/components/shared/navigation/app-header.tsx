import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { MenuItem } from "@/types/menuItem";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  navItems: MenuItem[];
  basePath: string;
  actions?: React.ReactNode;
  showBackButton?: boolean | "auto";
  backTo?: string;
}

// Generate breadcrumbs from navigation items and current path
function generateBreadcrumbs(
  items: MenuItem[],
  currentPath: string,
  basePath: string,
): Array<{ title: string; url: string }> {
  const breadcrumbs = [];

  // If we're at the dashboard itself, just show that
  if (currentPath === basePath || currentPath === `${basePath}/`) {
    const baseTitle =
      items.find((item) => item.url === basePath)?.title || "Dashboard";
    return [{ title: baseTitle, url: basePath }];
  }

  // For top-level routes like /speaker/talks, just show the current page
  // Look for a direct match in the main navigation items (including non-hidden ones)
  for (const item of items) {
    if (item.url === currentPath) {
      return [{ title: item.title, url: item.url }];
    }

    // Also check in submenu items (even hidden ones)
    if (item.submenu) {
      const matchingSubItem = item.submenu.find(
        (subItem) => subItem.url === currentPath,
      );
      if (matchingSubItem) {
        return [
          { title: item.title, url: item.url },
          { title: matchingSubItem.title, url: matchingSubItem.url },
        ];
      }
    }
  }

  // For nested routes like /speaker/talks/submit, show the parent and current
  for (const item of items) {
    if (currentPath.startsWith(`${item.url}/`)) {
      breadcrumbs.push({ title: item.title, url: item.url });

      // Check submenu items (including hidden ones)
      if (item.submenu) {
        // First check for exact match
        const exactSubItem = item.submenu.find(
          (subItem) => subItem.url === currentPath,
        );
        if (exactSubItem) {
          breadcrumbs.push({
            title: exactSubItem.title,
            url: exactSubItem.url,
          });
          break;
        }

        // Then check for child paths
        for (const subItem of item.submenu) {
          if (currentPath.startsWith(`${subItem.url}/`)) {
            breadcrumbs.push({ title: subItem.title, url: subItem.url });
            break;
          }
        }
      }

      break;
    }
  }

  return breadcrumbs;
}

export function AppHeader({ navItems, basePath, actions }: AppHeaderProps) {
  const location = useLocation();
  const currentPath = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;

  // Generate breadcrumbs
  const breadcrumbs = generateBreadcrumbs(navItems, currentPath, basePath);

  return (
    <header
      className={cn(
        "sticky top-0 right-0 z-40 flex h-16 shrink-0 items-center justify-between border-b px-4 bg-background",
        "transition-[margin] duration-200 ease-linear",
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="ml-3">
          <ol className="flex items-center space-x-1">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.url} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-3 w-3 mx-1 text-muted-foreground" />
                )}

                {index === breadcrumbs.length - 1 ? (
                  // Current/active item
                  <span className="text-foreground font-medium">
                    {crumb.title}
                  </span>
                ) : (
                  // Parent/previous items
                  <Link
                    to={crumb.url}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {crumb.title}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
