import { ClipboardList, CreditCard, ShieldCheck, Store, Users } from "lucide-react"

import { StateMessage } from "@/components/shared/state-message"
import { getAdminOverview } from "@/lib/api/admin"

export default async function AdminDashboardPage() {
  let overview: Awaited<ReturnType<typeof getAdminOverview>> | null = null
  try {
    overview = await getAdminOverview()
  } catch {
    // handled below
  }

  if (!overview) {
    return (
      <StateMessage
        title="We could not load the dashboard"
        description="Please try again in a moment."
      />
    )
  }

  // One array drives all the stat cards - easy to add or remove one.
  const stats = [
    { label: "Registered users", value: overview.users, icon: Users },
    { label: "Vendors", value: overview.vendors, icon: Store },
    { label: "Customers", value: overview.customers, icon: ShieldCheck },
    { label: "Menu items", value: overview.menuItems, icon: ClipboardList },
    { label: "Pending items", value: overview.pending, icon: ClipboardList },
    { label: "Transactions", value: overview.transactions, icon: CreditCard },
  ]

  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-secondary">
        <span className="size-2 rounded-full bg-secondary" />
        Platform overview
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight">
        Admin Dashboard
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        A quick look at everything happening on PizzaHub.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
