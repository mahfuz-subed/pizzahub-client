import { VendorMenuActions } from "@/components/dashboard/vendor-menu-actions"
import type { MenuItem, MenuItemStatus } from "@/lib/menu-items"

// Badge colors for each status
const STATUS_STYLES: Record<MenuItemStatus, string> = {
  pending: "bg-secondary text-secondary-foreground",
  approved: "bg-primary text-primary-foreground",
  rejected: "bg-destructive text-white",
  inactive: "bg-muted text-muted-foreground",
}

type VendorMenuItemCardProps = {
  item: MenuItem
  vendorId: string
}

export function VendorMenuItemCard({
  item,
  vendorId,
}: VendorMenuItemCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.images[0]}
        alt={item.itemName}
        className="aspect-[4/3] w-full object-cover"
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-semibold">{item.itemName}</h2>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[item.status] ?? STATUS_STYLES.pending}`}
          >
            {item.status ?? "pending"}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {item.category} · {item.location}
        </p>

        <p className="text-lg font-bold text-primary">
          ${item.price.toFixed(2)}
        </p>
      </div>

      <VendorMenuActions item={item} vendorId={vendorId} />
    </div>
  )
}
