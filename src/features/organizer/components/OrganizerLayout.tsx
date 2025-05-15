import { AppLayout } from "@/components/shared/navigation/app-layout";
import { ORGANIZER_NAV_ITEMS } from "../constants/navigation";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout navItems={ORGANIZER_NAV_ITEMS} basePath="/organizer">
      {children}
    </AppLayout>
  );
}
