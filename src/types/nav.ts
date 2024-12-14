import { Icons } from "@/components/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

// Instead of empty interfaces, use type aliases
export type MainNavItem = NavItem

export type SidebarNavItem = NavItemWithChildren