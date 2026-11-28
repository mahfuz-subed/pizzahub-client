"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { SafeImage } from "@/components/shared/safe-image"
import { Button } from "@/components/ui/button"
import { cancelOrder } from "@/lib/actions/customer-orders"
import type { Order, OrderStatus } from "@/lib/orders"
import { cn } from "@/lib/utils"

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-secondary text-secondary-foreground",
  accepted: "bg-primary text-primary-foreground",
  rejected: "bg-destructive text-white",
  cancelled: "bg-muted text-muted-foreground",
}

function formatDate(value: string | undefined) {
  if (!value) return "-"
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString()
}

export function CustomerOrderCard({ order }: { order: Order }) {
  const router = useRouter()
  const [isCancelling, setIsCancelling] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  async function handleCancel() {
    setIsCancelling(true)
    try {
      await cancelOrder(order._id)
      toast.success("Order cancelled.")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not cancel your order."
      )
    } finally {
      setIsCancelling(false)
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
      <SafeImage
        src={order.itemImage}
        alt={order.itemName}
        className="aspect-[4/3] w-full object-cover"
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-semibold">{order.itemName}</h2>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
              STATUS_STYLES[order.status]
            )}
          >
            {order.status}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {order.vendorBusinessName || "PizzaHub vendor"}
        </p>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Delivery: {formatDate(order.deliveryDate)}</p>
          <p>To: {order.deliveryAddress}</p>
          <p>Requested: {formatDate(order.createdAt)}</p>
        </div>

        {showDetails && (
          <div className="space-y-1 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
            <p>Order ID: {order._id}</p>
            <p>Customer: {order.customerName}</p>
            <p>Message: {order.message || "None"}</p>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails((open) => !open)}
          >
            {showDetails ? "Hide Details" : "View Details"}
          </Button>
          {order.status === "pending" && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Cancel Order"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
