import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ArrowLeft, MapPin, Store } from "lucide-react"

import { ImageGallery } from "@/components/menu/image-gallery"
import { OrderPanel } from "@/components/menu/order-panel"
import { StateMessage } from "@/components/shared/state-message"
import { getMenuItem } from "@/lib/api/menu"
import { auth } from "@/lib/auth"
import type { MenuItem } from "@/lib/menu-items"
import type { Role } from "@/lib/roles"

const MenuDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  // 1. Only logged-in users can open this page
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect("/sign-in")
  }

  // 2. Get the id from the address (/menu/123 -> "123")
  const { id } = await params

  // 3. Load the item from the server
  let item: MenuItem | null = null
  let hasError = false
  try {
    item = await getMenuItem(id)
  } catch {
    hasError = true
  }

  // 4. No item: show a clear message instead of a broken page
  if (!item) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16">
        <StateMessage
          title={
            hasError
              ? "We could not load this item"
              : "This menu item was not found"
          }
          description={
            hasError
              ? "Please try again in a moment."
              : "It may have been removed, or the link is wrong."
          }
          actionLabel="Back to menu"
          actionHref="/menu"
        />
      </section>
    )
  }

  const role = session.user.role as Role
  const vendorName =
    item.vendorBusinessName || item.vendorName || "PizzaHub Vendor"

  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/menu"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to menu
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <ImageGallery images={item.images} alt={item.itemName} />

          <div className="space-y-5">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              {item.category}
            </span>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {item.itemName}
            </h1>

            <p className="text-3xl font-bold text-primary">
              ${item.price.toFixed(2)}
            </p>

            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="size-5 shrink-0" />
                {item.location}
              </p>
              <p className="flex items-center gap-2">
                <Store className="size-5 shrink-0" />
                Sold by {vendorName}
              </p>
            </div>

            <div>
              <h2 className="mb-1 font-semibold">Description</h2>
              <p className="leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>

            <OrderPanel item={item} role={role} userId={session.user.id} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MenuDetailsPage
