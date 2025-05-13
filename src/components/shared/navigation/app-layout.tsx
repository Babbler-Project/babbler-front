import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";
import type { MenuItem } from "@/types/menuItem";

interface AppLayoutProps {
  children: React.ReactNode;
  navItems: MenuItem[];
  basePath: string;
  quickAction?: React.ReactNode;
  headerActions?: React.ReactNode;
}

export function AppLayout({
  children,
  navItems,
  basePath,
  quickAction,
  headerActions,
}: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar
        navItems={navItems}
        basePath={basePath}
        quickAction={quickAction}
      />
      <div className="flex min-h-screen w-full flex-col">
        <AppHeader
          navItems={navItems}
          basePath={basePath}
          actions={headerActions}
        />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
