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
import { ChevronRight, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { NavUser } from "@/components/shared/navigation/nav-user";
import { Button } from "@/components/ui/button";
import { SPEAKER_NAV_ITEMS } from "../constants/navigation";

export function SpeakerSidebar() {
  const location = useLocation();

  const isLinkActive = (itemUrl: string) => {
    const currentPath = location.pathname.endsWith("/")
      ? location.pathname.slice(0, -1)
      : location.pathname;

    // Special case for root speaker path
    if (itemUrl === "/speaker") {
      return currentPath === itemUrl || currentPath === "/speaker/";
    }

    return currentPath === itemUrl || currentPath.startsWith(`${itemUrl}/`);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser />
      </SidebarHeader>
      <div className="p-4">
        <Button
          asChild
          className={cn(
            "w-full gap-2 font-medium",
            "group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:font-normal group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:text-foreground group-data-[collapsible=icon]:shadow-none",
          )}
          size="lg"
        >
          <Link to="/speaker/submit-talk">
            <MessageSquare className="h-4 w-4 shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden overflow-hidden">
              Submit new talk
            </span>
          </Link>
        </Button>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {SPEAKER_NAV_ITEMS.map((item) => {
              const isActive = isLinkActive(item.url);

              if (item.submenu) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className={cn(
                            isActive &&
                              "bg-accent text-accent-foreground font-semibold",
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
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
