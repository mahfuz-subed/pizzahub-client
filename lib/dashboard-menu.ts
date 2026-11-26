import {
  ClipboardList,
  CirclePlus,
  CreditCard,
  Crown,
  LayoutDashboard,
  ShoppingBag,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { Role } from "@/lib/roles"

// The shape of ONE sidebar link
export interface DashboardMenuItem {
  name: string // text shown in the sidebar
  url: string // page it opens
  icon: LucideIcon // icon shown next to the text
  exact?: boolean // true = highlight only on this exact URL (used for Overview)
}

// All links for each role. Edit this file to add, remove, or rename a link.
export const DASHBOARD_MENU_ITEMS: Record<Role, DashboardMenuItem[]> = {
  admin: [
    {
      name: "Overview",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    { name: "Manage Users", url: "/dashboard/admin/users", icon: Users },
    {
      name: "Manage Menu Items",
      url: "/dashboard/admin/menu-items",
      icon: UtensilsCrossed,
    },
    {
      name: "Transactions",
      url: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
  ],

  vendor: [
    {
      name: "Overview",
      url: "/dashboard/vendor",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "My Menu Items",
      url: "/dashboard/vendor/menu-items",
      icon: UtensilsCrossed,
    },
    {
      name: "Add Menu Item",
      url: "/dashboard/vendor/add-menu-item",
      icon: CirclePlus,
    },
    {
      name: "Customer Orders",
      url: "/dashboard/vendor/customer-orders",
      icon: ClipboardList,
    },
    {
      name: "Subscription",
      url: "/dashboard/vendor/subscription",
      icon: Crown,
    },
    { name: "Profile Settings", url: "/dashboard/vendor/profile", icon: User },
  ],

  customer: [
    {
      name: "Overview",
      url: "/dashboard/customer",
      icon: LayoutDashboard,
      exact: true,
    },
    { name: "My Orders", url: "/dashboard/customer/orders", icon: ShoppingBag },
    {
      name: "Profile Settings",
      url: "/dashboard/customer/profile",
      icon: User,
    },
  ],
}

// Decides if a link should look "selected" for the current page
export function isMenuItemActive(pathname: string, item: DashboardMenuItem) {
  if (item.exact) {
    return pathname === item.url
  }
  return pathname.startsWith(item.url)
}
