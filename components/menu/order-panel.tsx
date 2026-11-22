import { Button } from "@/components/ui/button"
import type { MenuItem } from "@/lib/menu-items"
import { getOrderPermission } from "@/lib/order-rules"
import type { Role } from "@/lib/roles"

interface OrderPanelProps {
  item: MenuItem
  role: Role
  userId: string
}

export function OrderPanel({ item, role, userId }: OrderPanelProps) {
  const { canOrder, reason } = getOrderPermission(item, role, userId)

  // Not allowed to order: explain why instead of showing a button
  if (!canOrder) {
    return (
      <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        {reason}
      </p>
    )
  }

  return (
    <div>
      {/* NEXT STEP: this button will open the order form */}
      <Button size="lg" className="w-full">
        Order Now
      </Button>
    </div>
  )
}
