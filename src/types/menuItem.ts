import { type ElementType } from "react";

export interface MenuItem {
  title: string;
  url: string;
  icon: ElementType;
  hidden?: boolean;
  submenu?: {
    title: string;
    url: string;
    description: string;
    hidden?: boolean;
  }[];
}
