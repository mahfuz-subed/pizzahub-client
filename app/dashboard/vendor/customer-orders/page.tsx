import { redirect } from "next/navigation"

import { VendorOrderCard } from "@/components/dashboard/vendor-order-card"
import { StateMessage } from "@/components/shared/state-message"
import { getVendorOrders } from "@/lib/api/orders"
import { getSession } from "@/lib/core/server"
import type { Order } from "@/lib/orders"

const CustomerOrdersPage = async () => {
  const session = await getSession()
  const userId = session?.user.id
  if (!userId) {
    redirect("/sign-in")
  }

  let orders: Order[]
  try {
    orders = await getVendorOrders()
  } catch {
    return (
      <StateMessage
        title="We could not load your orders"
        description="Please try again in a moment."
      />
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Customer Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Accept or reject the orders customers place for your menu items.
      </p>

      <div className="mt-6">
        {orders.length === 0 ? (
          <StateMessage
            title="No orders yet"
            description="Orders will appear here when customers order your items."
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <VendorOrderCard
                key={order._id}
                order={order}
                vendorId={userId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerOrdersPage
