import type { ReactNode } from "react"
import { CalendarDays, Mail, MapPin, MessageSquare, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { OrderDecisionButtons } from "@/components/dashboard/order-decision-buttons"
import { OrderStatusBadge } from "@/components/shared/order-status-badge"
import { formatDate } from "@/lib/dates"
import type { Order } from "@/lib/orders"

// One small line: an icon followed by some text
function InfoLine({
  icon: Icon,
  children,
}: {
  icon: LucideIcon
  children: ReactNode
}) {
  return (
    <p className="flex items-start gap-2">
      <Icon className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  )
}

interface VendorOrderCardProps {
  order: Order
  vendorId: string
}

export function VendorOrderCard({ order, vendorId }: VendorOrderCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm sm:flex-row">
      {order.itemImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={order.itemImage}
            alt={order.itemName}
            className="aspect-[4/3] w-full rounded-lg object-cover sm:w-44"
          />
        </>
      )}

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-semibold">{order.itemName}</h2>
            {order.price !== undefined && (
              <p className="text-sm font-medium text-primary">
                ${order.price.toFixed(2)}
              </p>
            )}
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="space-y-1 text-sm text-muted-foreground">
          <InfoLine icon={User}>{order.customerName || "Customer"}</InfoLine>
          {order.customerEmail && (
            <InfoLine icon={Mail}>{order.customerEmail}</InfoLine>
          )}
          <InfoLine icon={CalendarDays}>
            Delivery: {formatDate(order.deliveryDate)}
          </InfoLine>
          <InfoLine icon={MapPin}>{order.deliveryAddress}</InfoLine>
          <InfoLine icon={MessageSquare}>
            {order.message || "No special instructions"}
          </InfoLine>
        </div>

        <p className="text-xs text-muted-foreground">
          Requested on {formatDate(order.createdAt)}
        </p>

        {/* Only pending orders can be accepted or rejected */}
        {order.status === "pending" && (
          <div className="mt-auto pt-2">
            <OrderDecisionButtons orderId={order._id} vendorId={vendorId} />
          </div>
        )}
      </div>
    </div>
  )
}
