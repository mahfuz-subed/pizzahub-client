"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { BrandLogo } from "@/components/shared/brand-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DASHBOARD_MENU_ITEMS, isMenuItemActive } from "@/lib/dashboard-menu"
import type { Role } from "@/lib/roles"

interface DashboardSidebarProps {
  role: Role
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname() // the page the user is on right now
  const menuItems = DASHBOARD_MENU_ITEMS[role]

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <BrandLogo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="capitalize">
            {role} dashboard
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    isActive={isMenuItemActive(pathname, item)}
                    render={<Link href={item.url} />}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
