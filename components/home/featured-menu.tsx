import Link from "next/link"
import { ArrowRight } from "lucide-react"

import MenuCard from "@/components/home/menu-card"
import { FadeIn } from "@/components/shared/fade-in"
import { getPremiumVendorIds, getPublicMenuItems } from "@/lib/api/menu"
import type { MenuItem } from "@/lib/menu-items"

const linkButtonClasses =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-70"

/** Homepage section showing up to 6 approved items. */
export default async function FeaturedMenu() {
  let items: MenuItem[] = []
  let premiumIds: string[] = []

  try {
    // The server already returns only approved items.
    ;[items, premiumIds] = await Promise.all([
      getPublicMenuItems(),
      getPremiumVendorIds(),
    ])

    // Premium items go first - that is the "featured placement" perk.
    const premium = new Set(premiumIds)
    items = [...items].sort(
      (a, b) => Number(premium.has(b.vendorId)) - Number(premium.has(a.vendorId))
    )
    items = items.slice(0, 6)
  } catch {
    // If the API is down, show a friendly message instead of breaking the page.
    items = []
  }

  const premiumSet = new Set(premiumIds)

  return (
    <section className="border-b border-border py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-secondary">
                <span className="size-2 rounded-full bg-secondary" />
                Fresh from the oven
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Featured Menu Items
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                A few favorites from the pizza shops near you.
              </p>
            </div>

            <Link href="/menu" className={linkButtonClasses}>
              Browse all items <ArrowRight className="size-4" />
            </Link>
          </div>
        </FadeIn>

        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            No menu items are available right now. Please check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <FadeIn
                key={item._id}
                delay={(index % 3) * 0.1}
                className="h-full"
              >
                <MenuCard item={item} isPremium={premiumSet.has(item.vendorId)} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
