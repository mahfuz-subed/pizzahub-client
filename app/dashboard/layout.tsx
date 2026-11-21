import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { auth } from "@/lib/auth"
import type { Role } from "@/lib/roles"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Read the logged-in user. No session means they must sign in first.
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect("/sign-in")
  }

  const role = (session.user.role as Role) ?? "customer"

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <div className="flex-1 p-6">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  )
}
