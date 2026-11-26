import { redirect } from "next/navigation"
import { Crown } from "lucide-react"

import { getSession } from "@/lib/core/server"
import { getVendorSubscription } from "@/lib/subscription"
import { cn } from "@/lib/utils"

export default async function SubscriptionPage() {
  const session = await getSession()
  if (!session) {
    redirect("/sign-in")
  }

  const { plan, isPremium } = await getVendorSubscription()

  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-secondary">
        <span className="size-2 rounded-full bg-secondary" />
        Your plan
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight">
        Subscription
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Choose how many pizzas you can publish and how your shop appears.
      </p>

      {/* Current plan banner - the plan cards come in the next step */}
      <div
        className={cn(
          "mt-6 flex items-center gap-3 rounded-xl border p-4",
          isPremium
            ? "border-secondary bg-secondary/10"
            : "border-border bg-muted/30"
        )}
      >
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            isPremium
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary/10 text-primary"
          )}
        >
          <Crown className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold capitalize">
            Current plan: {plan}
          </p>
          <p className="text-xs text-muted-foreground">
            {isPremium
              ? "You have access to all Premium features."
              : "Free plan: up to 3 active menu items."}
          </p>
        </div>
      </div>
    </div>
  )
}
