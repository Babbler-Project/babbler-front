import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { NavUser } from "@/components/shared/navigation/nav-user";
import type { MenuItem } from "@/types/menuItem";

interface AppSidebarProps {
  navItems: MenuItem[];
  basePath: string; // e.g. "/speaker" or "/organizer"
  quickAction?: React.ReactNode; // Optional quick action button
}

export function AppSidebar({
  navItems,
  basePath,
  quickAction,
}: AppSidebarProps) {
  const location = useLocation();

  const isLinkActive = (itemUrl: string) => {
    const currentPath = location.pathname.endsWith("/")
      ? location.pathname.slice(0, -1)
      : location.pathname;

    // Special case for root path
    if (itemUrl === basePath) {
      return currentPath === itemUrl || currentPath === `${basePath}/`;
    }

    return currentPath === itemUrl || currentPath.startsWith(`${itemUrl}/`);
  };

  // Filter out top-level items with hidden: true
  const visibleNavItems = navItems.filter((item) => !item.hidden);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser />
      </SidebarHeader>

      {quickAction && <div className="p-4">{quickAction}</div>}

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {visibleNavItems.map((item) => {
              const isActive = isLinkActive(item.url);

              if (item.submenu) {
                // Filter out hidden submenu items
                const visibleSubItems = item.submenu.filter(
                  (subItem) => !subItem.hidden,
                );

                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className={cn(
                          "flex w-full justify-between",
                          isActive &&
                            "bg-accent text-accent-foreground font-semibold",
                        )}
                      >
                        {/* Main content with link */}
                        <Link
                          to={item.url}
                          className="flex items-center gap-2 flex-1"
                          title={item.title}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>

                        {/* Dropdown trigger */}
                        {visibleSubItems.length > 0 && (
                          <CollapsibleTrigger className="p-0 ml-2 h-4 flex items-center">
                            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </CollapsibleTrigger>
                        )}
                      </SidebarMenuButton>

                      {visibleSubItems.length > 0 && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {visibleSubItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isLinkActive(subItem.url)}
                                >
                                  <Link
                                    to={subItem.url}
                                    className={cn(
                                      isLinkActive(subItem.url) &&
                                        "font-semibold",
                                    )}
                                    title={subItem.description}
                                  >
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      isActive &&
                        "bg-accent text-accent-foreground font-semibold",
                    )}
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
