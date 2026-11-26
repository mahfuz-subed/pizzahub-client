import { Suspense } from "react"

import { AdminFilters } from "@/components/dashboard/admin-filters"
import { AdminMenuRow } from "@/components/dashboard/admin-menu-row"
import { StateMessage } from "@/components/shared/state-message"
import { getAdminMenuItems } from "@/lib/api/admin"

export default async function AdminMenuItemsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>
}) {
  const { search, status } = await searchParams
  const params = new URLSearchParams()
  if (search) params.set("search", search)
  if (status) params.set("status", status)

  let items: Awaited<ReturnType<typeof getAdminMenuItems>> = []
  let hasError = false
  try {
    items = await getAdminMenuItems(params.toString())
  } catch {
    hasError = true
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Manage Menu Items</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Review, approve, or remove items submitted by vendors.
      </p>

      <div className="mt-5">
        <Suspense>
          <AdminFilters
            placeholder="Search by item name..."
            extra={{
              name: "status",
              label: "Status",
              options: [
                { value: "pending", label: "Pending" },
                { value: "approved", label: "Approved" },
                { value: "rejected", label: "Rejected" },
                { value: "inactive", label: "Inactive" },
              ],
            }}
          />
        </Suspense>
      </div>

      <div className="mt-5 space-y-3">
        {hasError ? (
          <StateMessage
            title="We could not load menu items"
            description="Please try again in a moment."
          />
        ) : items.length === 0 ? (
          <StateMessage title="No menu items match your search" />
        ) : (
          items.map((item) => <AdminMenuRow key={item._id} item={item} />)
        )}
      </div>
    </div>
  )
}
