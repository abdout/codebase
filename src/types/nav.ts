// src/types/nav.ts
import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export type MainNavItem = NavItem;

// If SidebarNavItem is ALSO empty after extending, use a type alias here too
// Check if you are adding any properties to SidebarNavItem in other files.
// If not, change this to:
// export type SidebarNavItem = NavItemWithChildren;

export interface SidebarNavItem extends NavItemWithChildren {} // Only if it has unique props