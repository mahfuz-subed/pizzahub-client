import { CircleCheck, ClipboardList, Clock, XCircle } from "lucide-react"

import { StateMessage } from "@/components/shared/state-message"
import { getMyOrders } from "@/lib/api/orders"
import { getSession } from "@/lib/core/server"

export default async function CustomerDashboardPage() {
  const session = await getSession()
  if (!session) return null

  let orders: Awaited<ReturnType<typeof getMyOrders>> = []
  let hasError = false
  try {
    orders = await getMyOrders()
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

  const stats = [
    { label: "Total orders", value: orders.length, icon: ClipboardList },
    {
      label: "Pending",
      value: orders.filter((order) => order.status === "pending").length,
      icon: Clock,
    },
    {
      label: "Accepted",
      value: orders.filter((order) => order.status === "accepted").length,
      icon: CircleCheck,
    },
    {
      label: "Rejected",
      value: orders.filter((order) => order.status === "rejected").length,
      icon: XCircle,
    },
  ]

  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-secondary">
        <span className="size-2 rounded-full bg-secondary" />
        Customer overview
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight">
        Hello, {session.user.name}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        A quick look at all your pizza orders.
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
    </div>
  )
}
