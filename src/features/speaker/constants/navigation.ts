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
    title: "My talks",
    url: "/speaker/talks",
    icon: MessageSquare,
    submenu: [
      {
        title: "Submit a talk",
        url: "/speaker/talks/submit",
        description: "Fill out the form below to submit your talk proposal.",
        hidden: true,
      },
    ],
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
