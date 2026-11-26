import { redirect } from "next/navigation"

import { getSession } from "@/lib/core/server"

// Runs for every page under /dashboard/admin.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session || session.user.role !== "admin") {
    redirect("/")
  }

  return <>{children}</>
}
