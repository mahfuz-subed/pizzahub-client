import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { CustomerOrderCard } from "@/components/dashboard/customer-order-card"
import { StateMessage } from "@/components/shared/state-message"
import { getMyOrders } from "@/lib/api/orders"
import { auth } from "@/lib/auth"
import type { Order } from "@/lib/orders"

export default async function CustomerOrdersPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect("/sign-in")
  }

  let orders: Order[] = []
  let hasError = false
  try {
    orders = await getMyOrders()
  } catch {
    hasError = true
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        All the orders you have placed.
      </p>

      {hasError ? (
        <div className="mt-8">
          <StateMessage
            title="We could not load your orders"
            description="Please try again in a moment."
          />
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-8">
          <StateMessage
            title="You have not placed any orders yet"
            description="Browse the menu and order something delicious."
            actionLabel="Browse Menu"
            actionHref="/menu"
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => (
            <CustomerOrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
