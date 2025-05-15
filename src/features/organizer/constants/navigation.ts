import { LayoutDashboard, Users, Settings } from "lucide-react";
import type { MenuItem } from "@/types/menuItem";

export const ORGANIZER_NAV_ITEMS: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/organizer",
    icon: LayoutDashboard,
  },
  {
    title: "Speakers",
    url: "/organizer/speakers",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/organizer/settings",
    icon: Settings,
  },
];
