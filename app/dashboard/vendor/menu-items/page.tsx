import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { VendorMenuItemCard } from "@/components/dashboard/vendor-menu-item-card"
import { getMyMenuItems } from "@/lib/actions/menu"
import { auth } from "@/lib/auth"

export default async function MyMenuItemsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect("/sign-in")
  }

  const items = await getMyMenuItems()

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">My Menu Items</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        All the items you have added.
      </p>

      {items.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          You have not added any menu items yet.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <VendorMenuItemCard
              key={item._id}
              item={item}
              vendorId={session.user.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}
