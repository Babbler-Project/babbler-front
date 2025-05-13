import {
  Calendar,
  FileText,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import type { MenuItem } from "@/types/menuItem";

export const SPEAKER_NAV_ITEMS: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/speaker",
    icon: LayoutDashboard,
  },
  {
    title: "Talks",
    url: "/speaker/talks",
    icon: MessageSquare,
    // submenu: [
    //   {
    //     title: "Submit a Talk",
    //     url: "/speaker/submit-talk",
    //     description: "Submit a new talk proposal",
    //   },
    //   {
    //     title: "My Talks",
    //     url: "/speaker/my-talks",
    //     description: "View and manage your submitted talks",
    //   },
    // ],
  },
  {
    title: "Schedule",
    url: "/speaker/schedule",
    icon: Calendar,
  },
  {
    title: "Resources",
    url: "/speaker/resources",
    icon: FileText,
  },
];
