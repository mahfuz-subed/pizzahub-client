import type { OrderStatus } from "@/lib/orders"
import { cn } from "@/lib/utils"

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-secondary text-secondary-foreground",
  accepted: "bg-primary text-primary-foreground",
  rejected: "bg-destructive text-white",
  cancelled: "bg-muted text-muted-foreground",
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        STATUS_STYLES[status]
      )}
    >
      {status}
    </span>
  )
}
