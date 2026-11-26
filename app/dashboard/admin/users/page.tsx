import { Suspense } from "react"

import { AdminFilters } from "@/components/dashboard/admin-filters"
import { AdminUserRow } from "@/components/dashboard/admin-user-row"
import { StateMessage } from "@/components/shared/state-message"
import { getAdminUsers } from "@/lib/api/admin"

export default async function ManageUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; role?: string }>
}) {
  const { search, role } = await searchParams
  const params = new URLSearchParams()
  if (search) params.set("search", search)
  if (role) params.set("role", role)

  let users: Awaited<ReturnType<typeof getAdminUsers>> = []
  let hasError = false
  try {
    users = await getAdminUsers(params.toString())
  } catch {
    hasError = true
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Manage Users</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View users, change roles, and block accounts.
      </p>

      <div className="mt-5">
        <Suspense>
          <AdminFilters
            placeholder="Search by name or email..."
            extra={{
              name: "role",
              label: "Role",
              options: [
                { value: "vendor", label: "Vendor" },
                { value: "customer", label: "Customer" },
                { value: "admin", label: "Admin" },
              ],
            }}
          />
        </Suspense>
      </div>

      <div className="mt-5 space-y-3">
        {hasError ? (
          <StateMessage
            title="We could not load users"
            description="Please try again in a moment."
          />
        ) : users.length === 0 ? (
          <StateMessage title="No users match your search" />
        ) : (
          users.map((user) => <AdminUserRow key={user._id} user={user} />)
        )}
      </div>
    </div>
  )
}
