import {
  CircleCheck,
  ClipboardList,
  Clock,
  Crown,
  UtensilsCrossed,
} from "lucide-react"

import { StateMessage } from "@/components/shared/state-message"
import { getMyMenuItems } from "@/lib/actions/menu"
import { getVendorOrders } from "@/lib/api/orders"
import { getSession } from "@/lib/core/server"

export default async function VendorDashboardPage() {
  const session = await getSession()
  if (!session) return null

  let items: Awaited<ReturnType<typeof getMyMenuItems>> = []
  let orders: Awaited<ReturnType<typeof getVendorOrders>> = []
  let hasError = false

  try {
    ;[items, orders] = await Promise.all([getMyMenuItems(), getVendorOrders()])
  } catch {
    hasError = true
  }

  if (hasError) {
    return (
      <StateMessage
        title="We could not load your dashboard"
        description="Please try again in a moment."
      />
    )
  }

  const plan = (session.user as { subscriptionPlan?: string }).subscriptionPlan ?? "free"

  const stats = [
    { label: "Total menu items", value: items.length, icon: UtensilsCrossed },
    {
      label: "Active items",
      value: items.filter((item) => item.status === "approved").length,
      icon: CircleCheck,
    },
    {
      label: "Pending orders",
      value: orders.filter((order) => order.status === "pending").length,
      icon: Clock,
    },
    {
      label: "Accepted orders",
      value: orders.filter((order) => order.status === "accepted").length,
      icon: ClipboardList,
    },
  ]

  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-secondary">
        <span className="size-2 rounded-full bg-secondary" />
        Vendor overview
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight">
        Welcome back, {session.user.name}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Here is what is happening with your shop today.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-xl border bg-card p-5 shadow-sm"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <stat.icon className="size-5" />
            </span>
            <div>
              <p className="font-heading text-2xl font-bold leading-none">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border bg-muted/30 p-4 text-sm">
        <Crown className="size-5 text-secondary" />
        <span>
          Current plan:{" "}
          <span className="font-semibold capitalize">{plan}</span>
        </span>
      </div>
    </div>
  )
}
