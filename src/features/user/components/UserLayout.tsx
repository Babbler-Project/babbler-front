import { AppLayout } from "@/components/shared/navigation/app-layout";

import { USER_NAV_ITEMS } from "../constants/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout navItems={USER_NAV_ITEMS} basePath="/user">
      {children}
    </AppLayout>
  );
}
