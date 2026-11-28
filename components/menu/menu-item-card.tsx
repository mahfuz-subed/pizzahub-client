import Link from "next/link"
import { MapPin, Store } from "lucide-react"

import { SafeImage } from "@/components/shared/safe-image"
import { buttonVariants } from "@/components/ui/button"
import type { MenuItem } from "@/lib/menu-items"
import { cn } from "@/lib/utils"

export function MenuItemCard({ item }: { item: MenuItem }) {
  const vendorName =
    item.vendorBusinessName || item.vendorName || "PizzaHub Vendor"

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
      <SafeImage
        src={item.images[0]}
        alt={item.itemName}
        className="aspect-[4/3] w-full object-cover"
      />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <span className="w-fit rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
          {item.category}
        </span>

        <h3 className="line-clamp-1 text-lg font-semibold">{item.itemName}</h3>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="line-clamp-1">{item.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <Store className="size-4 shrink-0" />
            <span className="line-clamp-1">{vendorName}</span>
          </p>
        </div>

        <p className="text-xl font-bold text-primary">
          ${item.price.toFixed(2)}
        </p>

        {/* mt-auto pushes the button to the bottom, so all cards line up */}
        <Link
          href={`/menu-details/${item._id}`}
          className={cn(buttonVariants(), "mt-auto w-full")}
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
