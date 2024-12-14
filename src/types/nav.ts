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

// Remove MainNavItem as it's identical to NavItem
// export interface MainNavItem extends NavItem {}

// Use a type alias if you just want a different name for NavItem
export type MainNavItem = NavItem;

// SidebarNavItem already adds a new property, so it's fine
export interface SidebarNavItem extends NavItemWithChildren {}