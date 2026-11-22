import Link from "next/link"
import { MapPin, Store } from "lucide-react"

import type { MenuItemWithVendor } from "@/lib/menu-items"

// Same button style used on the banner and navbar.
const buttonLinkClasses =
  "inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"

/** One public menu card. All the data it needs is passed in as a prop. */
export default function MenuCard({ item }: { item: MenuItemWithVendor }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.images[0]}
          alt={item.itemName}
          className="aspect-[4/3] w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-heading text-lg font-bold leading-tight">
          {item.itemName}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-primary" />
          <span className="truncate">{item.location}</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Store className="size-4 shrink-0 text-primary" />
          <span className="truncate">
            {item.vendor?.businessName || item.vendor?.name || "Local vendor"}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="text-lg font-bold text-primary">
            ${item.price.toFixed(2)}
          </span>
          <Link href={`/menu/${item._id}`} className={buttonLinkClasses}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
