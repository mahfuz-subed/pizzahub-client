import type { MenuItem } from "@/lib/menu-items"
import type { Role } from "@/lib/roles"

export interface OrderPermission {
  canOrder: boolean
  reason?: string // shown to the user when canOrder is false
}

export function getOrderPermission(
  item: MenuItem,
  role: Role,
  userId: string
): OrderPermission {
  if (item.status !== "approved") {
    return { canOrder: false, reason: "This item is not available right now." }
  }
  if (role === "admin") {
    return { canOrder: false, reason: "Admins cannot place customer orders." }
  }
  if (item.vendorId === userId) {
    return { canOrder: false, reason: "You cannot order your own item." }
  }
  return { canOrder: true }
}
